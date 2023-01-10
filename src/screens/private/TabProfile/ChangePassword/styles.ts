import { ScrollView, View } from "react-native";
import styled from "styled-components";
import { ms } from "react-native-size-matters";
import { Container } from "../../../../global/styles/theme";

export const ContainerChangePassword = styled(View)`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const ChangePasswordContent = styled(ScrollView)`
  flex: 1;
`;

export const Content = styled(Container)`
  padding-top: ${ms(20)}px;
  padding-bottom: ${ms(20)}px;
  flex-direction: column;
  justify-content: space-between;
`;
