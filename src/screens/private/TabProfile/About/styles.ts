import {
  Dimensions,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import { ms } from "react-native-size-matters";
import Logo from "../../../../assets/icons/logo-vertical.svg";

const widthDimensions = Dimensions.get("window").width;
const heightDimensions = Dimensions.get("window").height;

export const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: column;
  align-items: center;
`;

export const LogoVertical = styled(Logo).attrs({
  fill: "white",
  width: `${ms(widthDimensions * 0.55)}px`,
})`
  margin-top: ${ms(heightDimensions * 0.15)}px;
  margin-bottom: ${ms(2)}px;
`;

export const VersionText = styled(Text)`
  font-size: ${ms(17)}px;
  font-family: ${({ theme }) => theme.fonts.text300};
  color: ${({ theme }) => theme.colors.white};
`;

export const BottomView = styled(View)`
  flex: 1;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  border-top-left-radius: ${ms(widthDimensions)}px;
  border-top-right-radius: ${ms(widthDimensions)}px;
  width: ${ms(widthDimensions * 0.95)}px;
  height: ${ms(heightDimensions * 0.3)}px;
  position: absolute;
  bottom: -50;
  padding: ${ms(40)}px ${ms(10)}px;
  align-items: center;
`;

export const PrivacyPoliceButton = styled(TouchableOpacity)``;

export const PrivacyPolicyText = styled(Text)`
  font-size: ${ms(18)}px;
  font-family: ${({ theme }) => theme.fonts.text300};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
`;

export const Companies = styled(View)`
  flex-direction: row;
  margin-top: ${ms(30)}px;
  align-items: center;
`;
