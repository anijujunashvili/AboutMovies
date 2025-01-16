import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum";
import { getUserReviews } from "@/supabase/reviews";

export const useGetUserReviews = (m_id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER_REVIEWS, m_id],
    queryFn: () => getUserReviews(m_id),
  });
};
