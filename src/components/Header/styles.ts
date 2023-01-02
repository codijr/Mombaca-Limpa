import { Platform, Text, View } from "react-native";
import { ms } from "react-native-size-matters";
import styled from "styled-components";
import Icon from "react-native-vector-icons/Feather";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const HeaderContainer = styled(View)`
  width: 100%;
  height: ${ms(90)}px;
  padding-top: ${Platform.OS === "ios" ? getStatusBarHeight() : 0}px;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  flex-direction: row;
`;

export const HeaderLeft = styled(View)`
  width: 20%;
  height: 100%;
  justify-content: center;
  padding-left: ${ms(20)}px;
`;

export const HeaderCenter = styled(View)`
  width: 60%;
  height: 100%;
  justify-content: center;
`;

export const HeaderIcon = styled(Icon).attrs({
  size: ms(25),
  color: "#fff",
})``;

export const HeaderTitle = styled(Text)`
  font-size: ${RFValue(16)}px;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.title600};
  color: ${({ theme }) => theme.colors.textWhite};
`;
