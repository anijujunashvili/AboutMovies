import { Users, Tv, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import qs from "qs";
import { useEffect } from "react";

type searchType = {
  search: string;
  from: string;
};

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchDefValues = {
    search: "",
    from: "movies",
  };
  const parsedDeafaultParams = {
    ...searchDefValues,
    ...qs.parse(searchParams.toString()),
  };
  const { control, handleSubmit, setValue } = useForm<searchType>({
    defaultValues: parsedDeafaultParams,
  });

  useEffect(() => {
    qs.parse(searchParams.toString());
    const newSeach = searchParams.get("search");
    if (newSeach) {
      setValue("search", newSeach?.toString());
    }
  }, [searchParams, setValue]);

  const onSubmit = () => {
    const params = qs.stringify(control._formValues, { skipNulls: true });
    if (control._formValues.search || control._formValues.from) {
      setSearchParams(params);
    }
  };

  return (
    <div className="hidden md:col-span-3 md:block">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="search-container flex flex-row rounded-sm">
          <Controller
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-auto gap-2 rounded-r-none focus-visible:ring-0">
                  <SelectValue placeholder="Movies" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celebs">
                    <div className="flex flex-row gap-4">
                      <Users className="w-4" />
                      <span>Celebs</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="movies">
                    <div className="flex flex-row gap-4">
                      <Tv className="w-4" />
                      <span>Movies</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
            control={control}
            name="from"
          />

          <Controller
            control={control}
            name="search"
            rules={{ required: false }}
            render={({ field: { onChange, value } }) => (
              <Input
                onChange={onChange}
                value={value}
                className="rounded-none border focus-visible:ring-0"
                placeholder="Type text..."
                autoComplete="off"
              />
            )}
          />
          <Button className="rounded-l-none">
            <Search />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
