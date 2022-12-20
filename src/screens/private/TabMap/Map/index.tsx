import React, { useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ComplaintIcon,
  GeolocationIcon,
  IconsView,
  MapContainer,
} from "./styles";
import { SearchBar } from "./components/SearchBar";
import { Button } from "./components/Button";

export function Map() {
  const navigation = useNavigation();

  const [region, setRegion] = useState({
    latitude: -23.5505,
    longitude: -46.6333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    navigation.addListener("focus", () => {
      StatusBar.setBarStyle("dark-content");
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor("transparent");
        StatusBar.setTranslucent(true);
      }
    });

    navigation.addListener("blur", () => {
      StatusBar.setBarStyle("light-content");
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor("#1BB471");
        StatusBar.setTranslucent(false);
      }
    });
  }, [navigation]);

  return (
    <>
      {/* <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      /> */}
      <MapContainer initialRegion={region} />
      <SearchBar />
      <IconsView>
        <Button>
          <ComplaintIcon />
        </Button>

        <Button>
          <GeolocationIcon />
        </Button>
      </IconsView>
    </>
  );
}
