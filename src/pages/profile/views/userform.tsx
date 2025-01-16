import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { userInfoType } from "@/types/profile";
import { useEditProfileInfo } from "@/react-query/mutation/profile";
import { useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";

const UserForm = (userInfo: userInfoType) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm<userInfoType>();
  const { mutate: editUser } = useEditProfileInfo();

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    setValue("image", e?.target?.files[0]);
  };

  const onSubmit = (data: userInfoType) => {
    // editUser(
    //   { ...data, id: String(userInfo.id) },
    //   {
    //     onSuccess: () => {
    //       navigate("/en/login");
    //     },
    //   },
    // );
  };

  return (
    <>
      <div className="mb-10">
        <div className="mx-auto flex w-4/5 flex-col py-10">
          <h3 className="text-secondary border-primary border-l-4 pl-3 text-3xl font-bold">
            {t("profile.profile")}
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-10 flex w-full flex-row space-x-8">
              <div className="w-1/3 space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="name_ka">{t("profile.name_ka")}</Label>
                  <Input
                    id="name_ka"
                    {...register("name_ka")}
                    className="border-secondary focus:border-primary rounded-none border-b focus-visible:ring-0"
                    defaultValue={userInfo.name_ka}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="name_en">{t("profile.name_en")}</Label>
                  <Input
                    id="name_en"
                    {...register("name_en")}
                    className="border-secondary focus:border-primary rounded-none border-b focus-visible:ring-0"
                    value={userInfo.name_en}
                  />
                </div>
              </div>
              <div className="w-1/3 space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="email">{t("profile.email")}</Label>
                  <Input
                    id="email"
                    {...register("email", { required: true })}
                    className="border-secondary focus:border-primary rounded-none border-b focus-visible:ring-0"
                    value={userInfo.email}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">{t("profile.phone")}</Label>
                  <Input
                    id="phone"
                    {...register("phone", { required: true })}
                    className="border-secondary focus:border-primary rounded-none border-b focus-visible:ring-0"
                    value={userInfo.phone}
                  />
                </div>
              </div>
              <div className="w-1/3 space-y-6">
                {userInfo.image ? (
                  <div className="space-y-1">
                    <Label htmlFor="name_ka">Avatar</Label>
                    <img src={String(userInfo.image)} />
                  </div>
                ) : (
                  <div className="space-y-1">
                    <Label htmlFor="name_ka">Choose Avatar</Label>
                    <Input
                      id="name_ka"
                      type="file"
                      name="image"
                      className="border-secondary focus:border-primary rounded-none border-b focus-visible:ring-0"
                      onChange={handleImage}
                    />
                  </div>
                )}

                <div className="flex justify-end">
                  <Button className="mt-6">Edit</Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserForm;
