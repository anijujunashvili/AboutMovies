import { Link, useParams } from "react-router-dom";
import { Database } from "@/supabase/supabase.types";
import dayjs from "dayjs";
import "dayjs/locale/ka";
import { shortenText } from "@/utils";

const NewsForInnerPages = ({
  headline,
  news,
}: {
  headline: string;
  news: Database["public"]["Tables"]["news"]["Row"][];
}) => {
  const { lang } = useParams();
  return (
    <div className="mb-14 flex">
      <div className="mx-auto w-full flex-col space-y-8 px-4 md:w-5/6">
        <div>
          <h3 className="text-secondary font-primaryRegular border-primary mb-3 border-l-4 pl-3 pt-1 text-3xl font-bold">
            {headline}
          </h3>
        </div>
        <div className="flex flex-col space-y-10">
          {news?.map((n) => (
            <div
              key={n.id}
              className="flex h-[100px] cursor-pointer flex-row gap-2 rounded-md shadow-md"
            >
              <div className="w-1/3">
                <img
                  src={import.meta.env.VITE_SUPABASE_STORAGE_URL + n.image}
                  className="h-full max-h-[100px] w-full rounded-l-md"
                />
              </div>
              <div className="flex w-2/3 flex-col">
                <Link
                  to="news/2"
                  className="dark:text-secondary text-xs font-normal hover:underline"
                >
                  {lang === "ka"
                    ? shortenText(String(n.title_ka), 70)
                    : shortenText(String(n.title_en), 70)}
                </Link>
                <div className="text-muted-foreground pt-1 text-xs">
                  {dayjs(n.created_at).locale(`${lang}`).format("DD MMM")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsForInnerPages;
