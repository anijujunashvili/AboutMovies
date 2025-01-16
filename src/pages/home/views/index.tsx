import CarouselView from "./carousel-view";
import BornToday from "./born-today";
import MoviesList from "@/components/movies-list";
import MovieNews from "@/components/news";

const HomePage = () => {
  return (
    <>
      <CarouselView />
      <MoviesList headline="Top Movies" />
      <BornToday />
      <MovieNews headline="Top News" orientation="horizontal" />
    </>
  );
};

export default HomePage;
