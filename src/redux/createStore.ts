import { configureStore } from "@reduxjs/toolkit";
import geocodingReducer from "./modules/geocoding/reducer";
import geolocationReducer from "./modules/geolocation/reducer";

export const store = configureStore({
  reducer: {
    geocoding: geocodingReducer,
    geolocation: geolocationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
