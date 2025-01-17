import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LoginKa from "./ka/login.json";
import LoginEn from "./en/login.json";

import RegisterKa from "./ka/registration.json";
import RegisterEn from "./en/registration.json";

import LayoutKa from "./ka/layout.json";
import LayoutEn from "./en/layout.json";

import ProfileKa from "./ka/profile.json";
import ProfileEn from "./en/profile.json";

import monthsKa from "./ka/months.json";
import monthsEn from "./en/months.json";

import actorKa from "./ka/actor.json";
import actorEn from "./en/actor.json";

import moviesKa from "./ka/movies.json";
import moviesEn from "./en/movies.json";

i18n.use(initReactI18next).init({
  resources: {
    ka: {
      translation: {
        login: LoginKa,
        registration: RegisterKa,
        layout: LayoutKa,
        profile: ProfileKa,
        months: monthsKa,
        actor: actorKa,
        movies: moviesKa,
      },
    },
    en: {
      translation: {
        login: LoginEn,
        registration: RegisterEn,
        layout: LayoutEn,
        profile: ProfileEn,
        months: monthsEn,
        actor: actorEn,
        movies: moviesEn,
      },
    },
  },
  //lng: "en",
  fallbackLng: "ka",

  interpolation: {
    escapeValue: false,
  },
});

export const LangList = ["ka", "en"];
export const DefaultLang = "en";
