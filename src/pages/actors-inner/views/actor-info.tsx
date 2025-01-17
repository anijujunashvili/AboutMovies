import { useGetActorInfo } from "@/react-query/query/actors";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const ActorInfo = () => {
  const { id, lang } = useParams();
  const { t } = useTranslation();
  const { data: info } = useGetActorInfo(Number(id));

  const year = dayjs(info?.born).format("YYYY");
  const month = dayjs(info?.born).format("MMM");
  const Birth = dayjs(info?.born).format("DD");
  const dateTrans =
    lang === "en"
      ? dayjs(info?.born).format("DD MMM") + ", " + year
      : Birth + " " + t(`months.${month}`) + ", " + year;

  return (
    <>
      <div className="mb-10 flex flex-col">
        <div className="flex flex-row justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-4xl">
              {lang == "ka" ? info?.name_ka : info?.name_en}
            </div>
          </div>
        </div>
        <div className="my-4 flex flex-row gap-6">
          <div className="flex w-1/3">
            <img
              src={import.meta.env.VITE_SUPABASE_STORAGE_URL + info?.image}
              className="rounded-sm"
            />
          </div>

          <div className="flex w-2/3 cursor-pointer flex-col">
            <div className="flex flex-row gap-2 border-b py-4">
              <div className="font-semibold">Born</div>
              <div className="text-secondary">{dateTrans}</div>
            </div>

            <div className="flex flex-row gap-2 border-b py-4">
              <div className="font-semibold">Birth Place</div>
              <div className="text-secondary">
                {lang == "ka" ? info?.birth_place_ka : info?.birth_place_en}
              </div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4">
              <div className="font-semibold">total nominations</div>
              <div className="text-secondary">{info?.nominations}</div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4">
              <div className="font-semibold">Wins</div>
              <div className="text-secondary">{info?.wins}</div>
            </div>
            <div className="flex flex-row gap-2 border-b py-4">
              <div className="font-semibold">Oscars</div>
              <div className="text-secondary">{info?.oscar}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <h3 className="text-secondary border-primary mb-4 mt-2 border-l-4 pl-3 text-3xl font-bold">
              Mini Bio
            </h3>
          </div>
          <div>{lang === "ka" ? info?.biography_ka : info?.biography_en}</div>
        </div>
      </div>
    </>
  );
};

export default ActorInfo;
