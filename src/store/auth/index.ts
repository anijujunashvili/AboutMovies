import { atom } from "jotai";
import { Session } from "@supabase/supabase-js";
import { userInfoType } from "@/types/profile";
import { userRatedMoviesType } from "@/types/movies";

export const userAtom = atom<Session | null>(null);
export const meAtom = atom<userInfoType | null>(null);
export const ratedMoviesAtom = atom<userRatedMoviesType[] | null>(null);
