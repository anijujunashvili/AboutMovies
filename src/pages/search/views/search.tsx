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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type searchType = {
  search: string;
  from: string;
};

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const [selectValue, SetSelectValue] = useState("movies");
  const searchDefValues = {
    search: "",
    from: selectValue,
  };
  const parsedDeafaultParams = {
    ...searchDefValues,
    ...qs.parse(searchParams.toString()),
  };
  const { control, handleSubmit, setValue } = useForm<searchType>({
    defaultValues: parsedDeafaultParams,
  });

  useEffect(() => {
    searchParams.set("from", selectValue);
    qs.parse(searchParams.toString());
    const newSeach = searchParams.get("search");
    if (newSeach) {
      setValue("search", newSeach?.toString());
    }
    setSearchParams(searchParams.toString());
  }, [searchParams, setValue, selectValue, setSearchParams]);

  const onSubmit = () => {
    const params = qs.stringify(control._formValues, { skipNulls: true });
    if (control._formValues.search || control._formValues.from) {
      setSearchParams(params);
    }
  };

  const handleChange = (value: string) => {
    SetSelectValue(value);
  };

  return (
    <div className="md:col-span-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="search-container flex flex-row rounded-sm">
          <Controller
            render={() => (
              <Select value={selectValue} onValueChange={handleChange}>
                <SelectTrigger className="dark:text-secondary w-auto gap-2 rounded-r-none focus-visible:ring-0">
                  <SelectValue placeholder={selectValue} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celebs">
                    <div className="flex flex-row items-center gap-4">
                      <Users className="w-4" />
                      <span>{t("movies.celebs")}</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="movies">
                    <div className="flex flex-row items-center gap-4">
                      <Tv className="w-4" />
                      <span>{t("movies.movies")}</span>
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
                className="dark:text-secondary rounded-none border focus-visible:ring-0 dark:border-gray-700"
                placeholder={t("movies.search")}
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
