import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ConcertService } from "../../application/services/ConcertService";
import '../../App.tsx';

const ConcertForm = () => {
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [concertDate, setConcertDate] = useState("");
  const [totalSeats, setTotalSeats] = useState(0);
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDate = new Date(concertDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (selectedDate < today) {
    alert("La date du concert ne peut pas être antérieure à aujourd'hui !");
    return;
  }

    try {
      await ConcertService.createConcert({
        title,
        place,
        price: parseFloat(price), 
        concert_date: new Date(concertDate),
        total_seats: totalSeats,
        image, 
      });

      alert("Le concert est ajouté avec succès, vous pouvez le voir dans la liste !");
      navigate("/concerts");
    } catch (error) {
      console.error("Erreur lors de l'ajout du concert :", error);
      alert("Veuillez introduire tous les champs, ou bien le concert existe déjà.");
    }
  };


  

  return (
    <Box className="background">
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        sx={{ color: "white" }}
      >
        Créez un concert
      </Typography>
      <Container maxWidth="sm" sx={{ mt: 4 , mb : 10, bgcolor:"white", p: 4,
  borderRadius: 4,
  boxShadow: 5,
  backdropFilter: "blur(10px)", }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }} autoComplete="off">
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
            label="Prix (€)"
            type="number"
            fullWidth
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            margin="normal"
            inputProps={{ step: "0.01", min: "0" }} // optionnel : deux décimales
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

          <TextField
            label="URL de l'image"
            type="url"
            fullWidth
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
            margin="normal"
          />

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 , mb : 3}}>
            Créer le concert
          </Button>          

        </Box>
      </Container>
    </Box>
  );
};

export default ConcertForm;
