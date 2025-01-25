import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { APP_PATHS } from "@/routes/enum";

const FooterMenu = () => {
  const { t } = useTranslation();
  const { lang } = useParams();

  return (
    <>
      <div>
        <ul className="mt-4 flex flex-wrap items-center space-x-4 py-4 text-xs font-normal md:mt-0 md:flex-row md:justify-between md:border-0 md:p-0 md:text-sm dark:border-gray-700 dark:text-gray-300">
          <li>
            <Link
              to={`/${lang}/${APP_PATHS.HOME}`}
              className="hover:underline"
              aria-current="page"
            >
              {t("layout.home")}
            </Link>
          </li>
          <li>
            <Link
              to={`/${lang}/${APP_PATHS.ABOUT}`}
              className="hover:underline"
            >
              {t("layout.about")}
            </Link>
          </li>
          <li>
            <Link
              to={`/${lang}/${APP_PATHS.SEARCH}?from=movies`}
              className="hover:underline"
            >
              {t("layout.movies")}
            </Link>
          </li>
          <li>
            <Link
              to={`/${lang}/${APP_PATHS.SEARCH}?from=celebs`}
              className="hover:underline"
            >
              {t("layout.actors")}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FooterMenu;
