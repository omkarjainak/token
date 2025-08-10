import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'Ok' : string } |
  { 'Err' : TokenError };
export type TokenError = { 'InvalidAmount' : null } |
  { 'InsufficientBalance' : null } |
  { 'Unauthorized' : null } |
  { 'Other' : string };
export interface Transaction {
  'to' : [] | [Principal],
  'from' : [] | [Principal],
  'timestamp' : bigint,
  'tx_type' : string,
  'amount' : bigint,
}
export interface _SERVICE {
  'get_all_transactions' : ActorMethod<[], Array<Transaction>>,
  'get_balance_of' : ActorMethod<[Principal], bigint>,
  'get_my_balance' : ActorMethod<[], bigint>,
  'get_my_principal' : ActorMethod<[], string>,
  'get_my_transactions' : ActorMethod<[], Array<Transaction>>,
  'get_total_supply' : ActorMethod<[], bigint>,
  'greet' : ActorMethod<[string], string>,
  'mine_tokens' : ActorMethod<[bigint], Result>,
  'sell_tokens' : ActorMethod<[bigint], Result>,
  'send_tokens' : ActorMethod<[Principal, bigint], Result>,
  'whoami' : ActorMethod<[], Principal>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
