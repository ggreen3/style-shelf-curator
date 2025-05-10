
import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import CategoryFilter from "./CategoryFilter";

interface SearchAndFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (category: string | null) => void;
  categories: string[];
  selectedCategory: string | null;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  onSearch,
  onFilterChange,
  categories,
  selectedCategory,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tempCategory, setTempCategory] = useState<string | null>(selectedCategory);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const applyFilters = () => {
    onFilterChange(tempCategory);
  };

  const resetFilters = () => {
    setTempCategory(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your wardrobe"
            className="pl-9 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter</SheetTitle>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Categories</h3>
                <CategoryFilter 
                  categories={categories}
                  selectedCategory={tempCategory}
                  onChange={setTempCategory}
                />
              </div>
            </div>
            <SheetFooter>
              <div className="flex gap-2 w-full">
                <Button variant="outline" onClick={resetFilters} className="flex-1">
                  Reset
                </Button>
                <Button onClick={applyFilters} className="flex-1">
                  Apply Filters
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:hidden">
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={onFilterChange}
        />
      </div>
    </div>
  );
};

export default SearchAndFilter;
