import axios from "axios";
import Config from "react-native-config";
import { AddressProps } from "../../@types/geocoding";

type ResponseSearchAddress = {
  results: AddressProps[];
  status: string;
};

export const geocoding = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/geocode/json",
});

export async function searchAddress(
  address: string
): Promise<ResponseSearchAddress> {
  const response = await geocoding.get("", {
    params: {
      address,
      key: Config.GOOGLE_MAPS_API_KEY,
    },
  });

  return response.data;
}

export async function searchAddressReverse(
  lat: number,
  lng: number
): Promise<ResponseSearchAddress> {
  const latlng = `${lat},${lng}`;

  const response = await geocoding.get("", {
    params: {
      latlng,
      key: Config.GOOGLE_MAPS_API_KEY,
    },
  });

  return response.data;
}
