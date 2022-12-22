import { ScrollView, View, Text } from "react-native";
import styled from "styled-components";
import { ms } from "react-native-size-matters";
import { Container } from "../../../../global/styles/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { Picker } from "@react-native-picker/picker";

export const ContainerAddMetrics = styled(Container)`
  background-color: ${({ theme }) => theme.colors.background};
`;

export const AddMetricsContent = styled(ScrollView)`
  flex: 1;
`;

export const Content = styled(View)`
  padding-top: ${ms(20)}px;
  padding-bottom: ${ms(20)}px;
  flex-direction: column;
  justify-content: space-between;
`;

export const InputTitleGreen = styled(Text)`
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.title600};
  color: ${({ theme }) => theme.colors.primary};
`;

export const MetricPicker = styled(Picker)`
border-radius: 10px;
color: ${({ theme }) => theme.colors.text};
height: 60px;
`;