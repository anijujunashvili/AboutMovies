import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { useDebounce } from "@uidotdev/usehooks";
import { useGetSearchedInfo } from "@/react-query/query/search";
import { useParams } from "react-router-dom";
import { shortenText } from "@/utils";

type searchType = {
  search: string;
};

const SearchComp = () => {
  const { lang } = useParams();
  const { control, watch, reset } = useForm<searchType>({
    defaultValues: { search: "" },
  });

  const Key = watch("search").toString();
  const searchKey = useDebounce(Key, 500);
  const searchResult = useGetSearchedInfo(searchKey, lang as string);

  return (
    <>
      <Dialog
        onOpenChange={() => {
          reset();
        }}
      >
        <DialogTrigger asChild>
          <Search className="mt-2 hidden md:block" />
        </DialogTrigger>
        <DialogContent className="fixed left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2">
          <DialogHeader>
            {/* <DialogTitle>search</DialogTitle> */}
            <DialogDescription>Search</DialogDescription>
            <div className="relative flex items-center">
              <Controller
                name="search"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Input
                      onChange={onChange}
                      value={value}
                      placeholder="Search..."
                      className="focus:border-primary text-smoutline-none w-full rounded-none border-b bg-transparent py-3 pl-8 pr-8 shadow-none focus-visible:ring-0"
                    />
                  );
                }}
              />
              <Search className="absolute left-0 h-[18px] w-[18px] cursor-pointer" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
              {searchResult?.map((res) => {
                return (
                  <div className="group relative" key={res.id}>
                    <img
                      src={
                        import.meta.env.VITE_SUPABASE_STORAGE_URL + res?.image
                      }
                      className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                    />
                    <div className="mt-2 flex text-sm font-semibold">
                      {lang == "ka"
                        ? shortenText(res.name_ka, 20)
                        : shortenText(res.name_en, 20)}
                    </div>
                  </div>
                );
              })}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SearchComp;
