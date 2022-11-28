import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import SplashScreen from "react-native-splash-screen";
import { theme } from "./global/styles/theme";
import { Routes } from "./routes";

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
