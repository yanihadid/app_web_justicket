import React, { useEffect, useState } from "react";
import { ConcertService } from "../../application/services/ConcertService";
import { Concert } from "../../domain/entities/Concert";
import { 
  Card, CardContent, Typography, Button, Grid, CardMedia, 
  CircularProgress, Container, Box 
} from "@mui/material";
import { Link } from "react-router-dom";
import { BilletService } from "../../application/services/BilletService";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Billet } from "../../domain/entities/Billet";

function getUserRoleFromToken(): string | null {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log("Rôle dans le token :", payload.role);
    return payload.role || null;
  } catch (e) {
    console.error("Erreur de décodage du token :", e);
    return null;
  }
}

const hasTicketForConcert = async (concertId: string, userId: string): Promise<boolean> => {
  try {
    const billets: Billet[] = await BilletService.getBilletsByUser(userId);
    return billets.some((b) => b.concertId === concertId);
  } catch (error) {
    console.error("Erreur lors de la vérification des billets :", error);
    return false; // en cas d'erreur, on laisse passer
  }
};

const ConcertList = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const role = getUserRoleFromToken();
  const isLoggedIn = !!sessionStorage.getItem("token");

  useEffect(() => {
    let isMounted = true;

    const fetchConcerts = async () => {
      try {
        const data = await ConcertService.getAllConcerts();
        const filteredConcerts = data.filter((concert) => !concert.canceled); 
        if (isMounted) {
          setConcerts(filteredConcerts);
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

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    ConcertService.getAllConcerts().then(setConcerts);
  }, []);

  const handleBuyTicket = async (concertId: string) => {
    const userId = sessionStorage.getItem("userId"); // ou sessionStorage si tu l’as déplacé
    if (!userId) {
      alert("Vous devez être connecté pour acheter un billet !");
      return;
    }
    const alreadyHasTicket = await hasTicketForConcert(concertId, userId);
    if (alreadyHasTicket) {
      alert("Vous avez déjà un billet pour ce concert !");
      return;
    }
    try {
      const billet = await BilletService.acheterBillet(concertId, userId);
      await axios.post(`http://localhost:3031/concert/decreaseAvailableSeats/${concertId}`);
      alert("Billet ajouté au panier, vous pouvez le payer dans la rubrique MES BILLETS!");
      navigate('/billets');
    } catch (error) {
      console.error("Erreur lors de l'achat du billet :", error);
      alert("Erreur lors de l'achat du billet");
    }
  };

const handleDelete = async (id: string) => {
  if (window.confirm("Supprimer ce concert ?")) {
    try {
      await ConcertService.deleteConcert(id);
      // Met à jour la liste sans le concert supprimé :
      setConcerts(prevConcerts => prevConcerts.filter(c => c.id !== id));
      alert("Concert supprimé !");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Erreur lors de la suppression.");
    }
  }
};


  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom textAlign="center">
        
        </Typography>
        <Typography 
          variant="h4" 
          align="center" 
          sx={{ color: "white" }}
        >
          Liste des Concerts
        </Typography>
        {role?.toLowerCase() === "admin" && (
        <Button variant="contained" component={Link} to="/concerts/new" sx={{ mr: 4 }} >
          Ajouter un concert
        </Button>
        )}
      </Box>

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
                "&:hover": { transform: "scale(1.05)" },
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
                  {new Date(concert.concertDate).toLocaleDateString()} - {concert.place}
                </Typography>
                <Typography color="text.secondary">
                  {concert.availableSeats} places 
                </Typography>
                <Typography color="text.secondary">
                  {concert.price} €
                </Typography>
                {isLoggedIn && (
              <>
                {concert.availableSeats === 0 ? (
                  <>
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                    Malheureusement, il n'y a plus de tickets
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      sx={{ marginTop: 1, borderRadius: 2 }}
                      disabled
                    >
                      Complet 🎫
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2, borderRadius: 2 }}
                    onClick={() => handleBuyTicket(concert.id)}
                  >
                    Acheter un billet 🎫
                  </Button>
                )}
              </>
            )}
              {role === "Admin" && (
                <Button
                id = "btn_supp"
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(concert.id)}
                >
                  Supprimer
                </Button>
              )}

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ConcertList;