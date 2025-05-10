
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { ClothingItemProps } from "@/components/clothing/ClothingItem";
import { generateInspirationItems } from "@/lib/demo-data";
import Marquee from "@/components/ui/marquee";
import { Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface InspirationItemProps {
  id: string;
  imageUrl: string;
  isFavorite?: boolean;
}

const InspirationItem: React.FC<{ item: InspirationItemProps; onFavoriteToggle: (id: string) => void }> = ({ 
  item, 
  onFavoriteToggle 
}) => {
  const { id, imageUrl, isFavorite } = item;
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    onFavoriteToggle(id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: 'Check out this style inspiration',
        text: 'I found this amazing outfit idea on StyleShelf',
        url: window.location.href,
      })
      .then(() => toast.success("Shared successfully"))
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };
  
  return (
    <div className="relative rounded-lg overflow-hidden group mx-2">
      <img 
        src={imageUrl} 
        alt="Style inspiration" 
        className="w-60 h-72 md:w-72 md:h-96 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <Button 
            size="icon" 
            variant="secondary" 
            className="rounded-full bg-white/90"
            onClick={handleFavoriteToggle}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button 
            size="icon" 
            variant="secondary" 
            className="rounded-full bg-white/90"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const InspirationPage: React.FC = () => {
  const [items, setItems] = useState<InspirationItemProps[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Generate inspiration items
    const inspirationItems = generateInspirationItems();
    
    // Try to get favorites from local storage
    let storedFavorites: string[] = [];
    try {
      const favString = localStorage.getItem('inspiration-favorites');
      if (favString) {
        storedFavorites = JSON.parse(favString);
      }
    } catch (error) {
      console.error('Error loading inspiration favorites:', error);
    }
    
    setFavorites(storedFavorites);
    
    // Apply favorites to items
    const itemsWithFavorites = inspirationItems.map(item => ({
      ...item,
      isFavorite: storedFavorites.includes(item.id)
    }));
    
    setItems(itemsWithFavorites);
  }, []);
  
  // Save favorites to local storage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('inspiration-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving inspiration favorites:', error);
    }
  }, [favorites]);
  
  const handleFavoriteToggle = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(fav => fav !== id);
      } else {
        return [...prev, id];
      }
    });
    
    setItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, isFavorite: !item.isFavorite } 
          : item
      )
    );
  };
  
  // Group items into several rows for marquees
  const row1 = items.slice(0, Math.ceil(items.length / 3));
  const row2 = items.slice(Math.ceil(items.length / 3), Math.ceil(items.length / 3) * 2);
  const row3 = items.slice(Math.ceil(items.length / 3) * 2);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Style Inspiration</h1>
          <p className="text-muted-foreground">
            Browse through trending looks and get inspired for your next outfit
          </p>
        </div>

        <div className="space-y-16 py-4">
          <Marquee direction="left" speed="slow">
            {row1.map(item => (
              <InspirationItem 
                key={item.id} 
                item={item} 
                onFavoriteToggle={handleFavoriteToggle} 
              />
            ))}
          </Marquee>
          
          <Marquee direction="right" speed="normal">
            {row2.map(item => (
              <InspirationItem 
                key={item.id} 
                item={item} 
                onFavoriteToggle={handleFavoriteToggle} 
              />
            ))}
          </Marquee>
          
          <Marquee direction="left" speed="fast">
            {row3.map(item => (
              <InspirationItem 
                key={item.id} 
                item={item} 
                onFavoriteToggle={handleFavoriteToggle} 
              />
            ))}
          </Marquee>
        </div>
      </div>
    </Layout>
  );
};

export default InspirationPage;
