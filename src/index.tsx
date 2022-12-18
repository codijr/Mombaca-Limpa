import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import SplashScreen from "react-native-splash-screen";
import { StatusBar } from "react-native";
import { theme } from "./global/styles/theme";
import { Routes } from "./routes";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("transparent");
    StatusBar.setTranslucent(false);
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
