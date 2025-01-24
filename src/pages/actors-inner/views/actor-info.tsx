import { useGetActorInfo } from "@/react-query/query/actors";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ka";
import { useTranslation } from "react-i18next";

const ActorInfo = () => {
  const { id, lang } = useParams();
  const { t } = useTranslation();
  const { data: info } = useGetActorInfo(Number(id));
  const hStyles =
    lang === "ka"
      ? "dark:text-secondary font-primaryRegular pb-3 text-4xl font-bold"
      : "dark:text-secondary uppercase pb-3 text-4xl font-bold";
  const bioStyles =
    lang === "ka"
      ? "text-secondary font-primaryRegular border-primary mb-4 mt-2 border-l-4 pl-3 pt-1 text-3xl font-bold"
      : "text-secondary uppercase border-primary mb-4 mt-2 border-l-4 pl-3 pt-1 text-3xl font-bold";
  return (
    <>
      <div className="mb-10 mt-2 flex flex-col">
        <div className="flex flex-row justify-between gap-2">
          <div className="flex flex-col gap-1">
            <div className={hStyles}>
              {lang == "ka" ? info?.name_ka : info?.name_en}
            </div>
          </div>
        </div>
        <div className="my-4 flex flex-col gap-6 md:flex-row">
          <div className="flex md:w-1/3">
            <img
              src={import.meta.env.VITE_SUPABASE_STORAGE_URL + info?.image}
              className="rounded-sm border"
            />
          </div>

          <div className="flex cursor-pointer flex-col md:w-2/3">
            <div className="flex flex-row gap-2 border-b py-4 dark:border-gray-700">
              <div className="dark:text-secondary">{t("actor.born")}</div>
              <div className="dark:text-secondary font-bold">
                {dayjs(info?.born).locale(`${lang}`).format("DD MMM, YYYY")}
              </div>
            </div>

            <div className="flex flex-row gap-2 border-b py-4 dark:border-gray-700">
              <div className="dark:text-secondary">{t("actor.place")}</div>
              <div className="dark:text-secondary font-bold">
                {lang == "ka" ? info?.birth_place_ka : info?.birth_place_en}
              </div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4 dark:border-gray-700">
              <div className="dark:text-secondary">
                {t("actor.nominations")}
              </div>
              <div className="dark:text-secondary font-bold">
                {info?.nominations}
              </div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4 dark:border-gray-700">
              <div className="dark:text-secondary">{t("actor.wins")}</div>
              <div className="dark:text-secondary font-bold">{info?.wins}</div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4 dark:border-gray-700">
              <div className="dark:text-secondary">{t("actor.oscars")}</div>
              <div className="dark:text-secondary font-bold">{info?.oscar}</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <div>
            <h3 className={bioStyles}>{t("actor.bio")}</h3>
          </div>
          <div className="dark:text-secondary">
            {lang === "ka" ? info?.biography_ka : info?.biography_en}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActorInfo;
