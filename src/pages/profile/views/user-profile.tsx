import { useTranslation } from "react-i18next";
import UserCover from "./user-cover";
import UserForm from "./user-form";
import MoviesList from "@/components/movies-list";

const Profile = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col">
      <UserCover />
      <UserForm />
      <MoviesList headline={t("layout.rated_movies")} />
    </div>
  );
};

export default Profile;
