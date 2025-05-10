
import React, { useState } from "react";
import { Upload, X, Image, Palette } from "lucide-react";
import { toast } from "sonner";
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
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { v4 as uuidv4 } from 'uuid';
import { loadWardrobeItems, saveWardrobeItems } from "@/lib/local-storage";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
  "Tops", "Bottoms", "Dresses", "Outerwear", 
  "Footwear", "Accessories", "Activewear", "Formal"
];

const SEASONS = ["Spring", "Summer", "Fall", "Winter", "All Seasons"];

const UploadForm: React.FC = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [brand, setBrand] = useState("");
  const [season, setSeason] = useState("");
  const [color, setColor] = useState("#000000");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl) {
      toast.error("Please upload an image");
      return;
    }
    
    if (!category) {
      toast.error("Please select a category");
      return;
    }

    try {
      setUploading(true);
      
      // Get current wardrobe items
      const currentItems = loadWardrobeItems();
      
      // Create the new item
      const newItem = {
        id: uuidv4(),
        imageUrl: previewUrl,
        category,
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ""),
        color,
        brand,
        season,
      };
      
      // Add new item to wardrobe
      const updatedItems = [...currentItems, newItem];
      saveWardrobeItems(updatedItems);
      
      toast.success("Item added to your wardrobe!");
      
      // Navigate to the wardrobe page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
      // Reset the form
      setPreviewUrl(null);
      setDescription("");
      setCategory("");
      setTags("");
      setBrand("");
      setSeason("");
      setColor("#000000");
    } catch (error) {
      toast.error("Failed to upload. Please try again.");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add to Your Wardrobe</CardTitle>
      </CardHeader>
      <CardContent>
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
            <Select value={category} onValueChange={setCategory}>
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
            <Textarea 
              placeholder="Description (optional)" 
              value={description} 
              onChange={e => setDescription(e.target.value)}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input 
                placeholder="Brand (optional)" 
                value={brand} 
                onChange={e => setBrand(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Select value={season} onValueChange={setSeason}>
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
            <Label className="flex items-center gap-2">
              <Palette className="h-4 w-4" /> Color
            </Label>
            <div className="flex items-center gap-2">
              <Input 
                type="color" 
                value={color} 
                onChange={e => setColor(e.target.value)}
                className="w-12 h-8 p-1"
              />
              <Input 
                value={color} 
                onChange={e => setColor(e.target.value)} 
                placeholder="#000000"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Input 
              placeholder="Tags (comma separated)" 
              value={tags} 
              onChange={e => setTags(e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={uploading || !previewUrl}
          >
            {uploading ? "Uploading..." : "Add to Wardrobe"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UploadForm;
