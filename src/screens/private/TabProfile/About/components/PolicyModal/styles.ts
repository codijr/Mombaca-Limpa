import { Text, View } from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/Feather";
import { RFValue } from "react-native-responsive-fontsize";
import { ms } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";

Icon.loadFont();

export const ModalBackground = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled(View)`
  width: 80%;
  max-height: 80%;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  border-radius: 10px;
  padding: ${ms(10)}px 0 0 0;
`;

export const ContentContainer = styled(ScrollView)`
  padding: 0 ${ms(15)}px;
`;

export const HeaderContainer = styled(View)`
  padding: ${ms(2)}px ${ms(15)}px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.disabled};
`;

export const TitleModal = styled(Text)`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.title600};
  color: ${({ theme }) => theme.colors.text};
  text-align: left;
`;

export const TextModal = styled(Text)`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.text300};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${ms(30)}px;
  text-align: left;
`;

export const SubtitleText = styled(Text)`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.text700};
  margin-bottom: ${ms(5)}px;
`;
