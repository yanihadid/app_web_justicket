import React from "react";
import { Box, Button, Container, Typography, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar"; 
import { CssBaseline } from '@mui/material';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <Box 
        sx={{
          backgroundImage: "url('/background.jpg')",  
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          px: 3,
          border: "5px solid black", 
          outline: "5px solid black", 
        }}
      >
        <Navbar />

        {/* Contenu principal */}
        <Container sx={{ mt: 10, textAlign: "center" }}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              Let there be live
            </Typography>
            <Typography variant="h5" sx={{ mb: 3 }}>
              Votre prochaine nuit inoubliable commence ici. Trouvez vos billets dès maintenant !
            </Typography>
          </motion.div>

          {/* Champ de recherche */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <TextField 
              variant="outlined"
              placeholder="Recherchez un artiste, un concert, un lieu..."
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                maxWidth: "500px",
                input: { color: "black" },
                mb: 2
              }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ borderRadius: 2 }}
              onClick={() => navigate("/concerts")}
            >
              Rechercher
            </Button>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
