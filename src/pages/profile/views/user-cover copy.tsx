import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Trash } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDeleteUserPhoto } from "@/react-query/mutation/profile";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { meAtom } from "@/store/auth";
import { userInfoType } from "@/types/profile";
import { useEffect } from "react";

const UserCover = () => {
  const [me, setMe] = useAtom(meAtom);
  useEffect(() => {
    console.log("sheicvala me", me);
  }, [me]);
  const { lang } = useParams();
  const { t } = useTranslation();
  const year = dayjs(me?.created_at).format("YYYY");
  const month = dayjs(me?.created_at).format("MMM");
  const dateTrans =
    lang === "en" ? month + " " + year : year + " " + t(`months.${month}`);
  const coverName = lang == "en" ? me?.name_en : me?.name_ka;

  const { mutate: deletePhoto } = useDeleteUserPhoto();
  const uId = me?.id as string;
  const uImage = String(me?.image);

  const newArray = { ...me, image: null } as userInfoType;
  const handleAvatarDelete = () => {
    const fnParams = { userId: uId, image: uImage };
    deletePhoto(fnParams, {
      onSuccess: () => {
        setMe(newArray);
      },
    });
  };

  return (
    <>
      <div className="bg-secondary flex h-[250px] shadow-sm">
        <div className="mx-auto flex w-4/5 flex-row items-center space-x-8 py-12">
          <div className="relative">
            <Avatar className="h-[150px] w-[150px] cursor-pointer">
              <AvatarImage
                src={import.meta.env.VITE_SUPABASE_STORAGE_URL + uImage}
              />

              <AvatarFallback className="text-secondary text-4xl font-bold">
                {coverName ? coverName[0] : ""}
              </AvatarFallback>
            </Avatar>
            {me?.image && (
              <>
                <div className="bg-muted/50 absolute inset-0 flex items-center justify-center rounded-full opacity-0 transition-opacity duration-200 hover:opacity-100">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={handleAvatarDelete}
                  >
                    <Trash className="text-muted-foreground h-6 w-6" />
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className="space-y-4">
            <span className="text-5xl font-bold text-white">{coverName}</span>
            <div className="text-muted flex flex-row gap-3">
              <CalendarDays size={20} />
              <span>
                {t("layout.joined")} {dateTrans}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCover;
