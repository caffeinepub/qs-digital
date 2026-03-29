import type { ActorMethod } from '@icp-sdk/core';
import type { IDL } from '@icp-sdk/core';

export interface Review {
  id: bigint;
  name: string;
  rating: bigint;
  comment: string;
  timestamp: bigint;
}
export interface _SERVICE {
  submitReview: ActorMethod<[string, bigint, string], bigint>;
  getReviews: ActorMethod<[], Review[]>;
}
export type idlFactory = IDL.InterfaceFactory;
export type init = (args: { IDL: IDL }) => IDL.Type[];
