import { supabase } from "..";
import { Database } from "../supabase.types";

export const getNews = async () => {
  try {
    const result = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    return result.data as Database["public"]["Tables"]["news"]["Row"][];
  } catch (error) {
    console.log("Error during get reviews list", error);
  }
};

export const getNewsInfo = async (id: number) => {
  try {
    const result = await supabase.from("news").select("*").eq("id", id);

    const newsInfo = result.data ? result.data[0] : result.data;
    return newsInfo as Database["public"]["Tables"]["news"]["Row"];
  } catch (error) {
    console.log("Error during get reviews list", error);
  }
};
