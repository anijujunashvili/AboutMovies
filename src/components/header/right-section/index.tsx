import AuthBtn from "./auth-button";
import SelectLang from "./select-lang";
import ChangeTheme from "./change-theme";
import MobileMenu from "./mobile-menu";
import SearchComp from "./search";

const RightSection = () => {
  return (
    <div className="flex">
      <div className="flex flex-row justify-end space-x-4">
        <SearchComp />
        <AuthBtn />
        <SelectLang />
        <ChangeTheme />
        <MobileMenu />
      </div>
    </div>
  );
};

export default RightSection;
