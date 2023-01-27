import Geolocation from "@react-native-community/geolocation";

Geolocation.watchPosition(
  (position) => {
    console.log(position);
  },
  (error) => console.log(error)
);
