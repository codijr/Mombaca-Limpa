import React, { useEffect } from "react";
import { Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function App() {
  Icon.loadFont();

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <View>
      <Text style={{ fontFamily: "LeagueSpartan-Bold" }}>Hello World</Text>
      <Icon name="alarm" size={20} color="#000000" />
    </View>
  );
}
