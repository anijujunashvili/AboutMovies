import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../enum";
import { rateMovie } from "@/supabase/movies";

export const useRateMovie = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.RATE_MOVIE],
    mutationFn: rateMovie,
  });
};
