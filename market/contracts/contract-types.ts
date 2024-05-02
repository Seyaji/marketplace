// Enum for the type field
export enum FunctionType {
  Constructor = "constructor",
  Function = "function",
  Event = "event",
  Error = "error",
}

// Enum for the internalType field
export enum InternalType {
  Address = "address",
  Uint256 = "uint256",
  Uint8 = "uint8",
  Uint16 = "uint16",
  Uint32 = "uint32",
  Uint64 = "uint64",
  Uint128 = "uint128",
  Bytes = "bytes",
  String = "string",
  Bool = "bool",
}

export interface ABIParameter {
  internalType: InternalType;
  name: string;
  type: InternalType;
}

export interface ABIEntry {
  inputs?: ABIParameter[];
  outputs?: ABIParameter[];
  stateMutability?: string;
  type?: FunctionType;
  name?: string;
  anonymous?: boolean;
  indexed?: boolean;
}

export interface ContractABI {
  abi: ABIEntry[];
  bytecode: string;
  contractName: string;
}
