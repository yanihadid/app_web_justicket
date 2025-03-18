import React, { useEffect, useState } from "react";
import { ConcertService } from "../../application/services/ConcertService";
import { Concert } from "../../domain/entities/Concert";
import { 
  Card, CardContent, Typography, Button, Grid, CardMedia, 
  CircularProgress, Container, Box 
} from "@mui/material";

const ConcertList = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; 

    const fetchConcerts = async () => {
      try {
        const data = await ConcertService.getAllConcerts();
        if (isMounted) {
          setConcerts(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError("Une erreur est survenue lors du chargement des concerts.");
          setLoading(false);
        }
      }
    };

    fetchConcerts();

    return () => { isMounted = false }; 
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        🎵 Liste des Concerts
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

      {!loading && !error && concerts.length === 0 && (
        <Typography textAlign="center" color="text.secondary">
          Aucun concert disponible pour le moment.
        </Typography>
      )}

      <Grid container spacing={3} mt={2}>
        {concerts.map((concert) => (
          <Grid item xs={12} sm={6} md={4} key={concert.id}>
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
                image={concert.image}
                alt={concert.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {concert.title}
                </Typography>
                <Typography color="text.secondary">
                  {concert.date} - {concert.location}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth
                  sx={{ marginTop: 2, borderRadius: 2 }}
                >
                  Acheter un billet 🎫
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ConcertList;
