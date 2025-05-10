
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const OutfitsPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Outfits</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Outfit
          </Button>
        </div>

        <div className="text-center py-16">
          <h2 className="text-xl font-medium">No outfits created yet</h2>
          <p className="text-muted-foreground mt-2 mb-6">
            Create your first outfit by combining items from your wardrobe
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Outfit
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default OutfitsPage;
