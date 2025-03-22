import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ConcertService } from "../../application/services/ConcertService";

const ConcertForm = () => {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [concertDate, setConcertDate] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await ConcertService.createConcert({
        title,
        place,
        concert_date: new Date(concertDate),
        total_seats: totalSeats,
      });

      alert("Concert ajouté avec succès !");
      navigate("/concerts");
    } catch (error) {
      console.error("Erreur lors de l'ajout du concert :", error);
      alert("Erreur lors de la création du concert.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        🎤 Ajouter un Concert
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <TextField
          label="Titre"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Lieu"
          fullWidth
          required
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          margin="normal"
        />

        <TextField
          label="Date du concert"
          type="date"
          fullWidth
          required
          value={concertDate}
          onChange={(e) => setConcertDate(e.target.value)}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Nombre total de places"
          type="number"
          fullWidth
          required
          value={totalSeats}
          onChange={(e) => setTotalSeats(Number(e.target.value))}
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
          Créer le concert
        </Button>
      </Box>
    </Container>
  );
};

export default ConcertForm;
