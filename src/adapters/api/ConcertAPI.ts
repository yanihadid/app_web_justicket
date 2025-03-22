import axios from "axios";
import { Concert } from "../../domain/entities/Concert";
import concertsData from "../../fake-data/concerts.json";

const API_BASE_URL = "http://localhost:3031";

export class ConcertAPI {
  static async getConcerts(): Promise<Concert[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(concertsData);
      }, 1000);
    });
  }
  
  static async createConcert(data: {
    title: string;
    place: string;
    concert_date: Date;
    total_seats: number;
  }) {
    return await axios.post(`${API_BASE_URL}/concert`, data);
  }
}
