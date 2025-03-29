export class Concert {
  constructor(
    public id: string,
    public title: string,
    public place: string,
    public image: string,
    public concertDate: string,
    public totalSeats: number,
    public availableSeats: number,
    public canceled: boolean,
    public createdAt: string,
    public price: number
  ) {}
}
