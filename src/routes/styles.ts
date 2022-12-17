import { View, Text, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components";

export const Container = styled(View)`
  flex-direction: column;
`;

export const TitleProfile = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.title600};
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.textWhite};
  margin-bottom: -10px;
`;

export const SubtitleProfile = styled(Text)`
  font-family: ${({ theme }) => theme.fonts.text300};
  font-size: ${RFValue(10)}px;
  color: ${({ theme }) => theme.colors.disabled};
`;

export const ImageProfile = styled(Image)`
  width: ${RFValue(45)}px;
  height: ${RFValue(45)}px;
  border-radius: ${RFValue(25)}px;
`;
