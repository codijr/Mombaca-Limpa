import { Dimensions, ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import { ms } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";
import { Container } from "../../../../global/styles/theme";

const widthDimensions = Dimensions.get("window").width;
const heightDimensions = Dimensions.get("window").height;

export const ContainerChangeEmail = styled(Container)`
  background-color: ${({ theme }) => theme.colors.background};
  height: ${heightDimensions}px;
`;

export const TopContent = styled(View)``;

export const ChangeEmailContent = styled(View)`
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

