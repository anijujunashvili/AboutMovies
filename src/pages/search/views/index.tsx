import NewsForInnerPages from "@/components/news/vertical.tsx";
import SearchBar from "./search.tsx";
import SearchReasult from "./search-result.tsx";

const SearchComp = () => {
  return (
    <>
      <div className="mt-6 flex h-auto min-h-screen flex-col gap-8 lg:flex-row">
        <div className="min-h-screen w-full lg:w-[70%]">
          <SearchBar />
          <SearchReasult />
        </div>
        <div className="w-full lg:w-[30%]">
          <NewsForInnerPages headline="Top news" />
        </div>
      </div>
    </>
  );
};

export default SearchComp;
