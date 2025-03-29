import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUploader from './FileUploader';
import FileList from './FileList';
import Navbar from './Navbar';
import Home from './Home';
import Footer from './Footer';
import GoogleAuth from './GoogleAuth';
import Contact from './Contact';
import Dashboard from './Dashboard';
import UserFiles from './UsrFiles';
const App = () => {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  });

  return (
    <Router>
      {/* Pass user to Navbar */}
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/upload" element={<FileUploader />} />
        <Route path="/files" element={<FileList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userfiles" element={<UserFiles />} />
        {/* Pass setUser to GoogleAuth to update state */}
        <Route path="/login" element={<GoogleAuth setUser={setUser} />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
