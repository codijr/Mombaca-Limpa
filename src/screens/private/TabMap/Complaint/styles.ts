import { View, TextInput, ScrollView } from "react-native";
import styled from "styled-components";
import { ms } from "react-native-size-matters";
import { Container } from "../../../../global/styles/theme";
import { Input } from "../../../../components/Input";

export const ComplaintContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const ComplaintContent = styled(ScrollView)`
  flex: 1;
`;

export const Content = styled(Container)`
  padding-top: ${ms(20)}px;
  flex-direction: column;
`;

export const ComplaintLocation = styled(Input).attrs({
  title: "Localização",
  placeholder: "Informe o local do ocorrido",
  type: "green",
})``;

export const ComplaintDescription = styled(Input).attrs({
  title: "Descrição",
  placeholder: "Descreva o ocorrido",
  type: "green",
  multiline: true,
  numberOfLines: 8,
})`
  text-align-vertical: top;
  word-wrap: break-word;
`;
