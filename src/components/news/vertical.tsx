import { Link, useParams } from "react-router-dom";
import { Database } from "@/supabase/supabase.types";
import dayjs from "dayjs";
import "dayjs/locale/ka";
import { shortenText } from "@/utils";
import { APP_PATHS } from "@/routes/enum";
import { ScrollArea } from "../ui/scroll-area";

const NewsForInnerPages = ({
  headline,
  news,
}: {
  headline: string;
  news: Database["public"]["Tables"]["news"]["Row"][];
}) => {
  const { lang } = useParams();
  const hStyles =
    lang === "ka"
      ? "text-secondary font-primaryRegular border-primary mb-3 border-l-4 pl-3 pt-1 text-3xl font-bold"
      : "text-secondary uppercase border-primary mb-3 border-l-4 pl-3 pt-1 text-3xl font-bold ";
  return (
    <div className="mb-14 flex">
      <div className="mx-auto w-full flex-col space-y-8 px-4 md:w-5/6">
        <div>
          <h3 className={hStyles}>{headline}</h3>
        </div>
        <div className="">
          <ScrollArea className="h-screen w-full">
            {news?.map((n) => (
              <div
                key={n.id}
                className="mb-4 flex h-[90px] cursor-pointer flex-row gap-2 overflow-hidden rounded-md border shadow-md dark:border-gray-800"
              >
                <div className="h-[90px] w-1/3">
                  <img
                    src={import.meta.env.VITE_SUPABASE_STORAGE_URL + n.image}
                    className="h-full max-h-[90px] w-full shrink-0 rounded-l-md object-cover"
                  />
                </div>
                <div className="flex w-2/3 flex-col p-1">
                  <Link
                    to={`/${lang}/${APP_PATHS.NEWS}/${n.id}`}
                    className="dark:text-secondary text-xs font-normal hover:underline"
                  >
                    {lang === "ka"
                      ? shortenText(String(n.title_ka), 60)
                      : shortenText(String(n.title_en), 60)}
                  </Link>
                  <div className="text-muted-foreground pt-1 text-xs">
                    {dayjs(n.created_at).locale(`${lang}`).format("DD MMM")}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default NewsForInnerPages;
