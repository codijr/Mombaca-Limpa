import { View } from "react-native";
import styled from "styled-components";
import { ms } from "react-native-size-matters";

export const theme = {
  colors: {
    primary: "#1BB471",
    primaryExtraDark: "#003814",
    primaryDark: "#008345",
    primaryLight: "#5FE7A0",
    text: "#0D0D0D",
    textWhite: "#FFFFFF",
    textGray: "#747070",
    background: "#E7E7E7",
    backgroundWhite: "#FCFCFC",
    backgroundPrimary: "#1BB471",
    alert: "#DF1B1B",
    disabled: "#DFDFDF",
  },
  fonts: {
    title600: "Poppins-SemiBold",
    text700: "LeagueSpartan-Bold",
    text400: "LeagueSpartan-Medium",
    text300: "LeagueSpartan-Regular",
  },
};

export const Container = styled(View)`
  flex: 1;
  padding: 0 ${ms(20)}px;
`;

export const CentralizeView = styled(View)`
  display: flex;
  align-items: center;
`;
