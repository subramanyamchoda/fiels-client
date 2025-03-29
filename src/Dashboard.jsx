import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const navigate = useNavigate();
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      localStorage.setItem("userId", user._id);
    }
  }, [user, navigate]);
  
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });

      // Clear session and reload
      document.cookie = "authToken=; Max-Age=0; path=/; domain=localhost; Secure; SameSite=None";
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-96 text-center">
        {user ? (
          <div>
          {/* <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">User ID, {user._id}!</h2> */}
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">Welcome, {user.name}!</h2>
            <p className="text-gray-500 dark:text-gray-300">{user.email}</p>

            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20  mb-4 rounded-full mx-auto mt-4 shadow-md border-2 border-gray-300"
            />
            <Link to="/userfiles" className="mt-4 bg-green-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200">Your Files</Link> <br />

            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-xl text-gray-700 dark:text-white">Please log in to view your dashboard.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
