import { Image } from "react-native";
import { ms } from "react-native-size-matters";
import styled from "styled-components";

export const ImageProfile = styled(Image)`
  width: ${ms(45)}px;
  height: ${ms(45)}px;
  border-radius: ${ms(25)}px;
  margin-right: ${ms(10)}px;
`;
