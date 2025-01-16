import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { userAtom } from "@/store/auth";
import { useAtomValue } from "jotai";
import AvatarDropdown from "./avatar";
import { Link, useParams } from "react-router-dom";
import { APP_PATHS } from "@/routes/enum";

const AuthBtn = () => {
  const { t } = useTranslation();
  const { lang } = useParams();

  const user = useAtomValue(userAtom);

  //const userInfo = user?.user?.email as userType;
  return (
    <>
      {user ? (
        <AvatarDropdown />
      ) : (
        <Link to={`/${lang}/${APP_PATHS.LOGIN}`}>
          <Button className="hidden rounded-full md:block">
            {t("login.login")}
          </Button>
        </Link>
      )}
    </>
  );
};

export default AuthBtn;
