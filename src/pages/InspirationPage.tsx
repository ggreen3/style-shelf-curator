
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { generateInspirationItems } from "@/lib/demo-data";
import { loadFavorites, saveFavorites } from "@/lib/local-storage";
import { ClothingItemProps } from "@/components/clothing/ClothingItem";
import { toast } from "sonner";
import InspirationMarquee from "@/components/inspiration/InspirationMarquee";

const InspirationPage: React.FC = () => {
  const [inspirationItems, setInspirationItems] = useState<ClothingItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadData = () => {
      try {
        setIsLoading(true);
        // Generate or load inspiration items
        const items = generateInspirationItems();
        
        // Load favorites
        const storedFavorites = loadFavorites();
        setFavorites(storedFavorites);
        
        // Apply favorites to items
        const itemsWithFavorites = items.map(item => ({
          ...item,
          isFavorite: storedFavorites.includes(item.id)
        }));
        
        setInspirationItems(itemsWithFavorites);
      } catch (error) {
        console.error("Error loading inspiration items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFavoriteToggle = (id: string, isFavorite: boolean) => {
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = [...favorites, id];
      toast.success("Added to favorites");
    } else {
      newFavorites = favorites.filter(itemId => itemId !== id);
      toast.success("Removed from favorites");
    }
    
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
    
    // Update inspiration items to reflect favorite status
    setInspirationItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, isFavorite } : item
      )
    );
  };

  // Split items into three groups for different marquee rows
  const getItemGroups = () => {
    if (inspirationItems.length === 0) return [[], [], []];
    
    const groupSize = Math.ceil(inspirationItems.length / 3);
    return [
      inspirationItems.slice(0, groupSize),
      inspirationItems.slice(groupSize, groupSize * 2),
      inspirationItems.slice(groupSize * 2)
    ];
  };

  const [group1, group2, group3] = getItemGroups();

  return (
    <Layout>
      <div className="space-y-10 pb-10 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-6">Style Inspiration</h1>
          <p className="text-muted-foreground mb-8">
            Browse trending men's styles and outfit ideas to inspire your next look.
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] bg-muted animate-pulse rounded-md" />
            ))}
          </div>
        ) : (
          <div className="space-y-16">
            <div className="space-y-2">
              <h2 className="text-xl font-medium">Casual Styles</h2>
              <InspirationMarquee 
                items={group1} 
                onFavoriteToggle={handleFavoriteToggle} 
                direction="left"
                speed="medium"
              />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-medium">Formal Looks</h2>
              <InspirationMarquee 
                items={group2} 
                onFavoriteToggle={handleFavoriteToggle} 
                direction="right"
                speed="slow"
              />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-medium">Trending Outfits</h2>
              <InspirationMarquee 
                items={group3} 
                onFavoriteToggle={handleFavoriteToggle} 
                direction="left"
                speed="fast"
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InspirationPage;
