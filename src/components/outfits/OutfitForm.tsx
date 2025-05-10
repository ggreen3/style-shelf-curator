import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ClothingGrid from "@/components/clothing/ClothingGrid";
import { ClothingItemProps } from "@/components/clothing/ClothingItem";
import { OutfitItem } from "@/lib/local-storage";
import { v4 as uuidv4 } from 'uuid';
import { X } from "lucide-react";

interface OutfitFormProps {
  wardrobe: ClothingItemProps[];
  outfit?: OutfitItem;
  onSave: (outfit: OutfitItem) => void;
  onCancel: () => void;
}

const OutfitForm: React.FC<OutfitFormProps> = ({
  wardrobe,
  outfit,
  onSave,
  onCancel
}) => {
  const [name, setName] = useState(outfit?.name || "");
  const [description, setDescription] = useState(outfit?.description || "");
  const [selectedItems, setSelectedItems] = useState<ClothingItemProps[]>(outfit?.items || []);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const handleItemClick = (item: ClothingItemProps) => {
    setSelectedItems(prev => {
      const exists = prev.some(i => i.id === item.id);
      if (exists) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const removeSelectedItem = (itemId: string) => {
    setSelectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const filteredWardrobe = categoryFilter
    ? wardrobe.filter(item => item.category === categoryFilter)
    : wardrobe;

  const handleSave = () => {
    if (!name) {
      alert("Please enter a name for this outfit");
      return;
    }

    if (selectedItems.length === 0) {
      alert("Please select at least one item for this outfit");
      return;
    }

    const newOutfit: OutfitItem = {
      id: outfit?.id || uuidv4(),
      name,
      description,
      items: selectedItems,
      createdAt: outfit?.createdAt || new Date().toISOString(),
    };

    onSave(newOutfit);
  };

  // Group wardrobe items by category for filtering
  const categories = [...new Set(wardrobe.map(item => item.category))];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Outfit Name</Label>
          <Input 
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Summer Casual, Work Attire, etc."
            className="mt-1"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="A description of this outfit..."
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Selected Items ({selectedItems.length})</h3>
        {selectedItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {selectedItems.map((item) => (
              <div key={item.id} className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.description || "Clothing item"}
                  className="w-full h-32 object-cover rounded-md"
                />
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute top-1 right-1 h-6 w-6 rounded-full bg-white/80"
                  onClick={() => removeSelectedItem(item.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
                <p className="text-xs mt-1 truncate">{item.category}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-10">
            No items selected. Please select items from your wardrobe below.
          </p>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Select Items from Your Wardrobe</h3>
          <div className="flex flex-wrap gap-2 my-3">
            <Button
              size="sm"
              variant={categoryFilter === null ? "default" : "outline"}
              onClick={() => setCategoryFilter(null)}
            >
              All
            </Button>
            {categories.map(cat => (
              <Button
                key={cat}
                size="sm"
                variant={categoryFilter === cat ? "default" : "outline"}
                onClick={() => setCategoryFilter(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <ClothingGrid
          items={filteredWardrobe}
          selectable={true}
          selectedItems={selectedItems.map(item => item.id)}
          onItemClick={handleItemClick}
          gridClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          {outfit ? "Save Changes" : "Create Outfit"}
        </Button>
      </div>
    </div>
  );
};

export default OutfitForm;
