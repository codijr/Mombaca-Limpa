import { Dimensions, ScrollView, View } from "react-native";
import styled from "styled-components";
import { ms } from "react-native-size-matters";
import { Container } from "../../../../global/styles/theme";

export const ContainerChangePassword = styled(Container)`
    background-color: ${({ theme }) => theme.colors.background};
`;

export const ChangePasswordContent = styled(ScrollView)`
    flex: 1;
`;

export const Content = styled(View)`
  padding-top: ${ms(20)}px;
  padding-bottom: ${ms(20)}px;
  flex-direction: column;
  justify-content: space-between;
`;
