import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material'; 
import ConcertList from "./presentation/pages/ConcertList";
import MesBillets from "./presentation/pages/MesBillets";
import Navbar from "./presentation/components/Navbar";
import HomePage from "./presentation/pages/HomePage";
import SignUp from "./presentation/pages/SignUpPage";
import Login from "./presentation/pages/LoginPage";
import Footer from "./presentation/components/Footer";
import './app.css'; 

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BrowserRouter>
        <Navbar />
        <Box sx={{ flex: '1 0 auto' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/concerts" element={<div className="background"><ConcertList /></div>} />
            <Route path="/billets" element={<div className="background"><MesBillets /></div>} />
            <Route path="/login" element={<div className="background"><Login /></div>} />
            <Route path="/signup" element={<div className="background"><SignUp /></div>} />
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;
