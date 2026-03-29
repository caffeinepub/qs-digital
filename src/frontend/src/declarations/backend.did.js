export const idlFactory = ({ IDL }) => {
  const Review = IDL.Record({
    id: IDL.Nat,
    name: IDL.Text,
    rating: IDL.Nat,
    comment: IDL.Text,
    timestamp: IDL.Int,
  });
  return IDL.Service({
    submitReview: IDL.Func([IDL.Text, IDL.Nat, IDL.Text], [IDL.Nat], []),
    getReviews: IDL.Func([], [IDL.Vec(Review)], ["query"]),
  });
};
export const init = ({ IDL }) => [];
