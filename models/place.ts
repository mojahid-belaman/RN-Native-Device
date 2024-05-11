import { TCoordinate } from "../types";

export class Place {
  id: string;
  title: string;
  image: string;
  address: string;
  location: TCoordinate;

  constructor(
    title: string,
    image: string,
    address: string,
    location: TCoordinate
  ) {
    this.id = new Date().toString() + Math.random();
    this.title = title;
    this.image = image;
    this.address = address;
    this.location = location;
  }
}
