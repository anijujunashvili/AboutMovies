/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { APP_PATHS } from "../enum";
import { Route } from "react-router-dom";
import Loader from "@/components/loader";

const SignIn = lazy(() => import("@/pages/login"));
const SignUp = lazy(() => import("@/pages/register/views"));
const UserProfile = lazy(() => import("@/pages/profile/views/user-profile"));
export const lOGIN_ROUTE = [
  <Route
    path={APP_PATHS.LOGIN}
    element={
      <Suspense fallback={<Loader />}>
        <SignIn />
      </Suspense>
    }
    key={APP_PATHS.LOGIN}
  />,
  <Route
    path={APP_PATHS.REGISTER}
    element={
      <Suspense fallback={<Loader />}>
        <SignUp />
      </Suspense>
    }
    key={APP_PATHS.REGISTER}
  />,
  <Route
    path={APP_PATHS.PROFILE}
    element={
      <Suspense fallback={<Loader />}>
        <UserProfile />
      </Suspense>
    }
    key={APP_PATHS.PROFILE}
  />,
];
