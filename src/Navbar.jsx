import React, { useState, useEffect } from "react";
import axios from "axios";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Handle Dark Mode Toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/auth/logout", {}, { withCredentials: true });

      // Remove authentication token
      document.cookie = "authToken=; Max-Age=0; path=/; domain=localhost; Secure; SameSite=None";

      // Remove user data and reload page
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      window.location.reload();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleToggle = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-menu")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white/20 dark:bg-gray-900 backdrop-blur-lg dark:text-white shadow-lg w-full z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-white flex items-center"
          >
            🐼 Panda Files
          </motion.div>

          {/* Desktop Navbar */}
          <div className="hidden md:flex space-x-8">
            {["Home", "Upload", "Files", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-xl text-white relative hover:text-gray-300 transition-all"
                whileHover={{ scale: 1.05 }}
              >
                {item}
              </motion.a>
            ))}

            {/* User Profile Dropdown */}
            {user ? (
              <div className="relative user-menu">
                <img
                  src={user.avatar}
                  alt="User"
                  className="w-10 h-10 rounded-full border border-white cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                />

                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-lg shadow-lg p-4"
                    >
                      <p className="text-center font-semibold">{user.name}</p>

                      {/* Dashboard Link */}
                      <Link
                        to="/dashboard"
                        className="mt-2 w-full text-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-all block"
                      >
                        Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="mt-2 w-full text-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/login" className="text-xl text-white hover:text-gray-300">
                Login
              </Link>
            )}
          </div>

          {/* Dark Mode + Mobile Menu */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              className="text-white p-2 rounded-lg hover:bg-white/10"
              whileTap={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            <button className="md:hidden text-white" onClick={handleToggle} aria-label="Toggle Menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-800/90 backdrop-blur-lg"
          >
            {["Home", "Upload", "Files", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="block py-3 text-lg text-white text-center hover:text-gray-300 transition-all"
                onClick={closeMenu}
              >
                {item}
              </Link>
            ))}

            {user ? (
              <div className="flex flex-col items-center py-4">
                <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full border border-white" />
                <p className="mt-2 font-semibold text-white">{user.name}</p>

                {/* Dashboard Link */}
                <Link
                  to="/dashboard"
                  className="mt-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="mt-2 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block py-3 text-lg text-white text-center hover:text-gray-300 transition-all"
                onClick={closeMenu}
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <hr className="border-white border-1" />
    </nav>
  );
};

export default Navbar;
