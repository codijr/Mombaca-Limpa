import { TouchableOpacity } from "react-native";
import { ms } from "react-native-size-matters";
import styled from "styled-components";

export const ButtonContainer = styled(TouchableOpacity)`
  width: ${ms(50)}px;
  height: ${ms(50)}px;
  border-radius: ${ms(30)}px;
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  justify-content: center;
  align-items: center;
  elevation: 7;
  shadow-opacity: 0.2;
`;
