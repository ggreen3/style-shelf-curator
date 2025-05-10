
import React from "react";
import { Heart, Bookmark, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";

export interface ClothingItemProps {
  id: string;
  imageUrl: string;
  category: string;
  description?: string;
  isFavorite?: boolean;
  tags?: string[];
}

const ClothingItem: React.FC<ClothingItemProps> = ({
  imageUrl,
  category,
  description,
  isFavorite = false,
  tags = [],
}) => {
  return (
    <Card className="masonry-item overflow-hidden group">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={description || "Clothing item"} 
          className="w-full h-auto object-cover rounded-t-md"
          loading="lazy"
        />
        <div className="hover-overlay rounded-t-md">
          <div className="flex gap-2">
            <Button size="icon" variant="secondary" className="rounded-full bg-white bg-opacity-90 hover:bg-opacity-100">
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full bg-white bg-opacity-90 hover:bg-opacity-100">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="rounded-full bg-white bg-opacity-90 hover:bg-opacity-100">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="secondary" className="mb-2">{category}</Badge>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClothingItem;
