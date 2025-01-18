import Logo from "../logo";
import RightSection from "./right-section";
import NavBar from "./navbar";
import { useParams } from "react-router";

const Header = () => {
  const { lang } = useParams();
  const headerStyle =
    lang === "ka"
      ? "border-primary pt-1 ka flex h-[80px] items-center border-b-2 shadow-sm md:h-[60px]"
      : "border-primary pt-1 en flex h-[80px] items-center border-b-2 shadow-sm md:h-[60px]";
  return (
    <div className={headerStyle}>
      <div className="mx-auto w-full px-4 lg:w-5/6">
        <div className="flex flex-row justify-between gap-4">
          <Logo />
          <NavBar />
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default Header;
