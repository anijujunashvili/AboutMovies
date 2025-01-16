import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum";
import { getSearchInfo, getAdvancedSearchInfo } from "@/supabase/search";
import { advancedSearch } from "@/types/search";

export const useGetSearchedInfo = (key: string, lang: string) => {
  const { data: searchInfo } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH, key],
    queryFn: () => getSearchInfo(key, lang),
    enabled: key?.length > 1,
  });
  return searchInfo;
};

export const useGetAdvancedSearchInfo = (payload: advancedSearch) => {
  const { data, isPending } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH, payload],
    queryFn: () => getAdvancedSearchInfo(payload),
  });

  return { data, isPending };
};
