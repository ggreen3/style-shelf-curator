
import React from "react";
import Layout from "@/components/layout/Layout";
import UploadForm from "@/components/upload/UploadForm";

const UploadPage: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Add to Your Wardrobe</h1>
        </div>
        <UploadForm />
      </div>
    </Layout>
  );
};

export default UploadPage;
