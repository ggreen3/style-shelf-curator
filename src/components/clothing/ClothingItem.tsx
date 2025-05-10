
import React, { useState } from "react";
import { Heart, Bookmark, Share, Edit, Trash2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export interface ClothingItemProps {
  id: string;
  imageUrl: string;
  category: string;
  description?: string;
  isFavorite?: boolean;
  isBookmarked?: boolean;
  tags?: string[];
  color?: string;
  brand?: string;
  season?: string;
}

interface ClothingItemComponentProps {
  item: ClothingItemProps;
  onEdit?: (item: ClothingItemProps) => void;
  onDelete?: (id: string) => void;
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void;
  onBookmarkToggle?: (id: string, isBookmarked: boolean) => void;
  onClick?: (item: ClothingItemProps) => void;
  isSelectable?: boolean;
  isSelected?: boolean;
}

const ClothingItem: React.FC<ClothingItemComponentProps> = ({
  item,
  onEdit,
  onDelete,
  onFavoriteToggle,
  onBookmarkToggle,
  onClick,
  isSelectable = false,
  isSelected = false,
}) => {
  const {
    id,
    imageUrl,
    category,
    description,
    isFavorite = false,
    isBookmarked = false,
    tags = [],
    color,
    brand,
    season,
  } = item;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(id, !isFavorite);
      toast(isFavorite ? "Removed from favorites" : "Added to favorites");
    }
  };

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBookmarkToggle) {
      onBookmarkToggle(id, !isBookmarked);
      toast(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks");
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(item);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(id);
      toast("Item deleted from wardrobe");
    }
    setShowDeleteDialog(false);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${description || category}-${id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast("Image downloaded");
  };

  const handleItemClick = () => {
    if (onClick) {
      onClick(item);
    }
  };

  return (
    <>
      <Card 
        className={`masonry-item overflow-hidden group ${isSelectable ? 'cursor-pointer' : ''} ${isSelected ? 'ring-2 ring-primary' : ''}`}
        onClick={isSelectable ? handleItemClick : undefined}
      >
        <div className="relative">
          <img 
            src={imageUrl} 
            alt={description || "Clothing item"} 
            className="w-full h-auto object-cover rounded-t-md"
            loading="lazy"
          />
          <div className="hover-overlay rounded-t-md">
            <div className="flex gap-2">
              <Button 
                size="icon" 
                variant="secondary" 
                className={`rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 ${isFavorite ? 'text-red-500' : ''}`}
                onClick={handleFavoriteToggle}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button 
                size="icon" 
                variant="secondary" 
                className={`rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 ${isBookmarked ? 'text-primary' : ''}`}
                onClick={handleBookmarkToggle}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-primary text-primary' : ''}`} />
              </Button>
              <Button 
                size="icon" 
                variant="secondary" 
                className="rounded-full bg-white bg-opacity-90 hover:bg-opacity-100"
                onClick={handleDownload}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {color && (
            <div 
              className="absolute top-2 right-2 w-5 h-5 rounded-full border border-white shadow-sm" 
              style={{ backgroundColor: color }}
              title={`Color: ${color}`}
            />
          )}
        </div>
        <CardContent className="p-3">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-2">{category}</Badge>
              {description && <p className="text-sm text-muted-foreground">{description}</p>}
              {brand && <p className="text-xs text-muted-foreground mt-1">Brand: {brand}</p>}
              {season && <p className="text-xs text-muted-foreground">Season: {season}</p>}
            </div>
            {(onEdit || onDelete) && (
              <div className="flex gap-1 ml-2">
                {onEdit && (
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7" 
                    onClick={handleEdit}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                )}
                {onDelete && (
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="h-7 w-7 text-destructive hover:text-destructive" 
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            )}
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

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
          </DialogHeader>
          <p className="py-4">Are you sure you want to delete this item from your wardrobe?</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ClothingItem;
