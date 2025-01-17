import NewsForInnerPages from "@/components/news/vertical.tsx";
import SearchBar from "./search.tsx";
import SearchReasult from "./search-result.tsx";
import { useTranslation } from "react-i18next";
import { useGetNews } from "@/react-query/query/news/index.ts";
import { Database } from "@/supabase/supabase.types.ts";

type News = Database["public"]["Tables"]["news"]["Row"][];
const SearchComp = () => {
  const { t } = useTranslation();
  const { data } = useGetNews();
  return (
    <>
      <div className="mt-6 flex h-auto min-h-screen flex-col gap-8 lg:flex-row">
        <div className="min-h-screen w-full lg:w-[70%]">
          <SearchBar />
          <SearchReasult />
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

export default SearchComp;
