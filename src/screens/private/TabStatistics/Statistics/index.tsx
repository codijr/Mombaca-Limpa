import React from "react";
import { BarChart } from "react-native-chart-kit";
import { Header } from "../../../../components/Header";
import {
  BackgroundStats,
  BackgroundStatsChart,
  ContainerStatistics,
  GeneralStatisticsWrapper,
  SectionWrapper,
  StatisticsScroll,
  StatisticsSectionTitle,
  TitleStats,
  ValueStats,
} from "./styles";

export function Statistics() {
  const data = {
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#e26a00",
    backgroundGradientFrom: "#fb8c00",
    backgroundGradientTo: "#ffa726",
    decimalPlaces: 2, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726",
    },
  };

  return (
    <>
      <Header title="Estatísticas" />
      <ContainerStatistics>
        <StatisticsScroll>
          <SectionWrapper>
            <StatisticsSectionTitle>Visão Geral</StatisticsSectionTitle>

            <GeneralStatisticsWrapper>
              <BackgroundStats>
                <TitleStats>Lixo coletado hoje</TitleStats>
                <ValueStats>50 T</ValueStats>
              </BackgroundStats>

              <BackgroundStats>
                <TitleStats>Varrição</TitleStats>
                <ValueStats>350 Km</ValueStats>
              </BackgroundStats>
            </GeneralStatisticsWrapper>
          </SectionWrapper>

          <SectionWrapper>
            <StatisticsSectionTitle>Histórico de coleta</StatisticsSectionTitle>

            <BackgroundStatsChart>
              <BarChart
                data={data}
                width={350}
                height={200}
                yAxisLabel="$"
                yAxisSuffix="k"
                chartConfig={chartConfig}
                verticalLabelRotation={30}
              />
            </BackgroundStatsChart>
          </SectionWrapper>
        </StatisticsScroll>
      </ContainerStatistics>
    </>
  );
}
