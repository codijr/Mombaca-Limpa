import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
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
  background-color: white;
`;

export const SearchView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  border-radius: ${ms(40)}px;
  padding: ${ms(10)}px ${ms(15)}px;
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

export const WrapperSearchIcon = styled(View)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
`;

export const SearchIcon = styled(Icon).attrs({
  name: "search",
  size: ms(25),
  color: "#1BB471",
})`
  margin: 0 ${ms(10)}px;
`;

export const Divider = styled(View)`
  border-bottom-color: ${({ theme }) => theme.colors.textGray};
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  margin: ${ms(10)}px 0;
`;

export const AddressContainer = styled(View)`
  padding: ${ms(20)}px 0;
  flex: 1;
`;

export const AddressButton = styled(TouchableOpacity)`
  width: 100%;
`;

export const AddressTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.text400};
  font-size: ${ms(12)}px;
`;

export const AddressDescription = styled(Text)`
  color: ${({ theme }) => theme.colors.textGray};
  font-family: ${({ theme }) => theme.fonts.text300};
  font-size: ${ms(12)}px;
`;
