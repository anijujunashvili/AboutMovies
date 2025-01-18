import { NavLink, NavLinkRenderProps } from "react-router";
import { useTranslation } from "react-i18next";
import { APP_PATHS } from "@/routes/enum";

const NavBar = () => {
  const { t } = useTranslation();
  const ActiveMenu = (props: NavLinkRenderProps) => {
    const { isActive } = props;
    return isActive
      ? "block py-1 px-3 text-primary text-sm lg:text-md"
      : "block py-1 px-3 hover:text-primary text-sm lg:text-md dark:text-gray-300";
  };
  return (
    <div className="hidden justify-end pl-5 md:block md:grow">
      <ul className="mt-4 flex flex-col rounded-lg p-4 font-semibold md:mt-0 md:flex-row md:space-x-6 md:border-0 md:p-0 dark:border-gray-700">
        <li>
          <NavLink
            to={APP_PATHS.HOME}
            className={ActiveMenu}
            aria-current="page"
          >
            {t("layout.home")}
          </NavLink>
        </li>
        <li>
          <NavLink to={APP_PATHS.ABOUT} className={ActiveMenu}>
            {t("layout.about")}
          </NavLink>
        </li>
        <li>
          <NavLink to={APP_PATHS.SEARCH} className={ActiveMenu}>
            {t("layout.movies")}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
