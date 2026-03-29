import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;

export interface Review {
    id: bigint;
    name: string;
    rating: bigint;
    comment: string;
    timestamp: bigint;
}

export interface backendInterface {
    submitReview(name: string, rating: bigint, comment: string): Promise<bigint>;
    getReviews(): Promise<Review[]>;
}
