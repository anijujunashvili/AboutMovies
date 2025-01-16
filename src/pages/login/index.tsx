import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { loginType } from "@/types/login";
import { useTranslation } from "react-i18next";
import { APP_PATHS } from "@/routes/enum";
import { Mail, Eye } from "lucide-react";
import { useLogin } from "@/react-query/mutation/auth";
import { SignInSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<loginType>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(SignInSchema),
  });
  const { mutate: handleLogin, isError } = useLogin();
  const [hidden, setHidden] = useState(true);
  const { lang } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (fieldValues: loginType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!!fieldValues.email && !!fieldValues.password) {
      handleLogin(fieldValues, {
        onSuccess: () => {
          navigate("/");
        },
      });
    }
  };

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white font-[sans-serif] md:h-screen">
      <div
        className="grid h-full items-center gap-8 md:grid-cols-2"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1499951360447-b19be8fe80f5)",
          backgroundSize: "cover",
        }}
      >
        <div className="p-4 max-md:order-1"></div>

        <div className="bg-secondary flex h-full items-center p-6 md:p-8 lg:ml-auto lg:w-11/12">
          <form
            className="mx-auto w-full max-w-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-11">
              <h3 className="text-primary text-2xl font-bold">
                {t("login.login")}
              </h3>
            </div>
            <div className="mt-8">
              <label className="mb-2 block text-sm text-white">
                {t("login.email")}
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
                        placeholder={t("login.ent_email")}
                      />
                    );
                  }}
                />
                <Mail className="absolute right-2 h-[18px] w-[18px] text-[#bbb]" />
              </div>
              <div className="text-destructive mt-1 h-[1px] text-sm">
                {errors.email && t("login.email_error")}
              </div>
            </div>
            <div className="mt-8">
              <label className="mb-2 block text-sm text-white">
                {t("login.password")}
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
                        type={hidden ? "password" : "text"}
                        placeholder={t("login.ent_pass")}
                        className="focus:border-b-primary border-muted w-full rounded-none border-b bg-transparent py-3 pl-2 pr-8 text-sm text-white outline-none focus-visible:ring-0"
                      />
                    );
                  }}
                />
                <Eye
                  onClick={() => {
                    setHidden(!hidden);
                  }}
                  className="absolute right-2 h-[18px] w-[18px] cursor-pointer text-[#bbb]"
                />
              </div>
              <div className="text-destructive mt-1 h-[1px] text-sm">
                {errors.password && t("login.pass_error")}

                {isError ? t("login.login_error") : ""}
              </div>
            </div>

            <div className="mt-8 flex items-center"></div>

            <div className="mt-8">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary w-max rounded px-6 py-3 text-sm font-semibold text-gray-800 shadow-xl focus:outline-none"
              >
                {isSubmitting ? t("layout.loading") : t("login.login")}
              </Button>
              <div className="flex flex-row justify-between">
                <p className="mt-8 text-sm text-white">
                  {t("login.havt_account")}
                  <Link
                    to={`/${lang}/${APP_PATHS.REGISTER}`}
                    className="text-primary ml-1 font-semibold hover:underline"
                  >
                    {t("login.register")}
                  </Link>
                </p>
                <p className="mt-8 text-sm text-white">
                  <Link
                    to={`/${lang}/${APP_PATHS.REGISTER}`}
                    className="hover:underline"
                  >
                    {t("login.forgot")}
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
