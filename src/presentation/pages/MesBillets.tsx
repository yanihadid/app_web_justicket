import React, { useEffect, useState } from "react";
import { Billet } from "../../domain/entities/Billet";
import billetsData from "../../fake-data/billets.json";
import {
  Card, CardContent, Typography, Grid, Box,
  CircularProgress, Chip, Button, Container
} from "@mui/material";

const MesBillets = () => {
  const [billets, setBillets] = useState<Billet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = "user123"; // Simulé pour filtrer les billets appartenant à cet utilisateur

  useEffect(() => {
    let isMounted = true;
    const fetchBillets = async () => {
      try {
        // Simuler un chargement avec des données locales
        const data: Billet[] = (billetsData as any[]).map((b) => ({
            ...b,
            createdAt: new Date(b.createdAt)
          })).filter((b) => b.ownerId === userId);
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
    return () => { isMounted = false; };
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
          <Grid item xs={12} sm={6} md={4} key={billet.ticketId}>
            <Card sx={{
              maxWidth: 345,
              borderRadius: 2,
              boxShadow: 3,
              transition: "transform 0.3s ease-in-out",
              "&:hover": { transform: "scale(1.05)" }
            }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  Concert  {billet.concertId}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {new Date(billet.createdAt).toLocaleDateString()} - Lille
                </Typography>
                {/* <Typography variant="body1">
                  🎵 Date  : {billet.concertId}
                </Typography> 
                Pour le future je vais afficher le titre du concert ensuite le lieu avec la date du cocert et ensuite la date d'achat*/} 
                <Typography variant="body2">
                  🕒 Acheté le : {new Date(billet.createdAt).toLocaleDateString()}
                </Typography>
                <Chip
                  label={billet.used ? "Utilisé" : "Non utilisé"}
                  color={billet.used ? "success" : "warning"}
                  sx={{ mt: 2 }}
                />
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ mt: 2, borderRadius: 2 }}
                  onClick={() => alert("Paiement à venir...")}
                >
                  💳 Payer le billet
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, borderRadius: 2 }}
                  onClick={() => handleTransferBillet(billet.ticketId)}
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
