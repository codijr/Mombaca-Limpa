import { ScrollView, Text, View } from "react-native";
import styled from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { ms } from "react-native-size-matters";

export const ContainerStatistics = styled(View)`
  flex: 1;
`;

export const StatisticsContent = styled(ScrollView)`
  padding: ${ms(20)}px ${ms(20)}px;
  flex: 1;
`;

export const SectionWrapper = styled(View)`
  margin-bottom: ${ms(20)}px;
`;

export const StatisticsSectionTitle = styled(Text)`
  font-size: ${RFValue(13)}px;
  font-family: ${({ theme }) => theme.fonts.title600};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${ms(10)}px;
`;

export const GeneralStatistics = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

export const GeneralStatisticsWrapper = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

export const BackgroundStats = styled(View)`
  background-color: ${({ theme }) => theme.colors.backgroundWhite};
  padding: ${ms(10)}px ${ms(10)}px 0 ${ms(10)}px;
  width: 45%;
  border-radius: ${ms(10)}px;
`;

export const BackgroundStatsChart = styled(BackgroundStats)`
  width: 100%;
  padding: 0;
  height: 220px;
  flex-direction: row;
`;

export const LegendStats = styled(View)`
  flex: 1;
  justify-content: center;
`;

export const TitleStats = styled(Text)`
  font-size: ${RFValue(9)}px;
  color: ${({ theme }) => theme.colors.textGray};
  fonts-family: ${({ theme }) => theme.fonts.text300};
`;

export const ValueStats = styled(Text)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.title600};
`;
