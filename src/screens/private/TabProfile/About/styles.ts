import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { ms } from "react-native-size-matters";
import Logo from "../../../../assets/icons/logo-vertical.svg";

const widthDimensions = Dimensions.get("window").width;
const heightDimensions = Dimensions.get("window").height;

export const AboutContainer = styled(View)`
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
  margin-bottom: ${ms(10)}px;
`;

export const VersionText = styled(Text)`
  font-size: ${ms(17)}px;
  font-family: ${({ theme }) => theme.fonts.text300};
  color: ${({ theme }) => theme.colors.textWhite};
`;

export const BottomView = styled(View)`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  border-top-left-radius: ${widthDimensions / 2}px;
  border-top-right-radius: ${widthDimensions / 2}px;
  width: ${widthDimensions}px;
  height: ${widthDimensions}px;
  position: absolute;
  bottom: ${-(widthDimensions / 2)}px;
  padding: ${ms(40)}px ${ms(10)}px;
  align-items: center;
`;

export const PrivacyPoliceButton = styled(TouchableOpacity)`
  margin-bottom: ${ms(20)}px;
`;

export const PrivacyPolicyText = styled(Text)`
  font-size: ${ms(18)}px;
  font-family: ${({ theme }) => theme.fonts.text300};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.primary};
`;

export const Companies = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 85%;
`;

export const CompaniesLogo = styled(Image)`
  width: ${ms(140)}px;
  height: ${ms(80)}px;
  resize-mode: contain;
`;
