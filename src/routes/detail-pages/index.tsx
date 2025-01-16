/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { APP_PATHS } from "../enum";
import { Route } from "react-router-dom";
import Loader from "@/components/loader";

const Search = lazy(() => import("@/pages/search/views"));
const MovieInfo = lazy(() => import("@/pages/movies-inner/views"));

export const DETAIL_PAGES_ROUTE = [
  <Route
    path={APP_PATHS.SEARCH}
    element={
      <Suspense fallback={<Loader />}>
        <Search />
      </Suspense>
    }
    key={APP_PATHS.SEARCH}
  />,
  <Route
    path={APP_PATHS.MOVIES + "/:id"}
    element={
      <Suspense fallback={<Loader />}>
        <MovieInfo />
      </Suspense>
    }
    key={APP_PATHS.MOVIES + "/:id"}
  />,
];
