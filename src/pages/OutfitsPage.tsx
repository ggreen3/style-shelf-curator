
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import OutfitForm from "@/components/outfits/OutfitForm";
import OutfitCard from "@/components/outfits/OutfitCard";
import { loadOutfits, saveOutfits, OutfitItem, loadWardrobeItems } from "@/lib/local-storage";
import { ClothingItemProps } from "@/components/clothing/ClothingItem";
import { toast } from "sonner";

const OutfitsPage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [outfits, setOutfits] = useState<OutfitItem[]>([]);
  const [wardrobeItems, setWardrobeItems] = useState<ClothingItemProps[]>([]);
  const [editingOutfit, setEditingOutfit] = useState<OutfitItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        setIsLoading(true);
        
        // Load outfits from local storage
        const storedOutfits = loadOutfits();
        setOutfits(storedOutfits);
        
        // Load wardrobe items
        const storedItems = loadWardrobeItems();
        setWardrobeItems(storedItems);
      } catch (error) {
        toast.error("Could not load your outfits");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, []);

  const handleCreateOutfit = () => {
    setEditingOutfit(null);
    setIsDialogOpen(true);
  };

  const handleEditOutfit = (outfit: OutfitItem) => {
    setEditingOutfit(outfit);
    setIsDialogOpen(true);
  };

  const handleDeleteOutfit = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this outfit?");
    if (confirmed) {
      const updatedOutfits = outfits.filter(outfit => outfit.id !== id);
      setOutfits(updatedOutfits);
      saveOutfits(updatedOutfits);
      toast.success("Outfit deleted");
    }
  };

  const handleSaveOutfit = (outfit: OutfitItem) => {
    if (editingOutfit) {
      // Update existing outfit
      const updatedOutfits = outfits.map(o => 
        o.id === outfit.id ? outfit : o
      );
      setOutfits(updatedOutfits);
      saveOutfits(updatedOutfits);
      toast.success("Outfit updated");
    } else {
      // Add new outfit
      const updatedOutfits = [...outfits, outfit];
      setOutfits(updatedOutfits);
      saveOutfits(updatedOutfits);
      toast.success("Outfit created");
    }
    
    setIsDialogOpen(false);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Outfits</h1>
          <Button onClick={handleCreateOutfit}>
            <Plus className="h-4 w-4 mr-2" />
            Create Outfit
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="aspect-square bg-muted animate-pulse rounded-md"></div>
            ))}
          </div>
        ) : outfits.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {outfits.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                onEdit={handleEditOutfit}
                onDelete={handleDeleteOutfit}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium">No outfits created yet</h2>
            <p className="text-muted-foreground mt-2 mb-6">
              Create your first outfit by combining items from your wardrobe
            </p>
            <Button onClick={handleCreateOutfit}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Outfit
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingOutfit ? "Edit Outfit" : "Create New Outfit"}
            </DialogTitle>
          </DialogHeader>
          <OutfitForm
            wardrobe={wardrobeItems}
            outfit={editingOutfit || undefined}
            onSave={handleSaveOutfit}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default OutfitsPage;
