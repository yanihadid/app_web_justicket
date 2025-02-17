import { Billet } from "../../domain/entities/Billet";
import billetsData from "../../fake-data/billets.json";

export class BilletAPI {
  static async getBilletsByUser(userId: string): Promise<Billet[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(billetsData.filter((billet) => billet.acheteurId === userId));
      }, 1000); // Simule un délai API
    });
  }

  static async acheterBillet(concertId: string, userId: string): Promise<Billet> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBillet = new Billet(`b${Date.now()}`, concertId, userId, false);
        resolve(newBillet);
      }, 1000);
    });
  }
}
