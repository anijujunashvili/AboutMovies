import NewsForInnerPages from "@/components/news/vertical";
import { useGetNews } from "@/react-query/query/news";
import { Database } from "@/supabase/supabase.types";
import { useTranslation } from "react-i18next";
import NewsInfo from "./news-info";

type News = Database["public"]["Tables"]["news"]["Row"][];

const NewsInner = () => {
  const { data } = useGetNews();
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-6 flex h-auto min-h-screen flex-col gap-8 lg:flex-row">
        <div className="min-h-screen w-full lg:w-[70%]">
          <NewsInfo />
        </div>
        <div className="w-full lg:w-[30%]">
          <NewsForInnerPages
            headline={t("layout.top_news")}
            news={data as News}
          />
        </div>
      </div>
    </>
  );
};

export default NewsInner;
