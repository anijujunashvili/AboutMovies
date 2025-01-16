import Socials from "./socials";
import Logo from "../logo";
import FooterMenu from "./footer-menu";
import { Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const footerStyle =
    lang === "ka"
      ? "h-auto w-full border-t py-4 pt-16 ka"
      : "h-auto w-full border-t py-4 pt-16 ge";

  return (
    <>
      <div className={footerStyle}>
        <div className="mx-auto flex w-5/6 flex-col space-y-4">
          <div className="flex flex-row justify-between">
            <Logo />
            <div className="flex flex-row space-x-2 py-2">
              <Socials />
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <FooterMenu />
          </div>
          <div className="flext-row md:text-md flex justify-between border-t py-4 text-sm">
            <div>
              {t("layout.rights")} &copy;{new Date().getFullYear()}
              <span className="en ml-2 cursor-pointer hover:underline">
                AboutMovies
              </span>
            </div>
            <div className="flex flex-row space-x-2 align-middle">
              <Mail size={20} className="pt-1" />
              <span className="en cursor-pointer">
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
