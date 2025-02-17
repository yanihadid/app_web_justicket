import React, { useEffect, useState } from "react";
import { BilletService } from "../../application/services/BilletService";
import { Billet } from "../../domain/entities/Billet";
import { Card, CardContent, Typography, Grid, Box, CircularProgress, Chip, Button, CardMedia } from "@mui/material";

const MesBillets = () => {
  const [billets, setBillets] = useState<Billet[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = "user123"; // ID simulé pour l'exemple

  useEffect(() => {
    const fetchBillets = async () => {
      const data = await BilletService.getBilletsByUser(userId);
      setBillets(data);
      setLoading(false);
    };
    fetchBillets();
  }, []);

  const handleTransferBillet = (billetId: string) => {
    alert(`Transfert du billet ${billetId} en cours...`);
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>🎟️ Mes Billets</Typography>

      {billets.length > 0 ? (
        <Grid container spacing={3}>
          {billets.map((billet) => (
            <Grid item xs={12} sm={6} md={4} key={billet.id}>
              <Card 
                sx={{ 
                  maxWidth: 345, 
                  borderRadius: 2, 
                  boxShadow: 3, 
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": { transform: "scale(1.05)" } // Effet de zoom au survol
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={billet.image}
                  alt="Concert"
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    🎫 Billet ID: {billet.id}
                  </Typography>
                  <Typography variant="body1">
                    🎵 Concert ID: {billet.concertId}
                  </Typography>
                  <Chip
                    label={billet.estUtilise ? "✅ Utilisé" : "❌ Non utilisé"}
                    color={billet.estUtilise ? "success" : "warning"}
                    sx={{ mt: 2 }}
                  />
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    sx={{ mt: 2, width: "100%" }} 
                    onClick={() => handleTransferBillet(billet.id)}
                  >
                    🔄 Transférer le billet
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" color="text.secondary">
          Aucun billet disponible.
        </Typography>
      )}
    </div>
  );
};

export default MesBillets;
