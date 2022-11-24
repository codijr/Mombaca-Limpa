import React, { useEffect } from "react";
import { Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <View>
      <Text>Hello World</Text>
    </View>
  );
}
