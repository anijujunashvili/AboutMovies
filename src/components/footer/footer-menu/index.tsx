import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FooterMenu = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <ul className="mt-4 flex space-x-4 p-4 text-sm font-normal md:mt-0 md:flex-row md:border-0 md:p-0 dark:border-gray-700 dark:text-gray-300">
          <li>
            <Link to="/home" className="hover:underline" aria-current="page">
              {t("layout.home")}
            </Link>
          </li>
          <li>
            <Link to="about" className="hover:underline">
              {t("layout.about")}
            </Link>
          </li>
          <li>
            <Link to="movies" className="hover:underline">
              {t("layout.movies")}
            </Link>
          </li>
          <li>
            <Link to="about" className="hover:underline">
              {t("layout.top_20")}
            </Link>
          </li>
          <li>
            <Link to="about" className="hover:underline">
              {t("layout.jobs")}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FooterMenu;
