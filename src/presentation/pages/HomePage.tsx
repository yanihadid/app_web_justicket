import React from "react";
import { Box, Button, Container, Typography, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CssBaseline } from '@mui/material';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <Box 
        sx={{
          backgroundImage: "url('../../../bg.png')",
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

        {/* Contenu principal */}
        <Container sx={{ mt: 0, textAlign: "center" }}>
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              Let there be live
            </Typography>
            <Typography 
              variant="h6"
              sx={{ 
                maxWidth: "700px", 
                margin: "auto", 
                mb: 4, 
                fontWeight: 500, 
                textShadow: "1px 1px 3px rgba(0,0,0,0.7)" 
              }}
            >
              De la scène aux coulisses, <strong>Justicket</strong> vous accompagne pour ne rien manquer de vos événements préférés.
              Parcourez notre sélection de concerts exclusifs, réservez vos billets en quelques clics, et préparez-vous à vivre l’émotion du live.
            </Typography>

            <Typography 
              variant="h6"
              sx={{ 
                maxWidth: "700px", 
                margin: "auto", 
                mb: 4, 
                fontWeight: 500, 
                textShadow: "1px 1px 3px rgba(0,0,0,0.7)" 
              }}
            ></Typography>

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
          <Box 
            sx={{
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center", 
              gap: 2, 
              maxWidth: "600px", 
              width: "100%", 
              margin: "auto"
            }}
          >
            <TextField 
              variant="outlined"
              placeholder="Recherchez un artiste, un concert, un lieu..."
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                input: { color: "black" },
                flexGrow: 1 
              }}
            />
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ borderRadius: 2, whiteSpace: "nowrap" }} 
              onClick={() => navigate("/concerts")}
            >
              Rechercher
            </Button>
          </Box>

          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
