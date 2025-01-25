import Modal from "react-modal";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { useDebounce } from "@uidotdev/usehooks";
import { useGetSearchedInfo } from "@/react-query/query/search";
import { Link, useNavigate, useParams } from "react-router-dom";
import { shortenText } from "@/utils";
import dayjs from "dayjs";
import { APP_PATHS } from "@/routes/enum";
import { searchType } from "@/types/search";
import { useTranslation } from "react-i18next";

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "50%",
    minHeight: "400px",
    marginRight: "-50%",
    backfround: "red",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const SearchComp = () => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const { lang } = useParams();
  const { t } = useTranslation();
  const { control, watch, reset } = useForm<searchType>({
    defaultValues: { search: "" },
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    reset();
    setIsOpen(false);
  }

  const toAdvancedSearch = () => {
    closeModal();
    navigate(APP_PATHS.SEARCH + "?from=movies");
  };

  const Key = watch("search").toString();
  const searchKey = useDebounce(Key, 500);
  const searchResult = useGetSearchedInfo(searchKey, lang as string);
  return (
    <>
      <div>
        <Search
          onClick={openModal}
          className="dark:text-secondary mt-2 hidden md:block"
        />
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Search"
          portalClassName="bg-primary"
        >
          <X onClick={closeModal} className="absolute right-4 cursor-pointer" />
          <div className="flex flex-col justify-between">
            <div className="relative flex w-[95%] items-center">
              <Controller
                name="search"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Input
                      onChange={onChange}
                      value={value}
                      placeholder={t("layout.search")}
                      className="focus:border-primary text-smoutline-none w-full rounded-none border-b bg-transparent py-3 pl-8 pr-8 shadow-none focus-visible:ring-0"
                    />
                  );
                }}
              />
              <Search className="absolute left-0 h-[18px] w-[18px] cursor-pointer" />
            </div>

            <div className="mt-6 flex flex-row flex-wrap gap-6">
              {searchResult?.map((res) => {
                return (
                  <div
                    className="flex max-h-[70px] cursor-pointer flex-row gap-2 border-b pb-2 hover:shadow-sm md:w-full lg:w-[45%]"
                    key={res.id}
                  >
                    <img
                      src={
                        import.meta.env.VITE_SUPABASE_STORAGE_URL + res?.image
                      }
                      className="h-full w-auto rounded-md"
                    />
                    <div className="flex flex-col space-y-1">
                      <div className="mt-2 flex text-sm font-semibold hover:underline">
                        <Link to={APP_PATHS.MOVIES + "/" + res.id}>
                          {lang == "ka"
                            ? shortenText(res.name_ka, 50)
                            : shortenText(res.name_en, 50)}
                        </Link>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {dayjs(res.release_date).format("YYYY")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div
              className="absolute bottom-4 cursor-pointer text-gray-500 hover:underline"
              onClick={toAdvancedSearch}
            >
              {t("layout.advanced_search")}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export default SearchComp;
