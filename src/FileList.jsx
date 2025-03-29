import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  Download,
  Search,
  FileText,
  Image,
  FileSpreadsheet,
  FileArchive,
  File,
  Moon,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [fileType, setFileType] = useState("all");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/files");
      setFiles(response.data);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (filename) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/files/${filename}`, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  
  const getFileIcon = (filename) => {
    if (/\.(jpg|jpeg|png|gif|svg)$/i.test(filename)) return <Image size={20} />;
    if (/\.(pdf)$/i.test(filename)) return <FileText size={20} />;
    if (/\.(xlsx|xls|csv)$/i.test(filename)) return <FileSpreadsheet size={20} />;
    if (/\.(zip|rar|tar)$/i.test(filename)) return <FileArchive size={20} />;
    return <File size={20} />;
  };

  const filteredFiles = useMemo(() => {
    return files
      .filter((file) => file.filename.toLowerCase().includes(search.toLowerCase()))
      .filter((file) => {
        if (fileType === "all") return true;
        if (fileType === "images") return /\.(jpg|jpeg|png|gif|svg)$/i.test(file.filename);
        if (fileType === "pdf") return /\.pdf$/i.test(file.filename);
        if (fileType === "text") return /\.txt$/i.test(file.filename);
        if (fileType === "spreadsheet") return /\.(xlsx|xls|csv)$/i.test(file.filename);
        return false;
      })
      .sort((a, b) => {
        if (sortOrder === "newest") return new Date(b.uploadDate) - new Date(a.uploadDate);
        if (sortOrder === "oldest") return new Date(a.uploadDate) - new Date(b.uploadDate);
        if (sortOrder === "az") return a.filename.localeCompare(b.filename);
        if (sortOrder === "za") return b.filename.localeCompare(a.filename);
        return 0;
      });
  }, [files, search, sortOrder, fileType]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-4xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            🐼 Panda File Manager
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-gray-800 dark:text-gray-300 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search files..."
              className="w-full px-4 py-3 border rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-3 text-gray-500 dark:text-gray-300" size={20} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <motion.select
            whileHover={{ scale: 1.05 }}
            className="w-full sm:w-1/2 px-4 py-2 border rounded-lg bg-gray-200 dark:bg-gray-700 cursor-pointer text-gray-900 dark:text-white"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </motion.select>

          <motion.select
            whileHover={{ scale: 1.05 }}
            className="w-full sm:w-1/2 px-4 py-2 border rounded-lg bg-gray-200 dark:bg-gray-700 cursor-pointer text-gray-900 dark:text-white"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
          >
            <option value="all">All Files</option>
            <option value="images">Images</option>
            <option value="pdf">PDFs</option>
            <option value="text">Text Files</option>
            <option value="spreadsheet">Spreadsheets</option>
          </motion.select>
        </div>

        {/* File List */}
        {loading ? (
          <p className="text-gray-700 dark:text-white text-center">Loading files...</p>
        ) : filteredFiles.length === 0 ? (
          <p className="text-gray-700 dark:text-white text-center">No files found.</p>
        ) : (
          <div className="grid gap-4">
            {filteredFiles.map((file) => (
              <div
                key={file.filename}
                className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg flex justify-between items-center text-gray-900 dark:text-white"
              >
                <div className="flex items-center space-x-3 w-full">
                  {getFileIcon(file.filename)}
                  <span className="truncate">{file.filename}</span>
                </div>
                <button className="hover:text-blue-500" onClick={() => handleDownload(file.filename)}>
                  <Download size={20} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileList;
