
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Plus, Grid2X2, Moon, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isMobile = useIsMobile();

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === "/" || path === "/wardrobe") return "wardrobe";
    if (path === "/inspiration") return "inspiration";
    if (path === "/outfits") return "outfits";
    if (path === "/upload") return "upload";
    return "wardrobe";
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="font-semibold text-xl">
            StyleShelf
          </Link>
        </div>
        
        <div className="hidden md:flex w-1/3 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your wardrobe"
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex">
            <Tabs defaultValue={getActiveTab()} value={getActiveTab()}>
              <TabsList>
                <TabsTrigger value="wardrobe" asChild>
                  <Link to="/">My Wardrobe</Link>
                </TabsTrigger>
                <TabsTrigger value="inspiration" asChild>
                  <Link to="/inspiration">Inspiration</Link>
                </TabsTrigger>
                <TabsTrigger value="outfits" asChild>
                  <Link to="/outfits">Outfits</Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <Button 
            size="icon" 
            variant="ghost" 
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          
          <Button size="icon" variant="ghost" asChild className="rounded-full">
            <Link to="/upload">
              <Plus className="h-5 w-5" />
              <span className="sr-only">Add item</span>
            </Link>
          </Button>
          
          <Button size="icon" variant="ghost" asChild className="md:hidden rounded-full">
            <Link to="/search">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="relative rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>GG</AvatarFallback>
                </Avatar>
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 py-6">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>GG</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-lg font-semibold">GGreen</h2>
                    <p className="text-sm text-muted-foreground">Manage your wardrobe</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:hidden">
                  <Link to="/" className="py-2">My Wardrobe</Link>
                  <Link to="/inspiration" className="py-2">Inspiration</Link>
                  <Link to="/outfits" className="py-2">Outfits</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <Link to="/categories" className="py-2">Categories</Link>
                  <Link to="/settings" className="py-2">Settings</Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
