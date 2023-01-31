import { createSlice } from "@reduxjs/toolkit";
import { AddressProps } from "../../../@types";

const initialState: AddressProps = {
  address_components: [],
  formatted_address: "",
  geometry: {
    location: {
      lat: 0,
      lng: 0,
    },
  },
  place_id: "",
};

export const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    setCurrentAddress: (state, { payload }) => {
      return {
        ...state,
        address_components: payload.address_components,
        place_id: payload.place_id,
        formatted_address: payload.formatted_address,
        geometry: payload.geometry,
      };
    },
  },
});

export const { setCurrentAddress } = geolocationSlice.actions;

export default geolocationSlice.reducer;
