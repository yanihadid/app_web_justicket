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

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <BrowserRouter>
        <Navbar />
        <Box sx={{ flex: '1 0 auto' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/concerts" element={<ConcertList />} />
            <Route path="/billets" element={<MesBillets />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Box>
        <Footer />
      </BrowserRouter>
    </Box>
  );
}

export default App;
