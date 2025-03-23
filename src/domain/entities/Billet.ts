export class Billet {
    constructor(
      public ticketId: string,
      public concertId: string,
      public ownerId: string,
      public expired: boolean,
      public used: boolean,
      public repayed: boolean,
      public canceled: boolean,
      public createdAt: Date 
    ) {}
  }
  