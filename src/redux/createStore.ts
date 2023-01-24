import { configureStore } from "@reduxjs/toolkit";
import geocodingReducer from "./modules/geocoding/reducer";

export const store = configureStore({
  reducer: {
    geocoding: geocodingReducer,
  },
});
