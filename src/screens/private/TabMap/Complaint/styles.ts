import { View, TextInput } from "react-native";
import styled from "styled-components";
import { ms } from "react-native-size-matters";
import { Container } from "../../../../global/styles/theme";

export const ContainerComplaint = styled(Container)`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ComplaintContent = styled(View)`
  flex: 1;
`;

export const Content = styled(View)`
  padding-top: ${ms(20)}px;
  flex-direction: column;
`;

export const ComplaintLocation = styled(TextInput)`
height: 45px;
padding: 10px;
border-radius: 7px;
font-size: 15px;
font-family: ${({ theme }) => theme.fonts.text300};
color: ${({ theme }) => theme.colors.text};
background-color: ${({ theme }) => theme.colors.backgroundWhite}; 
`;

export const ComplaintDescription = styled(TextInput)`
height: 230px;
margin-top: 22px;
margin-bottom: 30px;
padding: 10px;
border-radius: 7px;
font-size: 15px;
font-family: ${({ theme }) => theme.fonts.text300};
color: ${({ theme }) => theme.colors.text};
background-color: ${({ theme }) => theme.colors.backgroundWhite};
`;