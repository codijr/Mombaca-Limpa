import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: "",
  latitude: 0,
  longitude: 0,
};

export const geocodingSlice = createSlice({
  name: "geocoding",
  initialState,
  reducers: {
    setAddress: (state, { payload }) => {
      return { ...state, payload };
    },
  },
});

export const { setAddress } = geocodingSlice.actions;

export default geocodingSlice.reducer;
