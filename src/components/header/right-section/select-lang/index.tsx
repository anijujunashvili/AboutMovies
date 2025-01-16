import { Button } from "@/components/ui/button";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";

const SelectLang = () => {
  const path = useLocation();
  const navigate = useNavigate();
  const { lang } = useParams();

  const changeLang = (lng: string) => {
    i18n.changeLanguage(lng);
    const newPath = path.pathname.replace(`/${lang}/`, `/${lng}/`);
    navigate(newPath);
  };

  useEffect(() => {
    //changeLang(String(lang)); es davakomentare searchis redirectis gamo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const { t } = useTranslation();

  return (
    <span className="hidden md:block">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="link"
            className="text-primary-foreground dark:text-muted-foreground underline-none hover:underline-none"
            size="default"
          >
            {t(`layout.${lang}`)}
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => changeLang("en")}>
            {t(`layout.en`)}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLang("ka")}>
            {t(`layout.ka`)}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </span>
  );
};

export default SelectLang;
