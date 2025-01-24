import { supabase } from "..";
import { movieType } from "@/types/search";
import { ActorTypeWithPag } from "@/types/actors";
import { advancedSearch } from "@/types/search";
import { moviesWithPagType } from "@/types/movies";
// import { searchWithPag } from "../utils";

export const getSearchInfo = async (key: string, lang: string) => {
  try {
    //if (key.length < 2) return;
    const searchColumn = lang === "ka" ? "name_ka" : "name_en";

    const result = await supabase
      .from("movies")
      .select("*")
      .ilike(searchColumn, `%${key ?? ""}%`)
      .limit(6);

    return result.data as movieType[];
  } catch (error) {
    console.log("Error during get movies list", error);
  }
};

export const getAdvancedSearchInfo = async (payload: advancedSearch) => {
  try {
    const searchColumn = payload.lang === "ka" ? "name_ka" : "name_en";
    const table = payload.where === "celebs" ? "actors" : "movies";

    const result = await supabase
      .from(table)
      .select("*", { count: "exact" })
      .ilike(searchColumn, `%${payload.search}%`)
      .range(payload.from, payload.to);

    const newArray = result.data?.map((res) => {
      return { ...res, count: result.count };
    });

    return newArray as moviesWithPagType[] | ActorTypeWithPag[];
  } catch (error) {
    console.log("Error search", error);
  }
};
