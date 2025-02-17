export class Billet {
    constructor(
      public id: string,
      public concertId: string,
      public acheteurId: string,
      public estUtilise: boolean
    ) {}
  }
  