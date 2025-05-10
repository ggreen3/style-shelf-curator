
import React from "react";
import { Toaster } from "sonner";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container py-6">{children}</main>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default Layout;
