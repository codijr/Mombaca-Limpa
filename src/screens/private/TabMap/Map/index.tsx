import React, { useCallback, useEffect, useState } from "react";
import { Platform, StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { LatLng, Marker, Region } from "react-native-maps";
import { ms } from "react-native-size-matters";
import Config from "react-native-config";
import MapViewDirections from "react-native-maps-directions";
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
} from "./styles";
import { SearchBar } from "./components/SearchBar";
import { Button } from "./components/Button";

import LocationIcon from "../../../../assets/icons/gps.png";
import PointerIcon from "../../../../assets/icons/pointer.png";
import TrashCardIcon from "../../../../assets/icons/trashcar.png";
import { searchAddressReverse } from "../../../../services";
import { CentralizeView } from "../../../../global/styles/theme";
import { concatAddressSubtitle, concatAddressTitle } from "../../../../utils";
import { useMap } from "../../../../contexts";

export function Map() {
  const { navigate, addListener } = useNavigation();
  const { geolocation, selectedAddress, setSelectedAddress } = useMap();

  const [currentRegion, setCurrentRegion] = useState<Region>(geolocation);
  const [selectedAddressRegion, setSelectedAddressRegion] = useState<Region>({
    ...currentRegion,
    latitude: selectedAddress?.geometry.location.lat,
    longitude: selectedAddress?.geometry.location.lng,
  });
  const [isActualPosition, setIsActualPosition] = useState(true);

  useEffect(() => {
    addListener("focus", () => {
      StatusBar.setBarStyle("dark-content");
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor("transparent");
        StatusBar.setTranslucent(true);
      }
    });

    addListener("blur", () => {
      StatusBar.setBarStyle("light-content");
      if (Platform.OS === "android") {
        StatusBar.setBackgroundColor("#1BB471");
        StatusBar.setTranslucent(false);
      }
    });
  }, [addListener]);

  const handleMoveToCurrentPosition = useCallback(() => {
    setCurrentRegion(geolocation);
    setIsActualPosition(true);
  }, [geolocation]);

  const handleSelectAddress = useCallback(
    async (coordinates: LatLng) => {
      await searchAddressReverse(
        coordinates.latitude,
        coordinates.longitude
      ).then((res) => {
        const { results } = res;
        setSelectedAddress(results[0]);
        setSelectedAddressRegion({
          ...currentRegion,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        });
        setCurrentRegion({
          ...currentRegion,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        });
      });
    },
    [currentRegion, setSelectedAddress]
  );

  return (
    <MapContainer>
      <MapView
        initialRegion={geolocation}
        region={currentRegion}
        rotateEnabled={false}
        onLongPress={(value) =>
          handleSelectAddress(value.nativeEvent.coordinate)
        }
        onRegionChange={() => setIsActualPosition(false)}
        onRegionChangeComplete={(value) => setCurrentRegion(value as Region)}
        style={{
          flex: 1,
        }}
      >
        <Marker coordinate={geolocation} icon={LocationIcon} />
        {selectedAddress.place_id && (
          <Marker coordinate={selectedAddressRegion} icon={PointerIcon} />
        )}
      </MapView>
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

        {selectedAddress.place_id && (
          <CentralizeView>
            <InfoView>
              <InfoTitle>
                {concatAddressTitle(selectedAddress.address_components)}
              </InfoTitle>
              <InfoText>
                {concatAddressSubtitle(selectedAddress.address_components)}
              </InfoText>
              <ButtonComplaint
                onPress={() =>
                  navigate(
                    "Complaint" as never,
                    selectedAddress.formatted_address as never,
                  )
                }
              >
                <ButtonComplaintText>Denunciar</ButtonComplaintText>
              </ButtonComplaint>
            </InfoView>
          </CentralizeView>
        )}
      </IconsView>
      <SearchBar />
    </MapContainer>
  );
}
