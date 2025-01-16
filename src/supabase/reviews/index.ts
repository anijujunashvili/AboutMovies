import { supabase } from "..";
// import { Tables } from "../supabase.types";
import { userReview } from "@/types/reviews";

export const addReview = async (payload: userReview) => {
  try {
    await supabase.from("user_reviews").insert(payload);
  } catch (error) {
    console.log("Error during adding review", error);
  }
};
