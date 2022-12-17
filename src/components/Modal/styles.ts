import { Modal, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";
import Icon from "react-native-vector-icons/Feather";
import { RFValue } from "react-native-responsive-fontsize";
import { ms } from "react-native-size-matters";

Icon.loadFont();

export const ModalContainer = styled(Modal)``;

export const ModalBackground = styled(View)`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled(View)`
  width: 80%;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  border-radius: 10px;
  padding: ${ms(15)}px 0 0 0;
`;

export const ContentContainer = styled(View)`
  padding: 0 ${ms(20)}px;
`;

export const CorrectIcon = styled(Icon).attrs({
  name: "check-circle",
  size: 50,
  color: "#008345",
})`
  margin-bottom: 20px;
  align-self: center;
`;

export const TitleModal = styled(Text)`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }) => theme.fonts.title600};
  color: ${({ theme }) => theme.colors.primaryDark};
  text-align: center;
`;

export const TextModal = styled(Text)`
  font-size: ${RFValue(15)}px;
  font-family: ${({ theme }) => theme.fonts.text300};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${ms(30)}px;
  text-align: center;
`;

export const ButtonConfirmModal = styled(TouchableOpacity)`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: ${ms(5)}px 0;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

export const ButtonText = styled(Text)`
  font-size: ${RFValue(17)}px;
  font-family: ${({ theme }) => theme.fonts.title600};
  color: ${({ theme }) => theme.colors.textWhite};
`;
