
import React from "react";
import { ClothingItemProps } from "@/components/clothing/ClothingItem";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface InspirationMarqueeProps {
  items: ClothingItemProps[];
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void;
  speed?: 'slow' | 'medium' | 'fast';
  direction?: 'left' | 'right';
}

const InspirationMarquee: React.FC<InspirationMarqueeProps> = ({ 
  items, 
  onFavoriteToggle,
  speed = 'medium',
  direction = 'left'
}) => {
  // Define animation speed based on prop
  const getAnimationDuration = () => {
    switch (speed) {
      case 'slow': return '60s';
      case 'fast': return '20s';
      default: return '40s';
    }
  };

  // Create two groups of items for seamless looping
  const allItems = [...items, ...items];

  const handleFavoriteToggle = (e: React.MouseEvent, id: string, isFavorite: boolean) => {
    e.preventDefault();
    if (onFavoriteToggle) {
      onFavoriteToggle(id, !isFavorite);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div 
        className="flex"
        style={{ 
          animationName: 'marquee',
          animationDuration: getAnimationDuration(),
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: direction === 'left' ? 'normal' : 'reverse'
        }}
      >
        {allItems.map((item, index) => (
          <Card 
            key={`${item.id}-${index}`}
            className="flex-shrink-0 w-[300px] mx-2 overflow-hidden"
          >
            <div className="relative h-[400px]">
              <img 
                src={item.imageUrl} 
                alt="Inspiration" 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                <Badge variant="outline" className="bg-black/50 text-white mb-2 w-fit">
                  {item.tags?.[0] || 'Style Inspiration'}
                </Badge>
                {onFavoriteToggle && (
                  <Button
                    onClick={(e) => handleFavoriteToggle(e, item.id, !!item.isFavorite)}
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2 rounded-full bg-black/50"
                  >
                    <Heart className={`h-4 w-4 ${item.isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Add CSS for animation */}
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default InspirationMarquee;
