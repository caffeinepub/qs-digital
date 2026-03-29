import Array "mo:base/Array";
import Time "mo:base/Time";

actor {
  public type Review = {
    id : Nat;
    name : Text;
    rating : Nat;
    comment : Text;
    timestamp : Int;
  };

  stable var reviews : [Review] = [];
  stable var nextId : Nat = 0;

  public func submitReview(name : Text, rating : Nat, comment : Text) : async Nat {
    let id = nextId;
    nextId += 1;
    let review : Review = {
      id;
      name;
      rating;
      comment;
      timestamp = Time.now();
    };
    reviews := Array.append(reviews, [review]);
    id
  };

  public query func getReviews() : async [Review] {
    reviews
  };
};
