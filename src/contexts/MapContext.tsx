import React, { ReactNode, useEffect } from "react";
import { Region } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { AddressProps } from "../@types";

export type MapContextData = {
  selectedAddress: AddressProps;
  setSelectedAddress: (address: AddressProps) => void;
  geolocation: Region;
  setGeolocation: (region: Region) => void;
};

type MapContextProviderProps = {
  children: ReactNode;
};

export const MapContext = React.createContext({} as MapContextData);

export function MapContextProvider({ children }: MapContextProviderProps) {
  const [selectedAddress, setSelectedAddress] = React.useState<AddressProps>({
    address_components: [],
    formatted_address: "",
    geometry: {
      location: {
        lat: 0,
        lng: 0,
      },
    },
    place_id: "",
  });
  const [geolocation, setGeolocation] = React.useState<Region>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.01432432,
    longitudeDelta: 0.01343434,
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeolocation((prevState) => ({
          ...prevState,
          latitude,
          longitude,
        }));
      },
      (error) => {
        console.log(error.code, error.message);
      }
    );
  }, []);

  return (
    <MapContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        selectedAddress,
        setSelectedAddress,
        geolocation,
        setGeolocation,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}

export function useMap() {
  const context = React.useContext(MapContext);

  return context;
}
