import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../enum";
import {
  fillUserInfo,
  deleteUserPhoto,
  uploadUserPhoto,
} from "@/supabase/profile";
import { QUERY_KEYS } from "../../query/enum";

export const useEditProfileInfo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.EDIT_USER],
    mutationFn: fillUserInfo,
    onSuccess: (data) => {
      console.log("editze aq modis", data);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER] });
    },
  });
};

export const useUploadUserPhoto = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.UPLOAD_USER_IMAGE],
    mutationFn: uploadUserPhoto,
  });
};

export const useDeleteUserPhoto = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_USER_PHOTO],
    mutationFn: deleteUserPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER] });
    },
  });
};
