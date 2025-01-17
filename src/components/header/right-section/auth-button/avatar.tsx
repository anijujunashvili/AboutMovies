import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserRoundPen } from "lucide-react";
import { logout } from "@/supabase/auth";
import { useTranslation } from "react-i18next";
import { APP_PATHS } from "@/routes/enum";
import { useNavigate, useParams } from "react-router";
import { meAtom } from "@/store/auth";
import { useAtom } from "jotai";

const AvatarDropdown = () => {
  const [me] = useAtom(meAtom);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams();

  const toUserProfile = () => {
    const profilePath = `/${lang}/${APP_PATHS.PROFILE}`;
    navigate(profilePath);
  };

  const defName = lang === "en" ? me?.name_en[0] : me?.name_ka[0];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:none rounded-full focus:ring-0 focus-visible:border-none">
          <Avatar className="border">
            <AvatarImage
              src={import.meta.env.VITE_SUPABASE_STORAGE_URL + me?.image}
            />

            <AvatarFallback className="text-secondary font-semibold">
              {defName}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuItem>
            <div
              className="flex w-full flex-row justify-between"
              onClick={toUserProfile}
            >
              <span>{t("layout.profile")}</span>
              <UserRoundPen size={16} />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div
              className="text-destructive flex w-full flex-row justify-between"
              onClick={logout}
            >
              <span>{t("layout.logout")}</span>
              <LogOut size={16} />
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AvatarDropdown;
