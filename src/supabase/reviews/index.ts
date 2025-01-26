import { supabase } from "..";
import { userReview, reviewWithUserInfo } from "@/types/reviews";
import { mapUserReviews } from "@/supabase/utils";

export const addReview = async (payload: userReview) => {
  try {
    await supabase.from("user_reviews").insert(payload);
  } catch (error) {
    console.log("Error during adding review", error);
  }
};

export const getUserReviews = async (m_id: number) => {
  try {
    const result = await supabase
      .from("user_reviews")
      .select("*")
      .eq("m_id", m_id)
      .order("created_at", { ascending: false });
    const users = result.data?.map((r) => r.user_id);
    const profiles = await supabase
      .from("profiles")
      .select("*")
      .filter("id", "in", `(${users})`);

    const newAraay = mapUserReviews(result.data, profiles.data);

    return newAraay as reviewWithUserInfo[];
  } catch (error) {
    console.log("Error during get reviews list", error);
  }
};
