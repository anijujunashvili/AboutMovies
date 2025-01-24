import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, Trash, Upload } from "lucide-react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDeleteUserPhoto } from "@/react-query/mutation/profile";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/ka";
import { useAtom } from "jotai";
import { meAtom } from "@/store/auth";
import { useUploadUserPhoto } from "@/react-query/mutation/profile";
import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
// import { useGetUserInfo } from "@/react-query/query/profile";

const UserCover = () => {
  const [me] = useAtom(meAtom);
  // const [user] = useAtom(userAtom);
  // const getInfo = useGetUserInfo(user?.user?.id as string);

  const { lang } = useParams();
  const { t } = useTranslation();

  const coverName = lang == "en" ? me?.name_en : me?.name_ka;

  //new uploader
  const uImage = String(me?.image);

  const defImage =
    me?.image === "" || typeof me?.image === "undefined" ? false : true;
  const [images, setImages] = useState<ImageListType>([]);
  const [hasDef, setHasDef] = useState<boolean>(defImage);

  const maxNumber = 1;

  const { mutate: UploadImg } = useUploadUserPhoto();

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
  ) => {
    // data for submit
    console.log(imageList[0].file, addUpdateIndex);
    setImages(imageList);

    if (me?.id && imageList[0].file) {
      const payload = { user_id: me?.id, image: imageList[0].file };
      UploadImg(payload, {
        onSuccess: () => {
          console.log("aitvirta");
        },
      });
    }
  };
  //new uploader

  const { mutate: deletePhoto } = useDeleteUserPhoto();
  const uId = me?.id as string;

  //const newArray = { ...me, image: null } as userInfoType;
  const handleAvatarDelete = () => {
    const fnParams = { userId: uId, image: uImage };
    deletePhoto(fnParams, {
      onSuccess: () => {
        setHasDef(false);
        console.log("waishala");
      },
    });
  };

  return (
    <>
      <div className="bg-secondary flex h-[250px] shadow-sm">
        <div className="mx-auto flex w-4/5 flex-row items-center space-x-8 py-12">
          {hasDef ? (
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
                  <div className="bg-muted/50 absolute inset-0 flex h-[150px] w-[150px] items-center justify-center rounded-full border opacity-0 transition-opacity duration-200 hover:opacity-100">
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
          ) : (
            <div className="bg-muted/50 flex h-[150px] w-[150px] items-center justify-center rounded-full border">
              <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({ imageList, onImageUpload, dragProps }) => (
                  // write your building UI
                  <div className="upload__image-wrapper relative">
                    {imageList.map((image, index) => (
                      <div key={index} className="image-item">
                        <img
                          src={image["data_url"]}
                          alt=""
                          className="h-[150px] w-[150px] rounded-full"
                        />
                      </div>
                    ))}
                    {!imageList[0] && (
                      <div className="bg-muted opacity-1 rounded-full transition-opacity duration-200 hover:opacity-100">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          <Upload className="text-muted-foreground h-6 w-6" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </ImageUploading>
            </div>
          )}

          <div className="space-y-4">
            <span className="text-5xl font-bold text-white">{coverName}</span>
            <div className="text-muted flex flex-row gap-3">
              <CalendarDays size={20} />
              <span>
                {t("layout.joined")}{" "}
                {dayjs(me?.created_at).locale(`${lang}`).format("MMM, YYYY")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCover;
