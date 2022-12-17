import { Dimensions, ScrollView, Text, Touchable, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import { ms } from "react-native-size-matters";
import { Container } from "../../../../global/styles/theme";
import { RFValue } from "react-native-responsive-fontsize";

const heightDimensions = Dimensions.get("window").height;

export const ContainerProfile = styled(Container)`
  background-color: ${({ theme }) => theme.colors.background};
  height: ${heightDimensions}px;
  padding: ${ms(0)}px;
`;

export const ProfileContent = styled(View)`
  flex: 1;
`;

export const Content = styled(View)`
  height: ${heightDimensions}px;
  padding: ${ms(0)}px;
  flex-direction: column;
`;

export const ButtonsContent = styled(View)`
  flex-direction: column;
  padding-bottom: ${ms(20)}px;

`;


export const ProfileButtons = styled(TouchableOpacity)`
  padding: ${ms(10)}px ${ms(18)}px;
  flex-direction: row;
  align-items: center;
`;

export const TextProf = styled(Text)`
  font-size: ${RFValue(19)}px;
  font-family: ${({ theme }) => theme.fonts.text300};
  color: ${({ theme }) => theme.colors.textGray};
  margin-left: ${ms(20)}px;
`;

