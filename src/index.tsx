import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import SplashScreen from "react-native-splash-screen";
import { Platform, StatusBar } from "react-native";
import { theme } from "./global/styles/theme";
import { Routes } from "./routes";
import { AuthContextProvider } from "./contexts/AuthContext";

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
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </ThemeProvider>
  );
}
