import axios from "axios";
import { Billet } from "../../domain/entities/Billet";

const API_BASE_URL = "http://localhost:3030";

export class BilletAPI {
  static async acheterBillet(concertId: string, userId: string): Promise<Billet> {
    const token = sessionStorage.getItem("token"); 

    const response = await axios.post(
      `${API_BASE_URL}/tickets/purchase`,
      { concertId, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
  static async getBilletsByUser(userId: string): Promise<Billet[]> {
    const response = await axios.get(`${API_BASE_URL}/tickets/user/${userId}`);
    return response.data;
  }  
}
