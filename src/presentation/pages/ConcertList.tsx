import React, { useEffect, useState } from "react";
import { ConcertService } from "../../application/services/ConcertService";
import { Concert } from "../../domain/entities/Concert";
import { BilletService } from "../../application/services/BilletService";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";

const ConcertList = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConcerts = async () => {
      const data = await ConcertService.getAllConcerts();
      setConcerts(data);
      setLoading(false);
    };
    fetchConcerts();
  }, []);

  const handleAcheterBillet = async (concertId: string) => {
    const userId = "user123"; // ID simulé
    const billet = await BilletService.acheterBillet(concertId, userId);
    alert(`Billet acheté ! ID : ${billet.id}`);
  };

  if (loading) return <p>Loading concerts...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>🎵 Liste des Concerts</Typography>
      <Grid container spacing={3}>
        {concerts.map((concert) => (
          <Grid item xs={12} sm={6} md={4} key={concert.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography variant="h5">{concert.title}</Typography>
                <Typography color="text.secondary">{concert.date} - {concert.location}</Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  sx={{ marginTop: 2 }}
                  onClick={() => handleAcheterBillet(concert.id)}
                >
                  Acheter un billet 🎫
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ConcertList;
