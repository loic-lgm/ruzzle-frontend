export type City = {
  id: string;
  name: string;
  postal_code: string;
  latitude: number;
  longitude: number;
};

export interface CityFilterValue {
  latitude: number;
  longitude: number;
  radius: number;
}

interface Feature {
  type: string;
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
  properties: {
    label: string;
    citycode: string;
    postcode: string;
  };
}

export interface GouvApiResponse {
  type: string;
  features: Feature[];
}

export type Cities = City[];
