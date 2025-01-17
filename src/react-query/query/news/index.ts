import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum";
import { getNews } from "@/supabase/news";

export const useGetNews = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NEWS],
    queryFn: getNews,
  });
};
