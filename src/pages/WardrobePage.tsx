
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ClothingGrid from "@/components/clothing/ClothingGrid";
import SearchAndFilter from "@/components/filters/SearchAndFilter";
import { ClothingItemProps } from "@/components/clothing/ClothingItem";
import { useToast } from "@/components/ui/use-toast";
import { generateDemoItems } from "@/lib/demo-data";

// Demo categories
const CATEGORIES = [
  "Tops", "Bottoms", "Dresses", "Outerwear", 
  "Footwear", "Accessories"
];

const WardrobePage: React.FC = () => {
  const [items, setItems] = useState<ClothingItemProps[]>([]);
  const [filteredItems, setFilteredItems] = useState<ClothingItemProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, we would fetch from an API
    const loadDemoData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
        const demoItems = generateDemoItems();
        setItems(demoItems);
        setFilteredItems(demoItems);
      } catch (error) {
        toast({
          title: "Error loading wardrobe",
          description: "Could not load your wardrobe items",
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDemoData();
  }, [toast]);

  useEffect(() => {
    let result = items;

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((item) => 
        item.description?.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    setFilteredItems(result);
  }, [items, selectedCategory, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Wardrobe</h1>
        </div>

        <SearchAndFilter
          onSearch={handleSearch}
          onFilterChange={handleCategoryChange}
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
        />

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="aspect-[3/4] bg-muted animate-pulse rounded-md"></div>
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <ClothingGrid items={filteredItems} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium">No items found</h2>
            <p className="text-muted-foreground mt-2">
              Try adjusting your search or filters to find what you're looking for
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WardrobePage;
