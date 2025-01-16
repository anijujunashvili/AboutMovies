import { supabase } from "@/supabase";
import { userInfoType } from "@/types/profile";

type test = {
  user_id: string;
  image: File | null;
};

export const uploadUserPhoto = async (payload: test) => {
  if (payload.image) {
    return supabase.storage
      .from("movies")
      .upload(payload?.image?.name, payload?.image)
      .then((res) => {
        return supabase
          .from("profiles")
          .update({
            image: res.data?.fullPath,
          })
          .eq("id", payload?.user_id)
          .throwOnError()
          .then((result) => {
            console.log(result);
            return result;
          });
      });
  }
};

export const fillUserInfo = async (payload: userInfoType) => {
  if (payload.image) {
    supabase.storage
      .from("movies")
      .upload(payload?.image?.name, payload?.image)
      .then((res) => {
        return supabase
          .from("profiles")
          .upsert({
            name_ka: payload.name_ka,
            name_en: payload.name_en,
            phone: payload.phone,
            email: payload.email,
            image: res.data?.fullPath,
            id: payload.id,
          })
          .throwOnError()
          .then((result) => {
            console.log(result);
            return result;
          });
      });
  } else {
    return supabase
      .from("profiles")
      .upsert(payload)
      .throwOnError()
      .then((result) => {
        return result;
      });
  }
};

export const getUserInfo = async (id: string | number) => {
  if (!id) {
    throw new Error("Id undefined");
  }
  return supabase
    .from("profiles")
    .select("*")
    .eq("user_id", id)
    .then((res) => {
      return res ? (res?.data?.[0] as userInfoType) : (res as userInfoType);
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
    .then((res) => {
      console.log(res);
      return supabase
        .from("profiles")
        .update({ image: "" })
        .eq("id", payload.userId)
        .throwOnError()
        .then((result) => {
          console.log("after update", result);
          return result;
        });
    });
};
