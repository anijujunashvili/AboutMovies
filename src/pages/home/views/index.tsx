import Banner from "./banner";
import BornToday from "./born-today";
import MoviesList from "@/components/movies-list";
import MovieNews from "@/components/news";
import { useGetNews } from "@/react-query/query/news";
import { Database } from "@/supabase/supabase.types";
import { useTranslation } from "react-i18next";

type News = Database["public"]["Tables"]["news"]["Row"][];

const HomePage = () => {
  const { data } = useGetNews();
  const { t } = useTranslation();

  return (
    <>
      <Banner />
      <MoviesList headline={t("layout.top_news")} />
      <BornToday />
      <MovieNews
        headline={t("layout.top_news")}
        orientation="horizontal"
        news={data as News}
      />
    </>
  );
};

export default HomePage;
