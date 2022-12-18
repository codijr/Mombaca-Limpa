import { ScrollView, TextInput, View } from "react-native";
import { ms } from "react-native-size-matters";
import Icon from "react-native-vector-icons/Feather";
import styled from "styled-components";

export const SearchContainer = styled(View)`
  position: absolute;
  width: 100%;
  top: ${ms(50)}px;
  padding: 0 ${ms(20)}px;
`;

export const FocusView = styled(ScrollView)`
  position: absolute;
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: transparent;
`;

export const SearchView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  border-radius: ${ms(40)}px;
  padding: ${ms(5)}px ${ms(15)}px;
  elevation: 7;
  shadow-opacity: 0.2;
`;

export const SearchInput = styled(TextInput).attrs({
  placeholderTextColor: "#747070",
})`
  flex: 1;
  margin-left: ${ms(10)}px;
  font-family: ${({ theme }) => theme.fonts.text300};
  font-size: ${ms(16)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const SearchIcon = styled(Icon).attrs({
  name: "search",
  size: ms(25),
  color: "#1BB471",
})``;
