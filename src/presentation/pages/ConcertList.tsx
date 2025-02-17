import React, { useEffect, useState } from "react";
import { ConcertService } from "../../application/services/ConcertService";
import { Concert } from "../../domain/entities/Concert";

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

  if (loading) return <p>Loading concerts...</p>;

  return (
    <div>
      <h1>Liste des Concerts</h1>
      {concerts.map((concert) => (
        <div key={concert.id}>
          <h2>{concert.title}</h2>
          <p>{concert.date} - {concert.location}</p>
        </div>
      ))}
    </div>
  );
};

export default ConcertList;
