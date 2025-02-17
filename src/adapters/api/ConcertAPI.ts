import { Concert } from "../../domain/entities/Concert";
import concertsData from "../../fake-data/concerts.json"; // Import fake data

export class ConcertAPI {
  static async getConcerts(): Promise<Concert[]> {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(concertsData);
      }, 1000); // Simulating a 1-second delay
    });
  }
}
