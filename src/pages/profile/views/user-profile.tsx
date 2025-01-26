import { useTranslation } from "react-i18next";
import UserCover from "./user-cover";
import UserForm from "./user-form";
import MoviesList from "@/components/movies-list";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "@/store/auth";
import { APP_PATHS } from "@/routes/enum";

const Profile = () => {
  const { t } = useTranslation();
  const [user] = useAtom(userAtom);
  const { lang } = useParams();
  const navigate = useNavigate();
  if (!user) {
    navigate(`/${lang}/${APP_PATHS.LOGIN}`);
  }
  return (
    <div className="flex flex-col">
      <UserCover />
      <UserForm />
      <MoviesList headline={t("layout.top_movies")} />
    </div>
  );
};

export default Profile;
