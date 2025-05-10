
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { OutfitItem } from "@/lib/local-storage";

interface OutfitCardProps {
  outfit: OutfitItem;
  onEdit?: (outfit: OutfitItem) => void;
  onDelete?: (id: string) => void;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ outfit, onEdit, onDelete }) => {
  const { id, name, description, items } = outfit;

  // Show up to 4 items in the preview
  const previewItems = items.slice(0, 4);
  const remainingCount = Math.max(0, items.length - 4);

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="grid grid-cols-2 gap-0.5">
          {previewItems.map((item) => (
            <div key={item.id} className="aspect-square">
              <img
                src={item.imageUrl}
                alt={item.description || "Clothing item"}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {remainingCount > 0 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white rounded-full px-2 py-0.5 text-xs">
            +{remainingCount} more
          </div>
        )}
      </div>
      
      <CardContent className="pt-3">
        <h3 className="font-medium text-lg">{name}</h3>
        {description && (
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {description}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-2">
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0 pb-3">
        <div className="flex gap-2 w-full">
          {onEdit && (
            <Button 
              onClick={() => onEdit(outfit)} 
              className="flex-1"
              variant="outline"
              size="sm"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
          
          {onDelete && (
            <Button 
              onClick={() => onDelete(id)}
              className="flex-1"
              variant="outline"
              size="sm"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default OutfitCard;
