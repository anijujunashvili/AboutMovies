import { useGetNewsInfo } from "@/react-query/query/news";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/ka";

const NewsInfo = () => {
  const { lang, id } = useParams();
  const { data } = useGetNewsInfo(Number(id));
  return (
    <>
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-2">
          <h4 className="text-2xl font-semibold">
            {lang === "ka" ? data?.title_ka : data?.title_en}
          </h4>
          <span className="text-muted-foreground">
            {dayjs(data?.created_at).locale(`${lang}`).format("DD MMM, YYYY")}
          </span>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="h-[300px] w-full">
            <img
              src={import.meta.env.VITE_SUPABASE_STORAGE_URL + data?.image}
              className="h-full shrink-0 rounded-sm object-cover object-top"
            />
          </div>
          <div className="text-md mb-4">
            {lang === "ka" ? data?.description_ka : data?.description_en}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsInfo;
