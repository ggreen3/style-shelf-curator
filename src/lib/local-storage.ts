
import { ClothingItemProps } from "@/components/clothing/ClothingItem";

const STORAGE_KEYS = {
  WARDROBE_ITEMS: 'wardrobe-items',
  OUTFITS: 'outfits',
  FAVORITES: 'favorites',
  BOOKMARKS: 'bookmarks',
  THEME: 'theme-mode',
};

export interface OutfitItem {
  id: string;
  name: string;
  description?: string;
  items: ClothingItemProps[];
  createdAt: string;
}

export const loadWardrobeItems = (): ClothingItemProps[] => {
  try {
    const items = localStorage.getItem(STORAGE_KEYS.WARDROBE_ITEMS);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error loading wardrobe items:', error);
    return [];
  }
};

export const saveWardrobeItems = (items: ClothingItemProps[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.WARDROBE_ITEMS, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving wardrobe items:', error);
  }
};

export const loadOutfits = (): OutfitItem[] => {
  try {
    const outfits = localStorage.getItem(STORAGE_KEYS.OUTFITS);
    return outfits ? JSON.parse(outfits) : [];
  } catch (error) {
    console.error('Error loading outfits:', error);
    return [];
  }
};

export const saveOutfits = (outfits: OutfitItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.OUTFITS, JSON.stringify(outfits));
  } catch (error) {
    console.error('Error saving outfits:', error);
  }
};

export const loadFavorites = (): string[] => {
  try {
    const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const saveFavorites = (ids: string[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(ids));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const loadBookmarks = (): string[] => {
  try {
    const bookmarks = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error('Error loading bookmarks:', error);
    return [];
  }
};

export const saveBookmarks = (ids: string[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(ids));
  } catch (error) {
    console.error('Error saving bookmarks:', error);
  }
};

export const loadThemePreference = (): 'dark' | 'light' | null => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) as 'dark' | 'light' | null;
  } catch (error) {
    console.error('Error loading theme preference:', error);
    return null;
  }
};

export const saveThemePreference = (theme: 'dark' | 'light'): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Error saving theme preference:', error);
  }
};
