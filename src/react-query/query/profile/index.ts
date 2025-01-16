import { getUserInfo } from "@/supabase/profile";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../enum.ts";
import { userInfoType } from "@/types/profile";

export const useGetUserInfo = (userId: string) => {
  const { data: UserInfo } = useQuery({
    queryKey: [QUERY_KEYS.GET_USER],
    queryFn: () => getUserInfo(userId),
  });
  return UserInfo as userInfoType;
};

export const useGetUserInfoTest = (userId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_USER],
    queryFn: () => getUserInfo(userId),
  });
};
