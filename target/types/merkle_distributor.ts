/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/merkle_distributor.json`.
 */
export type MerkleDistributor = {
  "address": "DiSLRwcSFvtwvMWSs7ubBMvYRaYNYupa76ZSuYLe6D7j",
  "metadata": {
    "name": "merkleDistributor",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "A Solana program for distributing tokens according to a Merkle root."
  },
  "instructions": [
    {
      "name": "newClaim",
      "discriminator": [
        78,
        177,
        98,
        123,
        210,
        21,
        187,
        83
      ],
      "accounts": [
        {
          "name": "distributor",
          "docs": [
            "The [MerkleDistributor]."
          ],
          "writable": true
        },
        {
          "name": "from",
          "docs": [
            "Distributor ATA containing the tokens to distribute."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "distributor"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "distributor.mint",
                "account": "merkleDistributor"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "to",
          "docs": [
            "Account to send the claimed tokens to."
          ],
          "writable": true
        },
        {
          "name": "claimant",
          "docs": [
            "Who is claiming the tokens."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "docs": [
            "SPL [Token] program."
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "index",
          "type": "u32"
        },
        {
          "name": "amountUnlocked",
          "type": "u64"
        },
        {
          "name": "amountLocked",
          "type": "u64"
        },
        {
          "name": "proof",
          "type": {
            "vec": {
              "array": [
                "u8",
                32
              ]
            }
          }
        }
      ]
    },
    {
      "name": "newDistributor",
      "discriminator": [
        32,
        139,
        112,
        171,
        0,
        2,
        225,
        155
      ],
      "accounts": [
        {
          "name": "distributor",
          "docs": [
            "[MerkleDistributor]."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  77,
                  101,
                  114,
                  107,
                  108,
                  101,
                  68,
                  105,
                  115,
                  116,
                  114,
                  105,
                  98,
                  117,
                  116,
                  111,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "base"
              },
              {
                "kind": "account",
                "path": "mint"
              },
              {
                "kind": "arg",
                "path": "version"
              }
            ]
          }
        },
        {
          "name": "base",
          "docs": [
            "Base key of the distributor."
          ],
          "signer": true
        },
        {
          "name": "clawbackReceiver",
          "docs": [
            "Clawback receiver token account"
          ],
          "writable": true
        },
        {
          "name": "mint",
          "docs": [
            "The mint to distribute."
          ]
        },
        {
          "name": "tokenVault",
          "docs": [
            "Token vault",
            "Should create previously"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "distributor"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "admin",
          "docs": [
            "Admin wallet, responsible for creating the distributor and paying for the transaction.",
            "Also has the authority to set the clawback receiver and change itself."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "The [System] program."
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "The [Associated Token] program."
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "The [Token] program."
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "version",
          "type": "u64"
        },
        {
          "name": "root",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "maxTotalClaim",
          "type": "u64"
        },
        {
          "name": "maxNumNodes",
          "type": "u64"
        },
        {
          "name": "startVestingTs",
          "type": "i64"
        },
        {
          "name": "endVestingTs",
          "type": "i64"
        },
        {
          "name": "clawbackStartTs",
          "type": "i64"
        },
        {
          "name": "activationPoint",
          "type": "u64"
        },
        {
          "name": "activationType",
          "type": "u8"
        },
        {
          "name": "closable",
          "type": "bool"
        }
      ]
    },
    {
      "name": "newDistributor2",
      "discriminator": [
        69,
        91,
        34,
        247,
        112,
        178,
        21,
        251
      ],
      "accounts": [
        {
          "name": "distributor",
          "docs": [
            "[MerkleDistributor]."
          ],
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  77,
                  101,
                  114,
                  107,
                  108,
                  101,
                  68,
                  105,
                  115,
                  116,
                  114,
                  105,
                  98,
                  117,
                  116,
                  111,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "base"
              },
              {
                "kind": "account",
                "path": "mint"
              },
              {
                "kind": "arg",
                "path": "version"
              }
            ]
          }
        },
        {
          "name": "base",
          "docs": [
            "Base key of the distributor."
          ],
          "signer": true
        },
        {
          "name": "clawbackReceiver",
          "docs": [
            "Clawback receiver token account"
          ],
          "writable": true
        },
        {
          "name": "mint",
          "docs": [
            "The mint to distribute."
          ]
        },
        {
          "name": "tokenVault",
          "docs": [
            "Token vault",
            "Should create previously"
          ],
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "distributor"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "admin",
          "docs": [
            "Admin wallet, responsible for creating the distributor and paying for the transaction.",
            "Also has the authority to set the clawback receiver and change itself."
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "docs": [
            "The [System] program."
          ],
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "associatedTokenProgram",
          "docs": [
            "The [Associated Token] program."
          ],
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "The [Token] program."
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "version",
          "type": "u64"
        },
        {
          "name": "root",
          "type": {
            "array": [
              "u8",
              32
            ]
          }
        },
        {
          "name": "totalClaim",
          "type": "u64"
        },
        {
          "name": "maxNumNodes",
          "type": "u64"
        },
        {
          "name": "startVestingTs",
          "type": "i64"
        },
        {
          "name": "endVestingTs",
          "type": "i64"
        },
        {
          "name": "clawbackStartTs",
          "type": "i64"
        },
        {
          "name": "activationPoint",
          "type": "u64"
        },
        {
          "name": "activationType",
          "type": "u8"
        },
        {
          "name": "closable",
          "type": "bool"
        },
        {
          "name": "totalBonus",
          "type": "u64"
        },
        {
          "name": "bonusVestingDuration",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setActivationPoint",
      "discriminator": [
        91,
        249,
        15,
        165,
        26,
        129,
        254,
        125
      ],
      "accounts": [
        {
          "name": "distributor",
          "docs": [
            "[MerkleDistributor]."
          ],
          "writable": true
        },
        {
          "name": "admin",
          "docs": [
            "Payer to create the distributor."
          ],
          "writable": true,
          "signer": true,
          "relations": [
            "distributor"
          ]
        }
      ],
      "args": [
        {
          "name": "activationPoint",
          "type": "u64"
        }
      ]
    },
    {
      "name": "setAdmin",
      "discriminator": [
        251,
        163,
        0,
        52,
        91,
        194,
        187,
        92
      ],
      "accounts": [
        {
          "name": "distributor",
          "docs": [
            "The [MerkleDistributor]."
          ],
          "writable": true
        },
        {
          "name": "admin",
          "docs": [
            "Admin signer"
          ],
          "writable": true,
          "signer": true
        },
        {
          "name": "newAdmin",
          "docs": [
            "New admin account"
          ],
          "writable": true
        }
      ],
      "args": []
    },
    {
      "name": "setClawbackReceiver",
      "discriminator": [
        153,
        217,
        34,
        20,
        19,
        29,
        229,
        75
      ],
      "accounts": [
        {
          "name": "distributor",
          "docs": [
            "The [MerkleDistributor]."
          ],
          "writable": true
        },
        {
          "name": "newClawbackAccount",
          "docs": [
            "New clawback account"
          ]
        },
        {
          "name": "admin",
          "docs": [
            "Admin signer"
          ],
          "writable": true,
          "signer": true
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "claimStatus",
      "discriminator": [
        22,
        183,
        249,
        157,
        247,
        95,
        150,
        96
      ]
    },
    {
      "name": "merkleDistributor",
      "discriminator": [
        77,
        119,
        139,
        70,
        84,
        247,
        12,
        26
      ]
    }
  ],
  "events": [
    {
      "name": "claimedEvent",
      "discriminator": [
        144,
        172,
        209,
        86,
        144,
        87,
        84,
        115
      ]
    },
    {
      "name": "newClaimEvent",
      "discriminator": [
        244,
        3,
        231,
        151,
        60,
        101,
        55,
        55
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "startTooFarInFuture",
      "msg": "Deposit Start too far in future"
    },
    {
      "code": 6001,
      "name": "invalidProof",
      "msg": "Invalid Merkle proof."
    },
    {
      "code": 6002,
      "name": "exceededMaxClaim",
      "msg": "Exceeded maximum claim amount"
    },
    {
      "code": 6003,
      "name": "maxNodesExceeded",
      "msg": "Exceeded maximum node count"
    },
    {
      "code": 6004,
      "name": "unauthorized",
      "msg": "Account is not authorized to execute this instruction"
    },
    {
      "code": 6005,
      "name": "ownerMismatch",
      "msg": "Token account owner did not match intended owner"
    },
    {
      "code": 6006,
      "name": "clawbackDuringVesting",
      "msg": "Clawback cannot be before vesting ends"
    },
    {
      "code": 6007,
      "name": "clawbackBeforeStart",
      "msg": "Attempted clawback before start"
    },
    {
      "code": 6008,
      "name": "clawbackAlreadyClaimed",
      "msg": "Clawback already claimed"
    },
    {
      "code": 6009,
      "name": "insufficientClawbackDelay",
      "msg": "Clawback start must be at least one day after vesting end"
    },
    {
      "code": 6010,
      "name": "sameClawbackReceiver",
      "msg": "New and old Clawback receivers are identical"
    },
    {
      "code": 6011,
      "name": "sameAdmin",
      "msg": "New and old admin are identical"
    },
    {
      "code": 6012,
      "name": "claimExpired",
      "msg": "Claim window expired"
    },
    {
      "code": 6013,
      "name": "arithmeticError",
      "msg": "Arithmetic Error (overflow/underflow)"
    },
    {
      "code": 6014,
      "name": "startTimestampAfterEnd",
      "msg": "Start Timestamp cannot be after end Timestamp"
    },
    {
      "code": 6015,
      "name": "timestampsNotInFuture",
      "msg": "Timestamps cannot be in the past"
    },
    {
      "code": 6016,
      "name": "invalidVersion",
      "msg": "Airdrop Version Mismatch"
    },
    {
      "code": 6017,
      "name": "claimingIsNotStarted",
      "msg": "Claiming is not started"
    },
    {
      "code": 6018,
      "name": "cannotCloseDistributor",
      "msg": "Cannot close distributor"
    },
    {
      "code": 6019,
      "name": "invalidActivationType",
      "msg": "Invalid activation type"
    },
    {
      "code": 6020,
      "name": "indexOutOfRange",
      "msg": "Claim index out of range"
    },
    {
      "code": 6021,
      "name": "alreadyClaimed",
      "msg": "Already claimed"
    }
  ],
  "types": [
    {
      "name": "airdropBonus",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "totalBonus",
            "docs": [
              "total bonus"
            ],
            "type": "u64"
          },
          {
            "name": "vestingDuration",
            "type": "u64"
          },
          {
            "name": "totalClaimedBonus",
            "docs": [
              "total bonus"
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "claimedEvent",
      "docs": [
        "Emitted when tokens are claimed."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "claimant",
            "docs": [
              "User that claimed."
            ],
            "type": "pubkey"
          },
          {
            "name": "amount",
            "docs": [
              "Amount of tokens to distribute."
            ],
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "merkleDistributor",
      "docs": [
        "State for the account which distributes tokens."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "Bump seed."
            ],
            "type": "u8"
          },
          {
            "name": "version",
            "docs": [
              "Version of the airdrop"
            ],
            "type": "u64"
          },
          {
            "name": "root",
            "docs": [
              "The 256-bit merkle root."
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "mint",
            "docs": [
              "[Mint] of the token to be distributed."
            ],
            "type": "pubkey"
          },
          {
            "name": "base",
            "docs": [
              "base key of distributor."
            ],
            "type": "pubkey"
          },
          {
            "name": "tokenVault",
            "docs": [
              "Token Address of the vault"
            ],
            "type": "pubkey"
          },
          {
            "name": "maxTotalClaim",
            "docs": [
              "Maximum number of tokens that can ever be claimed from this [MerkleDistributor]."
            ],
            "type": "u64"
          },
          {
            "name": "maxNumNodes",
            "docs": [
              "Maximum number of nodes in [MerkleDistributor]."
            ],
            "type": "u64"
          },
          {
            "name": "totalAmountClaimed",
            "docs": [
              "Total amount of tokens that have been claimed."
            ],
            "type": "u64"
          },
          {
            "name": "numNodesClaimed",
            "docs": [
              "Number of nodes that have been claimed."
            ],
            "type": "u64"
          },
          {
            "name": "startTs",
            "docs": [
              "Lockup time start (Unix Timestamp)"
            ],
            "type": "i64"
          },
          {
            "name": "endTs",
            "docs": [
              "Lockup time end (Unix Timestamp)"
            ],
            "type": "i64"
          },
          {
            "name": "clawbackStartTs",
            "docs": [
              "Clawback start (Unix Timestamp)"
            ],
            "type": "i64"
          },
          {
            "name": "clawbackReceiver",
            "docs": [
              "Clawback receiver"
            ],
            "type": "pubkey"
          },
          {
            "name": "admin",
            "docs": [
              "Admin wallet"
            ],
            "type": "pubkey"
          },
          {
            "name": "clawedBack",
            "docs": [
              "Whether or not the distributor has been clawed back"
            ],
            "type": "bool"
          },
          {
            "name": "activationPoint",
            "docs": [
              "this merkle tree is activated from this slot or timestamp"
            ],
            "type": "u64"
          },
          {
            "name": "closable",
            "docs": [
              "indicate that whether admin can close this pool, for testing purpose"
            ],
            "type": "bool"
          },
          {
            "name": "airdropBonus",
            "docs": [
              "bonus multiplier"
            ],
            "type": {
              "defined": {
                "name": "airdropBonus"
              }
            }
          },
          {
            "name": "activationType",
            "docs": [
              "activation type, 0 means slot, 1 means timestamp"
            ],
            "type": "u8"
          },
          {
            "name": "buffer0",
            "docs": [
              "Buffer 0"
            ],
            "type": {
              "array": [
                "u8",
                7
              ]
            }
          },
          {
            "name": "buffer1",
            "docs": [
              "Buffer 1"
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "buffer2",
            "docs": [
              "Buffer 2"
            ],
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "newClaimEvent",
      "docs": [
        "Emitted when a new claim is created."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "claimant",
            "docs": [
              "User that claimed."
            ],
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "docs": [
              "Timestamp."
            ],
            "type": "i64"
          }
        ]
      }
    }
  ]
};
