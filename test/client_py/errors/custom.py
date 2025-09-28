import typing
from anchorpy.error import ProgramError


class DepositStartTooFarInFuture(ProgramError):
    def __init__(self) -> None:
        super().__init__(6000, "Deposit Start too far in future")

    code = 6000
    name = "DepositStartTooFarInFuture"
    msg = "Deposit Start too far in future"


class InvalidProof(ProgramError):
    def __init__(self) -> None:
        super().__init__(6001, "Invalid Merkle proof.")

    code = 6001
    name = "InvalidProof"
    msg = "Invalid Merkle proof."


class ExceededMaxClaim(ProgramError):
    def __init__(self) -> None:
        super().__init__(6002, "Exceeded maximum claim amount.")

    code = 6002
    name = "ExceededMaxClaim"
    msg = "Exceeded maximum claim amount."


class ExceededMaxNumNodes(ProgramError):
    def __init__(self) -> None:
        super().__init__(6003, "Exceeded maximum number of claimed nodes.")

    code = 6003
    name = "ExceededMaxNumNodes"
    msg = "Exceeded maximum number of claimed nodes."


class Unauthorized(ProgramError):
    def __init__(self) -> None:
        super().__init__(6004, "Account is not authorized to execute this instruction")

    code = 6004
    name = "Unauthorized"
    msg = "Account is not authorized to execute this instruction"


class OwnerMismatch(ProgramError):
    def __init__(self) -> None:
        super().__init__(6005, "Token account owner did not match intended owner")

    code = 6005
    name = "OwnerMismatch"
    msg = "Token account owner did not match intended owner"


class ClawbackBeforeVestingEnd(ProgramError):
    def __init__(self) -> None:
        super().__init__(6006, "Clawback cannot be before vesting ends")

    code = 6006
    name = "ClawbackBeforeVestingEnd"
    msg = "Clawback cannot be before vesting ends"


class ClawbackBeforeStart(ProgramError):
    def __init__(self) -> None:
        super().__init__(6007, "Attempting to clawback before clawback start")

    code = 6007
    name = "ClawbackBeforeStart"
    msg = "Attempting to clawback before clawback start"


class ClawbackAlreadyClaimed(ProgramError):
    def __init__(self) -> None:
        super().__init__(6008, "Clawback already claimed")

    code = 6008
    name = "ClawbackAlreadyClaimed"
    msg = "Clawback already claimed"


class InsufficientClawbackDelay(ProgramError):
    def __init__(self) -> None:
        super().__init__(6009, "Clawback start must be at least one day after vesting end")

    code = 6009
    name = "InsufficientClawbackDelay"
    msg = "Clawback start must be at least one day after vesting end"


class ClawbackNewReceiverCannotBeSame(ProgramError):
    def __init__(self) -> None:
        super().__init__(6010, "New Clawback Receiver cannot be same as old")

    code = 6010
    name = "ClawbackNewReceiverCannotBeSame"
    msg = "New Clawback Receiver cannot be same as old"


class NewAdminCannotBeSame(ProgramError):
    def __init__(self) -> None:
        super().__init__(6011, "New Admin cannot be same as old")

    code = 6011
    name = "NewAdminCannotBeSame"
    msg = "New Admin cannot be same as old"


class ClaimExpired(ProgramError):
    def __init__(self) -> None:
        super().__init__(6012, "Cannot create claim; claim window expired")

    code = 6012
    name = "ClaimExpired"
    msg = "Cannot create claim; claim window expired"


class ArithmeticError(ProgramError):
    def __init__(self) -> None:
        super().__init__(6013, "Arithmetic Error (overflow/underflow)")

    code = 6013
    name = "ArithmeticError"
    msg = "Arithmetic Error (overflow/underflow)"


class StartTimestampAfterEnd(ProgramError):
    def __init__(self) -> None:
        super().__init__(6014, "Start Timestamp cannot be after end Timestamp")

    code = 6014
    name = "StartTimestampAfterEnd"
    msg = "Start Timestamp cannot be after end Timestamp"


class TimestampsNotInFuture(ProgramError):
    def __init__(self) -> None:
        super().__init__(6015, "Timestamps cannot be in the past")

    code = 6015
    name = "TimestampsNotInFuture"
    msg = "Timestamps cannot be in the past"


class InvalidVersion(ProgramError):
    def __init__(self) -> None:
        super().__init__(6016, "Airdrop Version Mismatch")

    code = 6016
    name = "InvalidVersion"
    msg = "Airdrop Version Mismatch"


class ClaimingIsNotStarted(ProgramError):
    def __init__(self) -> None:
        super().__init__(6017, "Claiming is not started")

    code = 6017
    name = "ClaimingIsNotStarted"
    msg = "Claiming is not started"


class CannotCloseDistributor(ProgramError):
    def __init__(self) -> None:
        super().__init__(6018, "Cannot close distributor")

    code = 6018
    name = "CannotCloseDistributor"
    msg = "Cannot close distributor"


class InvalidActivationType(ProgramError):
    def __init__(self) -> None:
        super().__init__(6019, "Invalid activation type")

    code = 6019
    name = "InvalidActivationType"
    msg = "Invalid activation type"


class IndexOutOfRange(ProgramError):
    def __init__(self) -> None:
        super().__init__(6020, "Claim index out of range")

    code = 6020
    name = "IndexOutOfRange"
    msg = "Claim index out of range"


class AlreadyClaimed(ProgramError):
    def __init__(self) -> None:
        super().__init__(6021, "Already claimed")

    code = 6021
    name = "AlreadyClaimed"
    msg = "Already claimed"


CustomError = typing.Union[
    DepositStartTooFarInFuture,
    InvalidProof,
    ExceededMaxClaim,
    ExceededMaxNumNodes,
    Unauthorized,
    OwnerMismatch,
    ClawbackBeforeVestingEnd,
    ClawbackBeforeStart,
    ClawbackAlreadyClaimed,
    InsufficientClawbackDelay,
    ClawbackNewReceiverCannotBeSame,
    NewAdminCannotBeSame,
    ClaimExpired,
    ArithmeticError,
    StartTimestampAfterEnd,
    TimestampsNotInFuture,
    InvalidVersion,
    ClaimingIsNotStarted,
    CannotCloseDistributor,
    InvalidActivationType,
    IndexOutOfRange,
    AlreadyClaimed,
]
CUSTOM_ERROR_MAP: dict[int, CustomError] = {
    6000: DepositStartTooFarInFuture(),
    6001: InvalidProof(),
    6002: ExceededMaxClaim(),
    6003: ExceededMaxNumNodes(),
    6004: Unauthorized(),
    6005: OwnerMismatch(),
    6006: ClawbackBeforeVestingEnd(),
    6007: ClawbackBeforeStart(),
    6008: ClawbackAlreadyClaimed(),
    6009: InsufficientClawbackDelay(),
    6010: ClawbackNewReceiverCannotBeSame(),
    6011: NewAdminCannotBeSame(),
    6012: ClaimExpired(),
    6013: ArithmeticError(),
    6014: StartTimestampAfterEnd(),
    6015: TimestampsNotInFuture(),
    6016: InvalidVersion(),
    6017: ClaimingIsNotStarted(),
    6018: CannotCloseDistributor(),
    6019: InvalidActivationType(),
    6020: IndexOutOfRange(),
    6021: AlreadyClaimed(),
}


def from_code(code: int) -> typing.Optional[CustomError]:
    maybe_err = CUSTOM_ERROR_MAP.get(code)
    if maybe_err is None:
        return None
    return maybe_err
