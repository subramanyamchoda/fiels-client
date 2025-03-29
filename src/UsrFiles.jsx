import React, { useState, useEffect } from "react";
import axios from "axios";

const UserFiles = () => {
  const [files, setFiles] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUserFiles();
  }, []);

  const fetchUserFiles = async () => {
    setLoading(true);
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setMessage("⚠️ User not logged in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/auth/user/${userId}/files`);
      setFiles(response.data.files);
      setFilteredFiles(response.data.files);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error fetching files:", error);
      setMessage("❌ Failed to fetch files.");
    }
    setLoading(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = files.filter((file) =>
      file.filename.toLowerCase().includes(query)
    );

    setFilteredFiles(filtered);
  };

  const handleDownload = async (fileId, filename) => {
    try {
      const response= axios.get(`http://localhost:5000/auth/download/${fileId}`, { responseType: "blob" });

  
      // Create a Blob URL
      const url = window.URL.createObjectURL(new Blob([response.data]));
      
      // Create a download link
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("❌ Error downloading file.");
    }
  };
  
  

  const handleDelete = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      await axios.delete(`http://localhost:5000/auth/delete/${fileId}`);
      setFiles(files.filter(file => file._id !== fileId));
      setFilteredFiles(filteredFiles.filter(file => file._id !== fileId));
      alert("✅ File deleted successfully.");
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("❌ Error deleting file.");
    }
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Your Uploaded Files
      </h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search files..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full max-w-lg p-2 border rounded-md shadow-md dark:bg-gray-800 dark:text-white mb-4"
      />

      {/* File List */}
      {loading ? (
        <p className="text-gray-700 dark:text-gray-300">Loading files...</p>
      ) : filteredFiles.length > 0 ? (
        <ul className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4">
          {filteredFiles.map((file) => (
            <li
              key={file._id}
              className="flex justify-between items-center p-2 border-b dark:border-gray-600"
            >
              <span className="text-gray-700 dark:text-gray-300">{file.filename}</span>
              <div>
                <button
                  onClick={() => handleDownload(file._id, file.filename)}
                  className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 mr-2"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDelete(file._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">{message || "No files found."}</p>
      )}
    </div>
  );
};

export default UserFiles;
