import React, { useCallback, useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import { Marker } from "react-native-maps";
import {
  ComplaintIcon,
  GeolocationIcon,
  IconsView,
  MapContainer,
  MapContent,
} from "./styles";
import { SearchBar } from "./components/SearchBar";
import { Button } from "./components/Button";

import LocationIcon from "../../../../assets/icons/gps.png";

type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const { getCurrentPosition } = Geolocation;

export function Map() {
  const navigation = useNavigation();
  const { navigate } = useNavigation();

  const [currentRegion, setCurrentRegion] = useState({} as Region);
  const [region, setRegion] = useState({} as Region);
  const [isActualPosition, setIsActualPosition] = useState(true);

  useEffect(() => {
    getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      });
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      });
    });
  }, []);

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

  const handleGestureChangeRegion = useCallback(
    ({ latitude, longitude, latitudeDelta, longitudeDelta }: Region) => {
      setRegion({
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      });
    },
    []
  );

  const handleMoveToCurrentPosition = useCallback(() => {
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitude: currentRegion.latitude,
      longitude: currentRegion.longitude,
    }));
    setIsActualPosition(true);
  }, [currentRegion]);

  return (
    <MapContainer>
      <MapContent
        initialRegion={region}
        region={region}
        onRegionChange={() => setIsActualPosition(false)}
        onRegionChangeComplete={(value) =>
          handleGestureChangeRegion(value as Region)
        }
      >
        <Marker coordinate={currentRegion} icon={LocationIcon} />
      </MapContent>
      <SearchBar />
      <IconsView>
        <Button onPress={() => navigate("Complaint" as never)}>
          <ComplaintIcon />
        </Button>

        <Button onPress={handleMoveToCurrentPosition}>
          <GeolocationIcon
            name={isActualPosition ? "crosshairs-gps" : "crosshairs"}
          />
        </Button>
      </IconsView>
    </MapContainer>
  );
}
