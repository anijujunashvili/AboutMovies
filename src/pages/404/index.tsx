import { Button } from "@/components/ui/button";
import { APP_PATHS } from "@/routes/enum";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFount = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="text-primary dark:text-primary-500 mb-4 text-7xl font-extrabold tracking-tight lg:text-9xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            {t("layout.missing")}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {t("layout.sorry")}
          </p>
          <Link to={"/" + APP_PATHS.HOME}>
            <Button className="focus:ring-primary-300 dark:focus:ring-primary-900 my-4 inline-flex rounded-lg bg-[#ffc300] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#ffc300]/80 focus:outline-none focus:ring-4">
              {t("layout.home")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFount;
