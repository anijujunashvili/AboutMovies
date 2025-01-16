import { Users, Tv, Search, FileSearch, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchComp = () => {
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    if (value === "advanced") navigate("/en/search");
  };
  return (
    <div className="hidden md:block md:col-span-3">
      <div className="search-container flex flex-row rounded-sm ">
        <Select onValueChange={handleSearch}>
          <SelectTrigger className="w-auto rounded-r-none focus-visible:ring-0 gap-2">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex flex-row gap-4">
                <Search className="w-4" />
                <span>All</span>
              </div>
            </SelectItem>
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
            <SelectItem value="advanced" className="border-t rounded-none">
              <div className="flex flex-row gap-4">
                <FileSearch className="w-4" />
                <span>Advanced Search</span>
                <ChevronRight className="w-4 text-right" />
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          autoComplete="off"
          name="search"
          className="rounded-none focus-visible:ring-0 focus-visible:bg-none focus:bg-none"
        />
        <Button className="rounded-l-none">
          <Search />
        </Button>
      </div>
    </div>
  );
};

export default SearchComp;
