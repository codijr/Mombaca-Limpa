import React, { useEffect } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import SplashScreen from "react-native-splash-screen";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function App() {
  Icon.loadFont();

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <View>
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </View>
  );
}
