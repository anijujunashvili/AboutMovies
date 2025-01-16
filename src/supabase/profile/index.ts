import { supabase } from "@/supabase";
import { userInfoType } from "@/types/profile";
import { Database } from "../supabase.types";

type test = {
  user_id: string;
  image: File | null;
};

export const uploadUserPhoto = async (payload: test) => {
  if (payload.image) {
    return supabase.storage
      .from("movies")
      .upload(payload?.image?.name, payload?.image)
      .then(async (res) => {
        return await supabase
          .from("profiles")
          .update({
            image: res.data?.fullPath,
          })
          .eq("id", payload?.user_id)
          .throwOnError()
          .then((result) => {
            console.log(result);
            return result as Database["public"]["Tables"]["profiles"]["Update"];
          });
      });
  }
};

export const fillUserInfo = async (payload: userInfoType) => {
  return supabase
    .from("profiles")
    .upsert(payload)
    .throwOnError()
    .then((result) => {
      return result as Database["public"]["Tables"]["profiles"]["Update"];
    });
};

export const getUserInfo = async (id: string) => {
  if (!id) {
    throw new Error("Id undefined");
  }

  return supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id)
    .then((res) => {
      return res?.data?.[0] as userInfoType;
    });
};

type deletePhoto = {
  userId: string;
  image: string;
};

export const deleteUserPhoto = async (payload: deletePhoto) => {
  // const imagedel = import.meta.env.VITE_SUPABASE_STORAGE_URL + payload.image;
  const test = "462342740_18444065272071290_6673994856655417582_n.jpg";

  supabase.storage
    .from("movies")
    .remove([test])
    .then(() => {
      return supabase
        .from("profiles")
        .update({ image: "" })
        .eq("id", payload.userId)
        .throwOnError()
        .then((result) => {
          console.log("after update", result);
          return result as Database["public"]["Tables"]["profiles"]["Update"];
        });
    });
};
