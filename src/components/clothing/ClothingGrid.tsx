
import React from "react";
import ClothingItem, { ClothingItemProps } from "./ClothingItem";
import { useIsMobile } from "@/hooks/use-mobile";

interface ClothingGridProps {
  items: ClothingItemProps[];
  onEdit?: (item: ClothingItemProps) => void;
  onDelete?: (id: string) => void;
  onFavoriteToggle?: (id: string, isFavorite: boolean) => void;
  onBookmarkToggle?: (id: string, isBookmarked: boolean) => void;
  onItemClick?: (item: ClothingItemProps) => void;
  selectable?: boolean;
  selectedItems?: string[];
  gridClassName?: string;
}

const ClothingGrid: React.FC<ClothingGridProps> = ({
  items,
  onEdit,
  onDelete,
  onFavoriteToggle,
  onBookmarkToggle,
  onItemClick,
  selectable = false,
  selectedItems = [],
  gridClassName = "masonry-grid",
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={gridClassName}>
      {items.map((item) => (
        <ClothingItem 
          key={item.id} 
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onFavoriteToggle={onFavoriteToggle}
          onBookmarkToggle={onBookmarkToggle}
          onClick={selectable ? onItemClick : undefined}
          isSelectable={selectable}
          isSelected={selectedItems.includes(item.id)}
        />
      ))}
    </div>
  );
};

export default ClothingGrid;
