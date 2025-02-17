import { Concert } from "../../domain/entities/Concert";
import concertsData from "../../fake-data/concerts.json";

export class ConcertAPI {
  static async getConcerts(): Promise<Concert[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(concertsData);
      }, 1000);
    });
  }
}
