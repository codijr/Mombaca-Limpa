import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import SplashScreen from "react-native-splash-screen";
import { Platform, StatusBar } from "react-native";
import { theme } from "./global/styles/theme";
import { Routes } from "./routes";
import { Context } from "./contexts";
import { ReduxProvider } from "./redux";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    StatusBar.setBarStyle("light-content");
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(false);
    }
  });

  return (
    <ReduxProvider>
      <Context>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </Context>
    </ReduxProvider>
  );
}
