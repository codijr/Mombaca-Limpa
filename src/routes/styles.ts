import { View, Text } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components";

export const Container = styled(View)`
    flex-direction: column;
`;

export const TitleProfile = styled(Text)`
    font-family: ${({ theme }) => theme.fonts.title600};
    font-size: ${RFValue(21)}px;
    color: ${({ theme }) => theme.colors.textWhite};
    margin-bottom: -10px;
`;

export const SubtitleProfile = styled(Text)`
    font-family: ${({ theme }) => theme.fonts.text400};
    font-size: ${RFValue(13)}px;
    color: ${({ theme }) => theme.colors.disabled};
`;