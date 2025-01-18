import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { registrationType } from "@/types/register";
import { APP_PATHS } from "@/routes/enum";
import { Mail, Eye } from "lucide-react";
import { useRegistration } from "@/react-query/mutation/auth";
import SuccessMsg from "@/components/success-message";
import { SignUpSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";

const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registrationType>({
    defaultValues: { email: "", password: "", confirm_password: "" },
    resolver: zodResolver(SignUpSchema),
  });
  const { mutate: handleRegistration, isSuccess } = useRegistration();

  const { lang } = useParams();
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const onSubmit = async (fieldValues: registrationType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!!fieldValues.email && !!fieldValues.password) {
      handleRegistration(fieldValues);
    }
  };
  const { t } = useTranslation();
  return (
    <div className="bg-background min-h-screen font-[sans-serif] md:h-screen">
      <div
        className="grid h-full min-h-screen grid-cols-1 items-center gap-8 bg-contain bg-repeat-round md:grid-cols-2 md:bg-cover md:bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1499951360447-b19be8fe80f5)",
        }}
      >
        <div className="p-4 max-md:order-1"></div>

        {isSuccess ? (
          <div className="bg-secondary dark:bg-background flex h-full items-center justify-center p-6 md:p-8 lg:ml-auto lg:w-11/12">
            <SuccessMsg
              lgText="registration.success"
              smText="registration.pls_login"
              btnName="registration.login"
              type="register"
            />
          </div>
        ) : (
          <div className="bg-secondary dark:bg-background flex h-full items-center p-6 md:p-8 lg:ml-auto lg:w-11/12">
            <form
              className="mx-auto w-full max-w-lg"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-12">
                <h3 className="text-primary text-2xl font-bold">
                  {t("registration.create")}
                </h3>
              </div>

              <div className="mt-8">
                <label className="mb-2 block text-sm text-white">
                  {t("registration.email")}
                </label>
                <div className="relative flex items-center">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Input
                          onChange={onChange}
                          value={value}
                          className="focus:border-b-primary border-muted w-full rounded-none border-b bg-transparent py-3 pl-2 pr-8 text-sm text-white outline-none focus-visible:ring-0"
                          placeholder={t("registration.ent_email")}
                        />
                      );
                    }}
                  />
                  <Mail className="absolute right-2 h-[18px] w-[18px] text-[#bbb]" />
                </div>
                <div className="text-destructive mt-1 h-[1px] text-sm">
                  {errors.email && t("registration.email_error")}
                </div>
              </div>
              <div className="mt-8">
                <label className="mb-2 block text-sm text-white">
                  {t("registration.password")}
                </label>
                <div className="relative flex items-center">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Input
                          onChange={onChange}
                          value={value}
                          type={passwordType ? "password" : "text"}
                          placeholder={t("registration.ent_pass")}
                          className="focus:border-b-primary border-muted w-full rounded-none border-b bg-transparent py-3 pl-2 pr-8 text-sm text-white outline-none focus-visible:ring-0"
                        />
                      );
                    }}
                  />
                  <Eye
                    onClick={() => {
                      setPasswordType(!passwordType);
                    }}
                    className="absolute right-2 h-[18px] w-[18px] cursor-pointer text-[#bbb]"
                  />
                </div>
                <div className="text-destructive mt-1 h-[1px] text-sm">
                  {errors.password && t("registration.pass_error")}
                </div>
              </div>
              <div className="mt-8">
                <label className="mb-2 block text-sm text-white">
                  {t("registration.conf_pass")}
                </label>
                <div className="relative flex items-center">
                  <Controller
                    name="confirm_password"
                    control={control}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Input
                          onChange={onChange}
                          value={value}
                          placeholder={t("registration.ent_pass")}
                          type={confirmPasswordType ? "password" : "text"}
                          className="focus:border-b-primary border-muted w-full rounded-none border-b bg-transparent py-3 pl-2 pr-8 text-sm text-white outline-none focus-visible:ring-0"
                        />
                      );
                    }}
                  />
                  <Eye
                    onClick={() => setConfirmPasswordType(!confirmPasswordType)}
                    className="absolute right-2 h-[18px] w-[18px] cursor-pointer text-[#bbb]"
                  />
                </div>
                <div className="text-destructive mt-1 h-[1px] text-sm">
                  {errors.confirm_password && t("registration.err_conf_pass")}
                </div>
              </div>

              <div className="mt-8">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary w-max rounded px-6 py-3 text-sm font-semibold text-gray-800 shadow-xl focus:outline-none"
                >
                  {isSubmitting
                    ? t("layout.loading")
                    : t("registration.register")}
                </Button>
                <p className="mt-8 text-sm text-white">
                  {t("registration.have_account")}
                  <Link
                    to={`/${lang}/${APP_PATHS.LOGIN}`}
                    className="text-primary ml-1 font-semibold hover:underline"
                  >
                    {t("registration.login")}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
