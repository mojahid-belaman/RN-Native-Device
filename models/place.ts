type Tlocation = {
  lat: number;
  lng: number;
};

class Place {
  id: string;
  title: string;
  image: string;
  address: string;
  location: Tlocation;

  constructor(
    title: string,
    image: string,
    address: string,
    location: Tlocation
  ) {
    this.id = new Date().toString() + Math.random();
    this.title = title;
    this.image = image;
    this.address = address;
    this.location = location;
  }
}
