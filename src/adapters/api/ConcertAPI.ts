import axios from "axios";
import { Concert } from "../../domain/entities/Concert";
import concertsData from "../../fake-data/concerts.json";

const API_BASE_URL = "http://localhost:3031";

export class ConcertAPI {
  static async getConcerts(): Promise<Concert[]> {
    const response = await axios.get(`${API_BASE_URL}/concert/concerts`);
    return response.data;
  }
  
  
  static async createConcert(data: {
    title: string;
    place: string;
    concert_date: Date;
    total_seats: number;
    image: string; 
  }) {
    const randomSeed = Math.floor(Math.random() * 10000);
    const randomImage = `https://picsum.photos/seed/concert${randomSeed}/800/600`;
    const imageUrl = data.image || randomImage;
    const params = new URLSearchParams({
      title: data.title,
      place: data.place,
      image: imageUrl,
      concertDate: data.concert_date.toISOString(),
      totalSeats: data.total_seats.toString()
    });
  
    return await axios.post(`${API_BASE_URL}/concert/add?${params.toString()}`);
  }
  static async getConcertById(id: string): Promise<Concert> {
    const response = await axios.get(`${API_BASE_URL}/concert/${id}`);
    return response.data;
  }
  
}
