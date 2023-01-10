import { Dimensions, TextInput, View } from "react-native";
import MapView from "react-native-maps";
import { ms } from "react-native-size-matters";
import styled from "styled-components";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

const { height } = Dimensions.get("screen");

export const MapContainer = styled(View)`
  flex: 1;
`;

export const MapContent = styled(MapView)`
  height: ${height}px;
`;

export const IconsView = styled(View)`
  position: absolute;
  bottom: ${ms(60)}px;
  right: ${ms(20)}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: ${ms(120)}px;
`;

export const ComplaintIcon = styled(FeatherIcon).attrs({
  name: "alert-triangle",
  size: ms(25),
  color: "#DF1B1B",
})``;

export const GeolocationIcon = styled(MaterialIcon).attrs({
  name: "crosshairs-gps",
  size: ms(25),
  color: "#1BB471",
})``;
