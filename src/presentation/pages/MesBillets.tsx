import React, { useEffect, useState } from "react";
import { BilletService } from "../../application/services/BilletService";
import { Billet } from "../../domain/entities/Billet";
import { 
  Card, CardContent, Typography, Grid, Box, 
  CircularProgress, Chip, Button, CardMedia, Container 
} from "@mui/material";

const MesBillets = () => {
  const [billets, setBillets] = useState<Billet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = "user123"; 
  useEffect(() => {
    let isMounted = true; 
    const fetchBillets = async () => {
      try {
        const data = await BilletService.getBilletsByUser(userId);
        if (isMounted) {
          setBillets(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("Une erreur est survenue lors du chargement des billets.");
          setLoading(false);
        }
      }
    };

    fetchBillets();

    return () => { isMounted = false }; 
  }, []);

  const handleTransferBillet = (billetId: string) => {
    alert(`Transfert du billet ${billetId} en cours...`);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        🎟️ Mes Billets
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}

      {!loading && !error && billets.length === 0 && (
        <Typography textAlign="center" color="text.secondary">
          Aucun billet disponible.
        </Typography>
      )}

      <Grid container spacing={3} mt={2}>
        {billets.map((billet) => (
          <Grid item xs={12} sm={6} md={4} key={billet.id}>
            <Card 
              sx={{ 
                maxWidth: 345, 
                borderRadius: 2, 
                boxShadow: 3, 
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" } 
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={billet.image}
                alt="Concert"
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
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
                  fullWidth
                  sx={{ mt: 2, borderRadius: 2 }}
                  onClick={() => handleTransferBillet(billet.id)}
                >
                  🔄 Transférer le billet
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MesBillets;
