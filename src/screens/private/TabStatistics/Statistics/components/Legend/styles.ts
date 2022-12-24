import { Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { ms } from "react-native-size-matters";
import styled from "styled-components";

export const LegendStatsWrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${ms(10)}px;
`;

export const LegendStatsColor = styled(View)`
  width: ${ms(10)}px;
  height: ${ms(10)}px;
  border-radius: ${ms(5)}px;
`;

export const LegendStatsTitle = styled(Text)`
  font-size: ${RFValue(9)}px;
  color: ${({ theme }) => theme.colors.textGray};
  font-family: ${({ theme }) => theme.fonts.text300};
  margin-left: ${ms(5)}px;
`;
