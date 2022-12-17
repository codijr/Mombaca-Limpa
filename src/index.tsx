import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import SplashScreen from "react-native-splash-screen";
import { StatusBar } from "react-native";
import { theme } from "./global/styles/theme";
import { Routes } from "./routes";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor="#1BB471" />
      <Routes />
    </ThemeProvider>
  );
}
