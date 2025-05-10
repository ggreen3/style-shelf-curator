
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Layout from "@/components/layout/Layout";
import ClothingGrid from "@/components/clothing/ClothingGrid";
import SearchAndFilter from "@/components/filters/SearchAndFilter";
import { ClothingItemProps } from "@/components/clothing/ClothingItem";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Grid2X2, LayoutList } from "lucide-react";
import EditItemForm from "@/components/clothing/EditItemForm";
import { toast } from "sonner";
import { loadWardrobeItems, saveWardrobeItems, loadFavorites, saveFavorites, loadBookmarks, saveBookmarks } from "@/lib/local-storage";
import { generateDemoItems } from "@/lib/demo-data";

// Demo categories
const CATEGORIES = [
  "Tops", "Bottoms", "Dresses", "Outerwear", 
  "Footwear", "Accessories"
];

const WardrobePage: React.FC = () => {
  const [items, setItems] = useState<ClothingItemProps[]>([]);
  const [filteredItems, setFilteredItems] = useState<ClothingItemProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ClothingItemProps | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        setIsLoading(true);
        
        // Load items from local storage
        let storedItems = loadWardrobeItems();
        
        // If no items in storage, generate demo data
        if (storedItems.length === 0) {
          const demoItems = generateDemoItems();
          setItems(demoItems);
          saveWardrobeItems(demoItems);
        } else {
          setItems(storedItems);
        }

        // Load favorites and bookmarks
        setFavorites(loadFavorites());
        setBookmarks(loadBookmarks());
      } catch (error) {
        toast.error("Could not load your wardrobe items");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    let result = items;

    // Apply favorites to items
    result = result.map(item => ({
      ...item,
      isFavorite: favorites.includes(item.id),
      isBookmarked: bookmarks.includes(item.id),
    }));

    // Apply category filter
    if (selectedCategory) {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((item) => 
        item.description?.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query))) ||
        (item.brand && item.brand.toLowerCase().includes(query)) ||
        (item.season && item.season.toLowerCase().includes(query))
      );
    }

    setFilteredItems(result);
  }, [items, selectedCategory, searchQuery, favorites, bookmarks]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setIsAddDialogOpen(true);
  };

  const handleEditItem = (item: ClothingItemProps) => {
    setEditingItem(item);
    setIsAddDialogOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    saveWardrobeItems(updatedItems);
    
    // Also remove from favorites and bookmarks if present
    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter(fav => fav !== id);
      setFavorites(updatedFavorites);
      saveFavorites(updatedFavorites);
    }
    
    if (bookmarks.includes(id)) {
      const updatedBookmarks = bookmarks.filter(bookmark => bookmark !== id);
      setBookmarks(updatedBookmarks);
      saveBookmarks(updatedBookmarks);
    }
  };

  const handleSaveItem = (item: ClothingItemProps) => {
    if (!item.id) {
      // Add new item
      const newItem = { 
        ...item, 
        id: uuidv4(),
        isFavorite: false,
        isBookmarked: false
      };
      
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      saveWardrobeItems(updatedItems);
      toast.success("Item added to your wardrobe");
    } else {
      // Update existing item
      const updatedItems = items.map(existingItem => 
        existingItem.id === item.id ? { 
          ...item, 
          isFavorite: favorites.includes(item.id),
          isBookmarked: bookmarks.includes(item.id)
        } : existingItem
      );
      
      setItems(updatedItems);
      saveWardrobeItems(updatedItems);
      toast.success("Item updated");
    }
    
    setIsAddDialogOpen(false);
  };

  const handleFavoriteToggle = (id: string, isFavorite: boolean) => {
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = [...favorites, id];
    } else {
      newFavorites = favorites.filter(itemId => itemId !== id);
    }
    
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const handleBookmarkToggle = (id: string, isBookmarked: boolean) => {
    let newBookmarks;
    
    if (isBookmarked) {
      newBookmarks = [...bookmarks, id];
    } else {
      newBookmarks = bookmarks.filter(itemId => itemId !== id);
    }
    
    setBookmarks(newBookmarks);
    saveBookmarks(newBookmarks);
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Wardrobe</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsGridView(!isGridView)}
              className="hidden sm:flex"
            >
              {isGridView ? (
                <LayoutList className="h-5 w-5" />
              ) : (
                <Grid2X2 className="h-5 w-5" />
              )}
            </Button>
            <Button onClick={handleAddItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        </div>

        <SearchAndFilter
          onSearch={handleSearch}
          onFilterChange={handleCategoryChange}
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
        />

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="aspect-[3/4] bg-muted animate-pulse rounded-md"></div>
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <ClothingGrid 
            items={filteredItems}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            onFavoriteToggle={handleFavoriteToggle}
            onBookmarkToggle={handleBookmarkToggle}
            gridClassName={isGridView ? "masonry-grid" : "space-y-4"}
          />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium">No items found</h2>
            <p className="text-muted-foreground mt-2 mb-6">
              Try adjusting your search or filters to find what you're looking for
            </p>
            <Button onClick={handleAddItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Item
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit Item" : "Add New Item"}
            </DialogTitle>
          </DialogHeader>
          <EditItemForm 
            item={editingItem || undefined}
            onSave={handleSaveItem}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default WardrobePage;
