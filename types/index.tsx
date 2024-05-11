import { Place } from "../models/place";

export enum enumFeature {
  CAMERA = "CAMERA",
  LOCATION = "LOCATON",
}

export type TCoordinate = {
  latitude: number;
  longitude: number;
};

export type RootStackParamList = {
  favoritePlace: undefined;
  newPlace: { latitude: number; longitude: number };
  detailsPlace: { place: Place };
  mapView: { latitude: number; longitude: number } | undefined;
};
