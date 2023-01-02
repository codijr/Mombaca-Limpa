import { Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { ms } from "react-native-size-matters";
import Icon from "react-native-vector-icons/Feather";
import styled from "styled-components";

export const ProfileButtonContainer = styled(TouchableOpacity)`
  width: 100%;
  padding: ${ms(10)}px ${ms(20)}px;
`;

export const ButtonContent = styled(View)`
  flex-direction: row;
  align-items: flex-end;
`;

export const ButtonIcon = styled(Icon).attrs({
  size: RFValue(20),
  color: "#747070",
})`
  margin-right: ${ms(15)}px;
`;

export const ButtonText = styled(Text)`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.text300};
  color: ${({ theme }) => theme.colors.textGray};
`;
