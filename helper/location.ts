const GOOGLE_API_KEY = "AIzaSyCEIijLDTUYhf88NmV5Zj4FH1wXIi2-mWc";

export function getMapPreview(lat: number, lon: number) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lon}&zoom=14&size=400x300&maptype=roadmap
  &markers=color:red%7Clabel:S%7C${lat},${lon}
  &key=${GOOGLE_API_KEY}`;
}
