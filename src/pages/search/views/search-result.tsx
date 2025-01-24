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
import { useTranslation } from "react-i18next";
import UserRating from "@/components/movies-list/user-rating";
import { useGetUserRatedMovies } from "@/react-query/query/movies";
import { meAtom } from "@/store/auth";
import { useAtom } from "jotai";

const SearchReasult = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [me] = useAtom(meAtom);
  const { lang } = useParams();
  const { t } = useTranslation();
  qs.parse(searchParams.toString());
  const itemsCountOnPage = 9;
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
  const navigateLink =
    where === "movies"
      ? `/${lang}/${APP_PATHS.MOVIES}/`
      : `/${lang}/${APP_PATHS.ACTORS}/`;

  const { data, isPending } = useGetAdvancedSearchInfo(payload);

  const maxCount = data ? data[0]?.count : 0;
  const maxPage = Math.ceil(maxCount / itemsCountOnPage);

  const pagination = [];

  for (let i = 0; i < maxPage; i++) {
    pagination.push(i + 1);
  }
  const { data: userR } = useGetUserRatedMovies(String(me?.id));

  const getYourRating = (m_id: number) => {
    const rating = userR?.find((item) => item.m_id === m_id);
    return rating?.rating;
  };
  return (
    <div className="mb-8 mt-8 flex flex-col space-y-10">
      {isPending ? (
        <SearchLoader />
      ) : (
        <div className="grid h-auto grid-cols-2 gap-8 lg:grid-cols-3">
          {data?.map((d) => (
            <div
              key={d.id}
              className="shadow-sx max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
            >
              <Link to={`${navigateLink}${d.id}`}>
                <div className="h-[350px]">
                  <img
                    className="mx-auto h-full w-full shrink-0 rounded-t-lg object-cover"
                    src={import.meta.env.VITE_SUPABASE_STORAGE_URL + d.image}
                  />
                </div>
              </Link>
              <div className="p-5">
                <Link to={`${navigateLink}${d.id}`}>
                  <h5 className="text-md mb-2 font-semibold tracking-tight text-gray-900 hover:underline dark:text-white">
                    {lang == "ka"
                      ? shortenText(d.name_ka, 30)
                      : shortenText(d.name_en, 30)}
                  </h5>
                </Link>
                {where === "movies" && (
                  <div className="flex flex-row space-x-4">
                    <div className="flex flex-row gap-1">
                      <Star size={20} className="text-primary" fill="#ffc300" />
                      <span className="dark:text-secondary">
                        {d.rating_count > 0
                          ? (d.rating_sum / d.rating_count).toFixed(1)
                          : 0}
                      </span>
                    </div>
                    <UserRating
                      rating={Number(getYourRating(d?.id))}
                      mid={d?.id}
                      nameKa={d?.name_ka}
                      nameEn={d?.name_en}
                      rSum={d?.rating_sum}
                      rCount={d?.rating_count}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {maxCount == null && (
        <div className="dark:text-secondary text-center text-gray-800">
          {t("layout.not_found")}
        </div>
      )}
      {pagination && !isPending && maxCount > 0 && (
        <div className="flex py-10">
          <Pagination className="dark:text-secondary">
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
                  title={t("layout.prev")}
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
                  title={t("layout.next")}
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
