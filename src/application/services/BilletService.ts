import { BilletAPI } from "../../adapters/api/BilletAPI";
import { Billet } from "../../domain/entities/Billet";

export class BilletService {
  static async getBilletsByUser(userId: string): Promise<Billet[]> {
    return await BilletAPI.getBilletsByUser(userId);
  }

  static async acheterBillet(concertId: string, userId: string): Promise<Billet> {
    return await BilletAPI.acheterBillet(concertId, userId);
  }
}
