
import React, { useState } from "react";
import { Upload, X, Image } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const CATEGORIES = [
  "Tops", "Bottoms", "Dresses", "Outerwear", 
  "Footwear", "Accessories", "Activewear", "Formal"
];

const UploadForm: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
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
      // In a real app, we would upload the file to a server here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate upload delay
      
      toast.success("Item added to your wardrobe!");
      
      // Reset the form
      setPreviewUrl(null);
      setDescription("");
      setCategory("");
      setTags("");
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
