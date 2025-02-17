import { ConcertAPI } from "../../adapters/api/ConcertAPI";
import { Concert } from "../../domain/entities/Concert";

export class ConcertService {
  static async getAllConcerts(): Promise<Concert[]> {
    return await ConcertAPI.getConcerts();
  }
}
