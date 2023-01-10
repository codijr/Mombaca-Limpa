import { Dimensions, Platform, ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import { ms } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import Icon from "../../../assets/icons/icon.svg";
import Logo from "../../../assets/icons/logo-negative.svg";
import { Container } from "../../../global/styles/theme";

const widthDimensions = Dimensions.get("window").width;
const heightDimensions = Dimensions.get("window").height;

export const ContainerLogin = styled(Container)`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  padding-top: ${Platform.OS === "ios" ? getStatusBarHeight() : 0}px;
  height: ${heightDimensions}px;
`;

export const TopContent = styled(View)``;

export const IconBackground = styled(Icon).attrs({
  fill: "white",
  fillOpacity: 0.05,
  width: `${ms(heightDimensions * 0.75)}px`,
  height: heightDimensions,
})`
  position: absolute;
  left: 25%;
`;

export const LogoIcon = styled(Logo).attrs({
  fill: "white",
  width: `${ms(widthDimensions * 0.5)}px`,
  height: `${ms(widthDimensions * 0.5 * 0.33)}px`,
})`
  margin-bottom: ${ms(15)}px;
`;

export const LoginContent = styled(ScrollView)`
  flex: 1;
  /* background-color: ${({ theme }) => theme.colors.alert}; */
`;

export const Content = styled(View)`
  height: ${heightDimensions}px;
  padding-top: ${ms(20)}px;
  padding-bottom: ${ms(20)}px;
  flex-direction: column;
  justify-content: space-between;
`;

export const Title = styled(Text)`
  font-size: ${RFValue(30)}px;
  font-family: ${({ theme }) => theme.fonts.title600};
  color: ${({ theme }) => theme.colors.textWhite};
  margin-bottom: ${ms(15)}px;
`;

export const ForgotPasswordWrapper = styled(View)`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: ${ms(25)}px;
`;

export const ForgotPasswordText = styled(Text)`
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.text300};
  color: ${({ theme }) => theme.colors.textWhite};
`;

export const SignUpText = styled(ForgotPasswordText)``;

export const SignUpTextBold = styled(Text)`
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.text700};
  color: ${({ theme }) => theme.colors.textWhite};
`;
