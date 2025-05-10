
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import WardrobePage from "./pages/WardrobePage";
import UploadPage from "./pages/UploadPage";
import InspirationPage from "./pages/InspirationPage";
import OutfitsPage from "./pages/OutfitsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WardrobePage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/inspiration" element={<InspirationPage />} />
          <Route path="/outfits" element={<OutfitsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
