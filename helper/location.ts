import { TCoordinate } from "../types";

const GOOGLE_API_KEY = "AIzaSyCEIijLDTUYhf88NmV5Zj4FH1wXIi2-mWc";

export function getMapPreview(lat: number, lon: number) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x300&maptype=roadmap
  &markers=color:red%7Clabel:S%7C${lat},${lon}
  &key=${GOOGLE_API_KEY}`;
}

export async function reverseGeoloacation({
  latitude,
  longitude,
}: TCoordinate) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch address!");
  const data = await response.json();
  const address: string = data.results[0].formatted_address;
  return address;
}

export function removeStartKey(str: string) {
  const addrSplit = str.split(",");
  const newAddress = addrSplit.splice(1, 2).join(",").trim();
  return newAddress;
}
