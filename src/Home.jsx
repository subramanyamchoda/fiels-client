import React from "react";
import { motion } from "framer-motion";
import { UploadCloud, File, Search } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br  dark:bg-gray-900 text-white">
      
      {/* Header */}
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="text-4xl sm:text-5xl font-bold text-center mb-2"
      >
        🐼 Panda Files
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base sm:text-lg text-center max-w-2xl mb-2"
      >
        Upload, manage, and access your files seamlessly. <br /> 
        **Drag and drop multiple files** or **browse and upload** with ease.
      </motion.p>
      
      {/* Image Section */}
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
        <motion.img 
          src="panda.webp"  
          alt="Panda Files Concept 1" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8 }} 
          className="w-64 sm:w-80 rounded-xl shadow-lg"
        />
        <motion.img 
          src="panda1.webp"  
          alt="Panda Files Concept 2" 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.8, delay: 0.2 }} 
          className="w-64 sm:w-80 rounded-xl shadow-lg"
        />
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mt-8">
        {[
          { icon: <File size={40} className="text-yellow-400" />, title: "Any File Type", desc: "Upload and manage images, PDFs, videos, and more." },
          { icon: <Search size={40} className="text-green-400" />, title: "Quick Search", desc: "Find your files instantly with smart search." },
          { icon: <UploadCloud size={40} className="text-blue-400" />, title: "Bulk Upload", desc: "Upload multiple files at once without any hassle." }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.2 }}
            className="bg-white/20 dark:bg-gray-700 p-4 rounded-lg shadow-lg flex flex-col items-center text-center"
          >
            {feature.icon}
            <h3 className="text-lg sm:text-xl font-semibold mt-2">{feature.title}</h3>
            <p className="text-sm sm:text-base">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
