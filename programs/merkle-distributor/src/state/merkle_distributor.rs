use crate::error::ErrorCode;
use crate::math::safe_math::SafeMath;
use anchor_lang::{
    account,
    prelude::{Pubkey, *},
};
use num_enum::{IntoPrimitive, TryFromPrimitive};
use static_assertions::const_assert;
#[derive(Copy, Clone, Debug, PartialEq, Eq, IntoPrimitive, TryFromPrimitive)]
#[repr(u8)]
/// Type of the activation
pub enum ActivationType {
    Slot,
    Timestamp,
}

use bytemuck::{Pod, Zeroable};

pub const MAX_NUM_NODES: u32 = 12_000;
pub const BITMAP_BYTES: usize = ((MAX_NUM_NODES as usize) + 7) / 8;
// bytes to add so (base + BITMAP_BYTES + pad) % 8 == 0
pub const BITMAP_TAIL_PAD: usize = (8 - (BITMAP_BYTES % 8)) % 8;

pub const BITMAP_LEN: usize = 1500;

// Hack: making sure the fixed length is correct
const_assert!(BITMAP_LEN== BITMAP_BYTES);


#[repr(C)]
#[derive(Copy, Clone, Debug, AnchorSerialize, AnchorDeserialize)]
pub struct ClaimedBitmap {
    pub bytes: [u8; BITMAP_LEN],
}

// SAFETY: plain byte array
unsafe impl Zeroable for ClaimedBitmap {}
unsafe impl Pod for ClaimedBitmap {}

// (optional) if you use InitSpace math anywhere
impl anchor_lang::Space for ClaimedBitmap {
    const INIT_SPACE: usize = BITMAP_LEN;
}

// small helpers so call sites stay tidy
impl Default for ClaimedBitmap {
    fn default() -> Self { Self { bytes: [0u8; BITMAP_LEN] } }
}
impl ClaimedBitmap {
    #[inline]
    pub fn is_set(&self, idx: u32) -> bool {
        let i = idx as usize;
        let b = i / 8;
        let bit = (i % 8) as u8;
        (self.bytes[b] & (1 << bit)) != 0
    }
    #[inline]
    pub fn set(&mut self, idx: u32) {
        let i = idx as usize;
        let b = i / 8;
        let bit = (i % 8) as u8;
        self.bytes[b] |= 1 << bit;
    }
}

/// State for the account which distributes tokens.
#[account]
#[repr(C)]
#[derive(Debug, InitSpace)]
pub struct MerkleDistributor {
    /// Bump seed.
    pub bump: u8,
    /// Version of the airdrop
    pub version: u64,
    /// The 256-bit merkle root.
    pub root: [u8; 32],
    /// [Mint] of the token to be distributed.
    pub mint: Pubkey,
    /// base key of distributor.
    pub base: Pubkey,
    /// Token Address of the vault
    pub token_vault: Pubkey,
    /// Maximum number of tokens that can ever be claimed from this [MerkleDistributor].
    pub max_total_claim: u64,
    /// Maximum number of nodes in [MerkleDistributor].
    pub max_num_nodes: u64,
    /// Total amount of tokens that have been claimed.
    pub total_amount_claimed: u64,
    /// Number of nodes that have been claimed.
    pub num_nodes_claimed: u64,
    /// Lockup time start (Unix Timestamp)
    pub start_ts: i64,
    /// Lockup time end (Unix Timestamp)
    pub end_ts: i64,
    /// Clawback start (Unix Timestamp)
    pub clawback_start_ts: i64,
    /// Clawback receiver
    pub clawback_receiver: Pubkey,
    /// Admin wallet
    pub admin: Pubkey,
    /// Whether or not the distributor has been clawed back
    pub clawed_back: bool,
    /// this merkle tree is activated from this slot or timestamp
    pub activation_point: u64,
    /// indicate that whether admin can close this pool, for testing purpose
    pub closable: bool,
    /// bonus multiplier
    pub airdrop_bonus: AirdropBonus,
    /// activation type, 0 means slot, 1 means timestamp
    pub activation_type: u8,
    // padding 2
    pub padding_2: [u64; 10],
    // The bitmap: 1 bit per index
    pub claimed_bitmap: ClaimedBitmap, //TODO: IDL cannot regconize BITMAP_BYTES, need to find a way to work around this
    pub _tail_pad: [u8; 4],   // this is to by pass the transmute
    // /// Buffer 0
    // pub buffer_0: [u8; 7],
    // /// Buffer 1
    // pub buffer_1: [u8; 32],
    // /// Buffer 2
    // pub buffer_2: [u8; 32],
}

// Manual Default: zero-initialize the POD struct (safe for zero_copy layouts)
impl Default for MerkleDistributor {
    fn default() -> Self {
        // All fields are plain integers / arrays / Pubkey; zeroed is valid
        unsafe { core::mem::zeroed() }
    }
}

const_assert!(core::mem::align_of::<MerkleDistributor>() == 8);


#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Debug, Default,InitSpace)]
#[repr(C)]
pub struct AirdropBonus {
    /// total bonus
    pub total_bonus: u64,
    // vesting duration
    pub vesting_duration: u64,
    /// total bonus
    pub total_claimed_bonus: u64,
}

pub struct ActivationHandler {
    /// current slot or current timestamp
    pub curr_point: u64,
    /// activation slot or activation timestamp
    pub activation_point: u64,
    /// bonus multiplier
    pub airdrop_bonus: AirdropBonus,
}

impl ActivationHandler {
    pub fn validate_claim(&self) -> Result<()> {
        require!(
            self.activation_point <= self.curr_point,
            ErrorCode::ClaimingIsNotStarted
        );
        Ok(())
    }
    pub fn get_bonus_for_a_claimaint(&self, max_bonus: u64) -> Result<u64> {
        let curr_point = self.curr_point;
        let start_point = self.activation_point;
        let end_point = self.airdrop_bonus.vesting_duration.safe_add(start_point)?;

        if curr_point >= start_point {
            if curr_point >= end_point {
                Ok(max_bonus)
            } else {
                let duration_into_unlock = curr_point.safe_sub(start_point)?;
                let total_unlock_duration = self.airdrop_bonus.vesting_duration;

                let amount = ((duration_into_unlock as u128).safe_mul(max_bonus as u128)?)
                    .safe_div(total_unlock_duration as u128)? as u64;
                Ok(amount)
            }
        } else {
            Ok(0)
        }
    }
}

impl MerkleDistributor {
    pub fn get_activation_handler(&self) -> Result<ActivationHandler> {
        let activation_type = ActivationType::try_from(self.activation_type).unwrap();
        let curr_point = match activation_type {
            ActivationType::Slot => Clock::get()?.slot,
            ActivationType::Timestamp => Clock::get()?.unix_timestamp as u64,
        };
        Ok(ActivationHandler {
            curr_point,
            activation_point: self.activation_point,
            airdrop_bonus: self.airdrop_bonus,
        })
    }
    pub fn accumulate_bonus(&mut self, bonus: u64) -> Result<()> {
        self.airdrop_bonus.total_claimed_bonus =
            self.airdrop_bonus.total_claimed_bonus.safe_add(bonus)?;
        Ok(())
    }
    fn get_max_bonus_for_a_claimant(&self, unlocked_amount: u64) -> Result<u64> {
        let max_total_claim_without_bonus =
            self.max_total_claim
                .safe_sub(self.airdrop_bonus.total_bonus)? as u128;

        let amount = (unlocked_amount as u128)
            .safe_mul(self.airdrop_bonus.total_bonus as u128)?
            .safe_div(max_total_claim_without_bonus)? as u64;
        Ok(amount)
    }
    pub fn get_bonus_for_a_claimaint(
        &self,
        unlocked_amount: u64,
        activation_handler: &ActivationHandler,
    ) -> Result<u64> {
        let max_bonus = self.get_max_bonus_for_a_claimant(unlocked_amount)?;
        activation_handler.get_bonus_for_a_claimaint(max_bonus)
    }
    #[inline] pub fn bitmap_is_set(&self, idx: u32) -> bool { self.claimed_bitmap.is_set(idx) }
    #[inline] pub fn bitmap_set(&mut self, idx: u32) { self.claimed_bitmap.set(idx) }
}

impl MerkleDistributor {
    pub const LEN: usize = 8 + std::mem::size_of::<MerkleDistributor>();
}
