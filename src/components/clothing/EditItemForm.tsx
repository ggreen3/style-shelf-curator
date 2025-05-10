
import React, { useState, useEffect } from "react";
import { ClothingItemProps } from "./ClothingItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Palette, Image, X } from "lucide-react";

// Common categories for clothing items
const CATEGORIES = [
  "Tops", "Bottoms", "Dresses", "Outerwear",
  "Footwear", "Accessories", "Activewear", "Formal"
];

// Common seasons
const SEASONS = ["Spring", "Summer", "Fall", "Winter", "All Seasons"];

interface EditItemFormProps {
  item?: ClothingItemProps;
  onSave: (item: ClothingItemProps) => void;
  onCancel: () => void;
}

const EditItemForm: React.FC<EditItemFormProps> = ({
  item,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<ClothingItemProps>>({
    id: item?.id || "",
    imageUrl: item?.imageUrl || "",
    category: item?.category || "",
    description: item?.description || "",
    tags: item?.tags || [],
    color: item?.color || "#000000",
    brand: item?.brand || "",
    season: item?.season || "",
  });
  
  const [previewUrl, setPreviewUrl] = useState<string | null>(formData.imageUrl || null);
  const [tagsInput, setTagsInput] = useState(formData.tags?.join(", ") || "");
  const [isNewItem, setIsNewItem] = useState(!item);

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        imageUrl: item.imageUrl,
        category: item.category,
        description: item.description || "",
        tags: item.tags || [],
        color: item.color || "#000000",
        brand: item.brand || "",
        season: item.season || "",
      });
      setPreviewUrl(item.imageUrl);
      setTagsInput(item.tags?.join(", ") || "");
      setIsNewItem(false);
    } else {
      setIsNewItem(true);
    }
  }, [item]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    // Split by comma and trim whitespace
    const tagArray = e.target.value
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== "");
    setFormData(prev => ({ ...prev, tags: tagArray }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        setFormData(prev => ({ ...prev, imageUrl: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    setFormData(prev => ({ ...prev, imageUrl: "" }));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setFormData(prev => ({ ...prev, color }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.imageUrl) {
      alert("Please upload an image");
      return;
    }

    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    onSave(formData as ClothingItemProps);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid w-full place-items-center">
        {previewUrl ? (
          <div className="relative w-full max-w-sm">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full h-auto rounded-md object-cover" 
            />
            <Button 
              type="button"
              size="icon"
              variant="secondary"
              className="absolute top-2 right-2 rounded-full"
              onClick={clearImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed rounded-md border-muted-foreground/25 cursor-pointer hover:border-muted-foreground/50 transition-all">
            <Input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              id="upload-image" 
              onChange={handleFileChange} 
            />
            <label htmlFor="upload-image" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
              <div className="flex flex-col items-center justify-center gap-2">
                <Image className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  SVG, PNG, JPG or GIF (max 10MB)
                </p>
              </div>
            </label>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select 
          value={formData.category} 
          onValueChange={(value) => handleSelectChange("category", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description"
          name="description"
          placeholder="Description (optional)" 
          value={formData.description} 
          onChange={handleInputChange}
          className="resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand">Brand</Label>
          <Input 
            id="brand"
            name="brand"
            placeholder="Brand (optional)" 
            value={formData.brand} 
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="season">Season</Label>
          <Select 
            value={formData.season || ""} 
            onValueChange={(value) => handleSelectChange("season", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent>
              {SEASONS.map(season => (
                <SelectItem key={season} value={season}>{season}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="color" className="flex items-center gap-2">
          <Palette className="h-4 w-4" /> Color
        </Label>
        <div className="flex items-center gap-2">
          <Input 
            id="color"
            name="color"
            type="color" 
            value={formData.color} 
            onChange={handleColorChange}
            className="w-12 h-8 p-1"
          />
          <Input 
            value={formData.color} 
            onChange={handleColorChange} 
            placeholder="#000000"
            className="flex-1"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input 
          id="tags"
          placeholder="Tags (comma separated)" 
          value={tagsInput} 
          onChange={handleTagsChange}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isNewItem ? "Add to Wardrobe" : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default EditItemForm;
