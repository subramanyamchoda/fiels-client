import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ Import motion

const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const { data } = await axios.post(
        "http://localhost:5000/auth/google",
        { token: credential },
        { withCredentials: true }
      );

      console.log("Full response from backend:", data);

      if (!data.user) {
        console.error("Error: User data is missing from backend response");
        return;
      }

      // ✅ Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Navigate to dashboard after login
      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Google Login Failed", error);
  };

  return (
    <GoogleOAuthProvider clientId="578603890388-htcijbr1gv89s1lv0pdlpplgp7brck0n.apps.googleusercontent.com">
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 text-center border border-white/20"
        >
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-white"
          >
            Login to Continue
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-300 mt-2"
          >
            Sign in with Google to proceed
          </motion.p>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6"
          >
            <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-5xl mt-6"
          >
            🐼
          </motion.div>
        </motion.div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
