import { Menu, Search } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { useTranslation } from "react-i18next";

const SHEET_SIDES = ["right"] as const;

// type SheetSide = (typeof SHEET_SIDES)[number];

const MobileMenu = () => {
  const { t } = useTranslation();

  return (
    <div className="dark:text-secondary grid grid-cols-2 gap-4 pt-2 md:hidden">
      <Link to="/en/search">
        <Search />
      </Link>
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild className="text-white">
            <Menu />
          </SheetTrigger>
          <SheetContent side={side} className="dark:text-white">
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
            <div>
              <ul className="text-md dark:text-secondary mt-4 flex flex-col justify-start space-y-4 font-normal md:mt-0 dark:border-gray-700">
                <li className="hover:text-primary border-b border-gray-700 py-4">
                  <Link
                    to="/home"
                    className="hover:underline"
                    aria-current="page"
                  >
                    {t("layout.home")}
                  </Link>
                </li>
                <li className="hover:text-primary border-b border-gray-700 py-4">
                  <Link to="about" className="hover:underline">
                    {t("layout.about")}
                  </Link>
                </li>
                <li className="hover:text-primary border-b border-gray-700 py-4">
                  <Link to="movies" className="hover:underline">
                    {t("layout.movies")}
                  </Link>
                </li>
                <li className="hover:text-primary border-b border-gray-700 py-4">
                  <Link to="about" className="hover:underline">
                    {t("layout.jobs")}
                  </Link>
                </li>
              </ul>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  );
};

export default MobileMenu;
