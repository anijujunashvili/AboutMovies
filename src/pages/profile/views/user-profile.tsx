import UserCover from "./user-cover";
import UserForm from "./user-form";
import MoviesList from "@/components/movies-list";

const Profile = () => {
  return (
    <div className="flex flex-col">
      <UserCover />
      <UserForm />
      <MoviesList headline="Rated Movies" />
    </div>
  );
};

export default Profile;
