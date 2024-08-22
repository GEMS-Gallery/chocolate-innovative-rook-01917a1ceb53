export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getGreeting' : IDL.Func([], [IDL.Text], ['query']),
    'getMetadata' : IDL.Func([], [IDL.Int, IDL.Nat], ['query']),
    'updateGreeting' : IDL.Func([IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
