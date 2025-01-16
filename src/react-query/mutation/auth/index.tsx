import { register, login, logout } from "@/supabase/auth";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "../enum";

export const useRegistration = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.REGISTER],
    mutationFn: register,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: [MUTATION_KEYS.LOGIN],
    mutationFn: login,
  });
};
