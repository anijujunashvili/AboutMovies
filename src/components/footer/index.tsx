import Socials from "./socials";
import Logo from "../logo";
import FooterMenu from "./footer-menu";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

const Footer = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const footerStyle =
    lang === "ka"
      ? "h-auto border-t dark:border-muted-foreground py-4 pt-10 ka"
      : "h-auto border-t  dark:border-muted py-4 pt-10 ge";

  return (
    <>
      <div className={footerStyle}>
        <div className="mx-auto flex w-full flex-col space-y-4 px-4 lg:w-5/6">
          <div className="flex flex-row justify-between">
            <Logo />
            <div className="flex flex-row space-x-2 py-2">
              <Socials />
            </div>
          </div>
          <div className="flex flex-row justify-start md:justify-center">
            <FooterMenu />
          </div>
          <div className="md:text-md dark:border-muted flex flex-col justify-between gap-2 border-t py-2 text-xs sm:text-sm md:flex-row md:py-4 dark:text-gray-300">
            <div>
              {t("layout.rights")} &copy;{new Date().getFullYear()}
              <span className="en ml-2 cursor-pointer hover:underline">
                AboutMovies
              </span>
            </div>
            <div className="flex flex-row space-x-2 text-center align-middle">
              <Mail className="w-[16px] md:w-[20px]" />
              <span className="en cursor-pointer pt-1 md:p-0">
                ana.jujunashvili@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
