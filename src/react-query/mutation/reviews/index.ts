import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../enum";
import { addReview } from "@/supabase/reviews";

export const useAddUserReview = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.ADD_REVIEW],
    mutationFn: addReview,
    // onSuccess: (data) => {
    //   //   queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER] });
    // },
  });
};
