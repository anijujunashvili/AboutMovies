import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/auth";
import NotFoundLayout from "@/layouts/not-found";
import DetailPagesLayout from "@/layouts/detail-pages";
import LangGuard from "./route-guards/lang";
import { lOGIN_ROUTE } from "./auth";
import { PAGES_ROUTE } from "./pages";
import NotFount from "@/pages/404";
import { DefaultLang } from "@/locale";
import { DETAIL_PAGES_ROUTE } from "./detail-pages";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path=":lang" element={<LangGuard />}>
          <Route element={<AuthLayout />}>{lOGIN_ROUTE}</Route>
          <Route element={<AuthLayout />}>{PAGES_ROUTE}</Route>
          <Route element={<DetailPagesLayout />}>{DETAIL_PAGES_ROUTE}</Route>
          <Route
            path="*"
            element={
              <NotFoundLayout>
                <NotFount />
              </NotFoundLayout>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to={`/${DefaultLang}`} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
