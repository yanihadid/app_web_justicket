import React, { useEffect, useState } from "react";
import { Billet } from "../../domain/entities/Billet";
import { Concert } from "../../domain/entities/Concert";
import { BilletService } from "../../application/services/BilletService";
import { ConcertService } from "../../application/services/ConcertService";
import {
  Card, CardContent, Typography, Grid, Box,
  CircularProgress, Chip, Button, Container
} from "@mui/material";

interface BilletAvecConcert extends Billet {
  concertName: string;
  concertDate: string;
  concertLocation: string;
}
const MesBillets = () => {
  const [billets, setBillets] = useState<BilletAvecConcert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchBillets = async () => {
      try {
        const userId = sessionStorage.getItem("userId");
        if (!userId) throw new Error("Utilisateur non connecté");
        const billetsRaw = await BilletService.getBilletsByUser(userId);
        const billetsEnrichis = await Promise.all(
          billetsRaw.map(async (billet) => {
            try {
              const concert: Concert = await ConcertService.getConcertById(billet.concertId);
              return {
                ...billet,
                concertName: concert.title,
                concertDate: concert.concertDate,
                concertLocation: concert.place,
              };
            } catch {
              return {
                ...billet,
                concertName: "Concert inconnu",
                concertDate: "",
                concertLocation: "Lieu inconnu",
              };
            }
          })
        );

        if (isMounted) {
          setBillets(billetsEnrichis);
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
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {billet.concertName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                 {new Date(billet.concertDate).toLocaleDateString()} - {billet.concertLocation}
                </Typography>
                <Typography variant="body2">
                 Acheté le : {new Date(billet.createdAt).toLocaleDateString()}
                </Typography>
                <Chip
                  label={
                    billet.used ? "Utilisé" :
                    billet.repayed ? "Remboursé" :
                    billet.canceled ? "Annulé" :
                    billet.expired ? "Expiré" :
                    "Valide"
                  }
                  color={
                    billet.used ? "success" :
                    billet.repayed || billet.canceled || billet.expired ? "error" :
                    "warning"
                  }
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
