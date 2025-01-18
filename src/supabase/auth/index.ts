import { supabase } from "..";

export const register = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await supabase.auth
    .signUp({
      email,
      password,
    })
    .then((res) => {
      const user_id = res.data.user?.id;
      const email = res.data.user?.email;
      if (user_id && email) {
        return supabase
          .from("profiles")
          .insert({ user_id: user_id, email: email });
      }
    });
};

export const login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return supabase.auth.signInWithPassword({ email, password }).then((res) => {
    if (
      res?.error &&
      res?.error?.status &&
      (res?.error?.status < 200 || res?.error?.status >= 300)
    ) {
      throw new Error("Login");
    }
  });
};

export const logout = () => {
  return supabase.auth.signOut();
};
