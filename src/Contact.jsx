import React from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="min-h-screen flex text-white  flex-col items-center justify-center  dark:bg-gray-900   ">
      {/* Animated Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center"
      >
        <motion.img 
          src="tlogo.jpg"  // Replace with actual image path
          alt="Panda Icon" 
          className="w-20 h-20 sm:w-24 sm:h-24 mb-1 rounded-2xl"
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{ yoyo: Infinity, duration: 1.5 }}
        />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-2">📞 Contact Us</h1>
      </motion.div>

      <p className="text-lg text-center max-w-2xl">
        Got a question or feedback? We'd love to hear from you!  
        Feel free to reach out through the details below.
      </p>

      {/* Contact Info */}
      <div className="mt-8 w-full max-w-lg space-y-4">
        {[ 
          { Icon: Mail, text: "subramanyamchoda50@gmail.com" },
          { Icon: Phone, text: "+91 8919348949" },
          { Icon: MapPin, text: "Ongole" }
        ].map(({ Icon, text }, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-center sm:justify-start space-x-2 text-lg bg-white/10 px-6 py-3 rounded-xl shadow-lg hover:bg-white/20 transition w-full text-center sm:text-left"
          >
            <Icon size={22} /> <span>{text}</span>
          </motion.div>
        ))}
      </div>

      {/* Call-to-Action */}
      <motion.a
        href="mailto:subramanyamchoda50@gmail.com"
        className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-full shadow-lg transition"
        whileHover={{ scale: 1.1 }}
      >
        ✉️ Send an Email
      </motion.a>

      {/* Social Links with Hover Glow Effect */}
      <div className="flex justify-center space-x-6 mt-8 flex-wrap">
        {[ 
          { Icon: Facebook, link: "https://facebook.com", color: "text-blue-500" },
          { Icon: Instagram, link: "https://instagram.com", color: "text-pink-500" },
          { Icon: Linkedin, link: "https://www.linkedin.com/in/subramanyam-choda-29238a305/", color: "text-blue-600" },
          { Icon: Github, link: "https://github.com/subramanyamchoda", color: "text-gray-400" }
        ].map(({ Icon, link, color }, index) => (
          <motion.a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, textShadow: "0px 0px 8px rgba(255,255,255,0.8)" }}
            className={`transition ${color}`}
          >
            <Icon size={32} />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Contact;