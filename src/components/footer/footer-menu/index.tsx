import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FooterMenu = () => {
  const { t } = useTranslation();

  return (
    <>
      <div>
        <ul className="mt-4 flex flex-wrap items-center space-x-4 py-4 text-xs font-normal md:mt-0 md:flex-row md:justify-between md:border-0 md:p-0 md:text-sm dark:border-gray-700 dark:text-gray-300">
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
              {t("layout.jobs")}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FooterMenu;
