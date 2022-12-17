import { Dimensions, ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import { ms } from "react-native-size-matters";
import { RFValue } from "react-native-responsive-fontsize";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Container } from "../../../global/styles/theme";

Icon.loadFont();

export const ContainerForgetPassword = styled(Container)`
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const Content = styled(View)`
  padding-top: ${ms(20)}px;
  padding-bottom: ${ms(20)}px;
  flex: 1;
`;

export const ForgotPasswordContainer = styled(ScrollView)`
  flex: 1;
`;

export const PasswordIcon = styled(Icon).attrs({
  name: "lock-outline",
  size: ms(50),
  color: "#1BB471",
})`
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  border-radius: 50px;
  padding: ${ms(10)}px;
  margin-bottom: ${ms(30)}px;
`;

export const Title = styled(Text)`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.title600};
  color: ${({ theme }) => theme.colors.textWhite};
  margin-bottom: ${ms(30)}px;
  text-align: center;
`;

export const TextDescription = styled(Text)`
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.text300};
  color: ${({ theme }) => theme.colors.textWhite};
  margin-bottom: ${ms(30)}px;
  text-align: center;
`;

export const SignUpTextBold = styled(Text)`
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.text700};
  color: ${({ theme }) => theme.colors.textWhite};
`;
