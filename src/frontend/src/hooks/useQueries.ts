import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";

export interface Review {
  id: bigint;
  name: string;
  rating: bigint;
  comment: string;
  timestamp: bigint;
}

export function useGetReviews() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getReviews() as Promise<Review[]>;
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitReview() {
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      name,
      rating,
      comment,
    }: {
      name: string;
      rating: number;
      comment: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return (actor as any).submitReview(
        name,
        BigInt(rating),
        comment,
      ) as Promise<bigint>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
  return { ...mutation, isActorReady: !!actor && !isFetching };
}
