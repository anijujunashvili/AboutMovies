import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum";
import { getNews, getNewsInfo } from "@/supabase/news";

export const useGetNews = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NEWS],
    queryFn: getNews,
  });
};

export const useGetNewsInfo = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_NEWS_INFO, id],
    queryFn: () => getNewsInfo(id),
  });
};
