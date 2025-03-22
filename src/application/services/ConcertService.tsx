import { ConcertAPI } from "../../adapters/api/ConcertAPI";
import { Concert } from "../../domain/entities/Concert";

export class ConcertService {
  static async getAllConcerts(): Promise<Concert[]> {
    return await ConcertAPI.getConcerts();
  }
  static async createConcert(data: {
    title: string;
    place: string;
    concert_date: Date;
    total_seats: number;
    image: string;
  }) {
    return await ConcertAPI.createConcert(data);
  }
}
