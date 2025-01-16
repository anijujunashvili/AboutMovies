import { PropsWithChildren } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { LangList, DefaultLang } from "@/locale";
// import i18n from "i18next";

const LangGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const { lang } = useParams();

  if (!LangList.includes(lang as string)) {
    return <Navigate to={`/${DefaultLang}/`} />;
  }

  // i18n.changeLanguage(lang);

  return children || <Outlet />;
};

export default LangGuard;
