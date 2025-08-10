export const idlFactory = ({ IDL }) => {
  const Transaction = IDL.Record({
    'to' : IDL.Opt(IDL.Principal),
    'from' : IDL.Opt(IDL.Principal),
    'timestamp' : IDL.Nat64,
    'tx_type' : IDL.Text,
    'amount' : IDL.Nat64,
  });
  const TokenError = IDL.Variant({
    'InvalidAmount' : IDL.Null,
    'InsufficientBalance' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Text,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : TokenError });
  return IDL.Service({
    'get_all_transactions' : IDL.Func([], [IDL.Vec(Transaction)], ['query']),
    'get_balance_of' : IDL.Func([IDL.Principal], [IDL.Nat64], ['query']),
    'get_my_balance' : IDL.Func([], [IDL.Nat64], ['query']),
    'get_my_principal' : IDL.Func([], [IDL.Text], ['query']),
    'get_my_transactions' : IDL.Func([], [IDL.Vec(Transaction)], ['query']),
    'get_total_supply' : IDL.Func([], [IDL.Nat64], ['query']),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'mine_tokens' : IDL.Func([IDL.Nat64], [Result], []),
    'sell_tokens' : IDL.Func([IDL.Nat64], [Result], []),
    'send_tokens' : IDL.Func([IDL.Principal, IDL.Nat64], [Result], []),
    'whoami' : IDL.Func([], [IDL.Principal], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
