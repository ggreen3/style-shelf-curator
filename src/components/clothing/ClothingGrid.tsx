
import React from "react";
import ClothingItem, { ClothingItemProps } from "./ClothingItem";

interface ClothingGridProps {
  items: ClothingItemProps[];
}

const ClothingGrid: React.FC<ClothingGridProps> = ({ items }) => {
  return (
    <div className="masonry-grid">
      {items.map((item) => (
        <ClothingItem key={item.id} {...item} />
      ))}
    </div>
  );
};

export default ClothingGrid;
