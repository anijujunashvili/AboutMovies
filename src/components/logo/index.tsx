import { APP_PATHS } from "@/routes/enum";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="flex">
      <Link to={APP_PATHS.HOME}>
        <div className="Logo en cursor-pointer text-2xl font-bold">
          <span className="text-primary">About</span>
          <span className="text-secondary">Movies</span>
        </div>
      </Link>
    </div>
  );
};

export default Logo;
