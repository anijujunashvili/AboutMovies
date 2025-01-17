import { useGetAdvancedSearchInfo } from "@/react-query/query/search";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import SearchLoader from "@/components/search-loader";
import qs from "qs";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { APP_PATHS } from "@/routes/enum";
import { shortenText } from "@/utils";
import { Star } from "lucide-react";

const SearchReasult = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const { lang } = useParams();
  qs.parse(searchParams.toString());
  const itemsCountOnPage = 8;
  const from = (currentPage - 1) * itemsCountOnPage;
  const to = currentPage * itemsCountOnPage - 1;
  const search = searchParams.get("search") ? searchParams.get("search") : "";
  const where = searchParams.get("from")?.toString();
  const payload = {
    search: search?.toString(),
    lang: lang,
    from: from,
    to: to,
    where: where,
  };

  const { data, isPending } = useGetAdvancedSearchInfo(payload);

  const maxPage = data ? data[0]?.count / itemsCountOnPage : 1;
  const pagination = [];

  for (let i = 0; i < 15; i++) {
    pagination.push(i + 1);
  }

  console.log(data);

  return (
    <div className="mb-8 mt-8 flex flex-col space-y-10">
      <div className="grid h-auto grid-cols-3 gap-8">
        {isPending ? (
          <SearchLoader />
        ) : (
          data?.map((d) => (
            <div
              key={d.id}
              className="shadow-sx max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
            >
              <Link to={`${APP_PATHS.MOVIES}/${d.id}`}>
                <img
                  className="mx-auto h-[300px] w-full rounded-t-lg"
                  src={import.meta.env.VITE_SUPABASE_STORAGE_URL + d.image}
                  alt=""
                />
              </Link>
              <div className="p-5">
                <Link to="#">
                  <h5 className="text-md mb-2 font-semibold tracking-tight text-gray-900 hover:underline dark:text-white">
                    {lang == "ka"
                      ? shortenText(d.name_ka, 30)
                      : shortenText(d.name_en, 30)}
                  </h5>
                </Link>
                {where === "movies" && (
                  <div className="flex flex-row gap-1">
                    <Star size={20} className="text-primary" fill="#ffc300" />
                    <span>8.2</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {pagination && !isPending && (
        <div className="flex py-10">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1);
                      const newPage = currentPage - 1;
                      searchParams.set("p", newPage.toString());
                    }
                  }}
                  className="cursor-pointer"
                />
              </PaginationItem>
              {pagination.map((pag) => {
                const active = currentPage === pag ? true : false;
                return (
                  <PaginationItem key={pag}>
                    <PaginationLink
                      isActive={active}
                      onClick={() => {
                        setCurrentPage(pag);
                      }}
                      className="cursor-pointer"
                    >
                      {pag}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (currentPage < maxPage) {
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                  className="cursor-pointer"
                  aria-disabled="true"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default SearchReasult;
