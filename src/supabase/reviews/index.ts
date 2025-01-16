import { supabase } from "..";
import { userReview, getUserReviewsType } from "@/types/reviews";

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

    return result.data as getUserReviewsType[] | undefined;
  } catch (error) {
    console.log("Error during get reviews list", error);
  }
};
