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
  detailsPlace: undefined;
  mapView: undefined;
};
