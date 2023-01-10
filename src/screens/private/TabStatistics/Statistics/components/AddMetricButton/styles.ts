import { Text, TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { ms } from "react-native-size-matters";
import styled from "styled-components";

export const AddMetricButtonWrapper = styled(TouchableOpacity)`
  width: 30%;
  height: ${ms(30)}px;
  border-radius: ${ms(5)}px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled(Text)`
  font-size: ${RFValue(9)}px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.text300};
`;
