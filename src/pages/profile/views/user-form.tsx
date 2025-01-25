import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { userInfoType } from "@/types/profile";
import { useEditProfileInfo } from "@/react-query/mutation/profile";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormSchema } from "../schema";
import { QUERY_KEYS } from "@/react-query/query/enum";
import { useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { meAtom } from "@/store/auth";
import { useParams } from "react-router-dom";

const UserForm = () => {
  const [me] = useAtom(meAtom);
  const { lang } = useParams();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<userInfoType>({
    resolver: zodResolver(UserFormSchema),
  });
  const { mutate: editUser, isPending } = useEditProfileInfo();

  useEffect(() => {
    setValue("phone", me?.phone as string);
    setValue("email", me?.email as string);
    setValue("name_ka", me?.name_ka as string);
    setValue("name_en", me?.name_en as string);
  }, [me, setValue]);

  const userId = me?.id;

  const onSubmit = (data: userInfoType) => {
    const obj = { ...data, id: String(userId) };

    editUser(obj, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_USER] });
      },
    });
  };
  const hStyles =
    lang === "ka"
      ? "text-secondary font-primaryRegular border-primary border-l-4 pl-3 text-3xl font-bold"
      : "text-secondary uppercase border-primary border-l-4 pl-3 text-3xl font-bold";
  return (
    <>
      <div className="mb-10">
        <div className="mx-auto flex flex-col p-4 py-10 lg:w-5/6">
          <h3 className={hStyles}>{t("profile.profile")}</h3>
          {isPending ? t("layout.loading") : ""}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-10 flex w-full flex-col space-y-2 md:flex-row md:flex-wrap md:gap-4 md:space-y-0 lg:flex-nowrap lg:space-x-8">
              <div className="w-full space-y-8 md:w-[45%] lg:w-1/3">
                <div className="dark:text-secondary space-y-2 md:space-y-1">
                  <Label htmlFor="name_ka" className="font-semibold">
                    {t("profile.name_ka")}
                  </Label>
                  <Input
                    id="name_ka"
                    {...register("name_ka")}
                    className="border-secondary focus:border-primary rounded-none border-b focus-visible:ring-0"
                  />
                  <span className="text-destructive text-sm">
                    {errors.name_ka && errors.name_ka.message}
                  </span>
                </div>
                <div className="dark:text-secondary space-y-2 md:space-y-1">
                  <Label htmlFor="name_en" className="font-semibold">
                    {t("profile.name_en")}
                  </Label>
                  <Input
                    id="name_en"
                    {...register("name_en")}
                    className="border-secondary focus:border-primary rounded-none border-b focus-visible:ring-0"
                  />
                  <span className="text-destructive text-sm">
                    {errors.name_en && errors.name_en.message}
                  </span>
                </div>
              </div>
              <div className="w-full space-y-8 md:w-[45%] lg:w-1/3">
                <div className="dark:text-secondary space-y-2 md:space-y-1">
                  <Label htmlFor="email" className="font-semibold">
                    {t("profile.email")}
                  </Label>
                  <Input
                    id="email"
                    {...register("email")}
                    className="border-secondary focus:border-primary rounded-none border-b focus-visible:ring-0"
                  />
                  <span className="text-destructive text-sm">
                    {errors.email && errors.email.message}
                  </span>
                </div>
                <div className="dark:text-secondary space-y-2 md:space-y-1">
                  <Label htmlFor="phone" className="font-semibold">
                    {t("profile.phone")}
                  </Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    className="border-secondary focus:border-primary rounded-none border-b focus-visible:ring-0"
                  />
                  <span className="text-destructive text-sm">
                    {errors.phone && errors.phone.message}
                  </span>
                </div>
              </div>
              <div className="w-full space-y-6 lg:w-1/3">
                <div className="flex lg:justify-end">
                  <Button className="mt-8 w-full md:mt-6 md:w-[92%] lg:w-full dark:text-white">
                    Edit
                  </Button>
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
