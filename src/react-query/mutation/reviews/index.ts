import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../enum";
import { addReview } from "@/supabase/reviews";

export const useAddUserReview = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.ADD_REVIEW],
    mutationFn: addReview,
  });
};
