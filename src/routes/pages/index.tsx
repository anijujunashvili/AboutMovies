/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { APP_PATHS } from "../enum";
import { Route } from "react-router-dom";
import Loader from "@/components/loader";

const Home = lazy(() => import("@/pages/home/views"));

export const PAGES_ROUTE = [
  <Route
    path={APP_PATHS.HOME}
    element={
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    }
    key={APP_PATHS.HOME}
  />,
  <Route
    index
    element={
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    }
    key={APP_PATHS.INDEX}
  />,
];
