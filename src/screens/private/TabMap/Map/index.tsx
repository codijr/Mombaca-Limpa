import React, { useCallback, useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Geolocation from "@react-native-community/geolocation";
import { LatLng, Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { ms } from "react-native-size-matters";
import {
  ButtonComplaint,
  ButtonComplaintText,
  ComplaintIcon,
  GeolocationIcon,
  IconsView,
  InfoText,
  InfoTitle,
  InfoView,
  MapContainer,
  MapContent,
} from "./styles";
import { SearchBar } from "./components/SearchBar";
import { Button } from "./components/Button";

import LocationIcon from "../../../../assets/icons/gps.png";
import PointerIcon from "../../../../assets/icons/pointer.png";
import { RootState } from "../../../../redux/createStore";
import { searchAddressReverse } from "../../../../services";
import { setAddress } from "../../../../redux/modules/geocoding/reducer";
import { CentralizeView } from "../../../../global/styles/theme";
import { AddressComponentProps } from "../../../../@types";

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
  const addressSelected = useSelector((state: RootState) => state.geocoding);
  const dispatch = useDispatch();

  const [currentRegion, setCurrentRegion] = useState({} as Region);
  const [region, setRegion] = useState({} as Region);
  const [selectedAddress, setSelectedAddress] = useState({} as Region);
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

  useEffect(() => {
    setSelectedAddress({
      latitude: addressSelected.geometry.location.lat,
      longitude: addressSelected.geometry.location.lng,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    });
  }, [addressSelected]);

  const handleRegionChange = useCallback(
    async (pointer: LatLng) => {
      const { latitude, longitude } = pointer;

      await searchAddressReverse(latitude, longitude).then((res) => {
        const { results } = res;
        dispatch(setAddress(results[0]));
      });
    },
    [dispatch]
  );

  const handleConcatTitle = useCallback(
    (address_components: AddressComponentProps[]) => {
      const title = {
        route: "",
        street_number: "S/N",
        sublocality: "",
      };

      address_components.forEach((value, index) => {
        value.types.includes("route") && (title.route = value.long_name);
        value.types.includes("street_number") &&
          (title.street_number = value.long_name);
        value.types.includes("administrative_area_level_4") ||
          (value.types.includes("sublocality") &&
            (title.sublocality = value.long_name));
      });

      return `${title.route}, ${title.street_number} - ${title.sublocality}`;
    },
    []
  );

  const handleConcatDescription = useCallback(
    (address_components: AddressComponentProps[]) => {
      const description = {
        city: "",
        state: "",
      };

      address_components.forEach((value) => {
        value.types.includes("administrative_area_level_2") &&
          (description.city = value.long_name);
        value.types.includes("administrative_area_level_1") &&
          (description.state = value.short_name);
      });

      return `${description.city} - ${description.state}`;
    },
    []
  );

  const handleNavigateToComplaint = useCallback(() => {
    navigate("Complaint" as never);
  }, []);

  return (
    <MapContainer>
      <MapContent
        initialRegion={region}
        region={region}
        onLongPress={(value) =>
          handleRegionChange(value.nativeEvent.coordinate)
        }
        onRegionChange={() => setIsActualPosition(false)}
        onRegionChangeComplete={(value) =>
          handleGestureChangeRegion(value as Region)
        }
      >
        <Marker coordinate={currentRegion} icon={LocationIcon} />
        {addressSelected.place_id && (
          <Marker coordinate={selectedAddress} icon={PointerIcon} />
        )}
      </MapContent>
      <IconsView>
        <Button
          onPress={() => navigate("Complaint" as never)}
          style={{
            marginBottom: ms(20),
          }}
        >
          <ComplaintIcon />
        </Button>

        <Button
          onPress={handleMoveToCurrentPosition}
          style={{
            marginBottom: ms(20),
          }}
        >
          <GeolocationIcon
            name={isActualPosition ? "crosshairs-gps" : "crosshairs"}
          />
        </Button>

        <CentralizeView>
          <InfoView>
            <InfoTitle>
              {handleConcatTitle(addressSelected.address_components)}
            </InfoTitle>
            <InfoText>
              {handleConcatDescription(addressSelected.address_components)}
            </InfoText>
            <ButtonComplaint>
              <ButtonComplaintText>Denunciar</ButtonComplaintText>
            </ButtonComplaint>
          </InfoView>
        </CentralizeView>
      </IconsView>
      <SearchBar />
    </MapContainer>
  );
}
