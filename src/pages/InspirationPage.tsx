
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import ClothingGrid from "@/components/clothing/ClothingGrid";
import { ClothingItemProps } from "@/components/clothing/ClothingItem";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateInspirationItems } from "@/lib/demo-data";

const InspirationPage: React.FC = () => {
  const [items, setItems] = useState<ClothingItemProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadInspirationData = async () => {
      try {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading delay
        const inspirationItems = generateInspirationItems();
        setItems(inspirationItems);
      } catch (error) {
        toast({
          title: "Error loading inspiration",
          description: "Could not load inspiration items",
          variant: "destructive",
        });
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInspirationData();
  }, [toast]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would update the search results
    toast({
      title: "Search",
      description: `Searching for "${searchQuery}"`,
    });
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Inspiration</h1>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Find style inspiration"
              className="pl-9 pr-4"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="aspect-[3/4] bg-muted animate-pulse rounded-md"></div>
            ))}
          </div>
        ) : (
          <ClothingGrid items={items} />
        )}
      </div>
    </Layout>
  );
};

export default InspirationPage;
