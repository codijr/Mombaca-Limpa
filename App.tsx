import React, { useEffect } from "react";
import { Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <View>
      <Text style={{ fontFamily: "LeagueSpartan-Bold" }}>Hello World</Text>
    </View>
  );
}
