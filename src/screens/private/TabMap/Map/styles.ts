import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";
import { ms } from "react-native-size-matters";
import styled from "styled-components";
import FeatherIcon from "react-native-vector-icons/Feather";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Container } from "../../../../global/styles/theme";

const { height, width } = Dimensions.get("screen");

export const MapContainer = styled(View)`
  flex: 1;
`;

export const IconsView = styled(View)`
  position: absolute;
  bottom: 0;
  right: ${ms(20)}px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ComplaintIcon = styled(FeatherIcon).attrs({
  name: "alert-triangle",
  size: ms(25),
  color: "#DF1B1B",
})``;

export const GeolocationIcon = styled(MaterialIcon).attrs({
  size: ms(25),
  color: "#1BB471",
})``;

export const InfoView = styled(View)`
  width: ${width - ms(40)}px;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  border-top-left-radius: ${ms(20)}px;
  border-top-right-radius: ${ms(20)}px;
  elevation: 5;
  padding: ${ms(10)}px ${ms(20)}px;
`;

export const InfoTitle = styled(Text)`
  font-size: ${ms(16)}px;
  font-family: ${({ theme }) => theme.fonts.title600};
  color: ${({ theme }) => theme.colors.text};
`;

export const InfoText = styled(Text)`
  font-size: ${ms(14)}px;
  font-family: ${({ theme }) => theme.fonts.text400};
  color: ${({ theme }) => theme.colors.textGray};
  margin-bottom: ${ms(10)}px;
`;

export const ButtonComplaint = styled(TouchableOpacity)`
  width: 40%;
  height: ${ms(40)}px;
  background-color: ${({ theme }) => theme.colors.alert};
  border-radius: ${ms(30)}px;
  align-items: center;
  justify-content: center;
`;

export const ButtonComplaintText = styled(Text)`
  font-size: ${ms(12)}px;
  font-family: ${({ theme }) => theme.fonts.title600};
  color: ${({ theme }) => theme.colors.textWhite};
  text-align: center;
`;
