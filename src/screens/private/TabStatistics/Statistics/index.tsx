import React from "react";
import { BarChart, PieChart } from "react-native-chart-kit";
import { ms } from "react-native-size-matters";
import { Dimensions } from "react-native";
import { Header } from "../../../../components/Header";
import {
  BackgroundStats,
  BackgroundStatsChart,
  ContainerStatistics,
  GeneralStatisticsWrapper,
  SectionWrapper,
  StatisticsContent,
  StatisticsSectionTitle,
  TitleStats,
  ValueStats,
  LegendStats,
  GeneralStatistics,
} from "./styles";
import { theme } from "../../../../global/styles/theme";
import { Legend } from "./components/Legend";
import { AddMetricButton } from "./components/AddMetricButton";

export function Statistics() {
  const { width } = Dimensions.get("window");
  const data = {
    labels: ["08/12", "09/12", "10/12", "11/12"],
    datasets: [
      {
        data: [40, 40, 50, 70],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: `${theme.colors.backgroundWhite}`,
    backgroundGradientTo: `${theme.colors.backgroundWhite}`,
    fillShadowGradientOpacity: 1,
    fillShadowGradientFromOffset: 1,
    propsForBackgroundLines: {
      stroke: "rgba(0,0,0,0.2)",
      x1: "70",
      x2: "370",
    },
    decimalPlaces: 0,
    color: () => `${theme.colors.primary}`,
    labelColor: () => `${theme.colors.textGray}`,
  };

  const chartConfigPie = {
    backgroundGradientFrom: `${theme.colors.backgroundWhite}`,
    backgroundGradientTo: `${theme.colors.backgroundWhite}`,
    color: () => `${theme.colors.primary}`,
  };

  const dataPie = [
    {
      name: `Resíduo Sólido Orgânico`,
      qtd: 215,
      color: "#1BB471",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Poda",
      qtd: 150,
      color: "#C92C2C",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Entulho",
      qtd: 100,
      color: "#E2E71B",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Catação",
      qtd: 140,
      color: "#2E71D7",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <ContainerStatistics>
      <Header title="Estatísticas" />

      <StatisticsContent>
        <SectionWrapper>
          <GeneralStatistics>
            <StatisticsSectionTitle>Visão Geral</StatisticsSectionTitle>
            <AddMetricButton />
          </GeneralStatistics>

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

          <BarChart
            data={data}
            width={width - ms(40)}
            height={width - ms(200)}
            yAxisLabel=""
            yAxisSuffix=" T"
            chartConfig={chartConfig}
            withInnerLines
            fromZero
            showBarTops={false}
            style={{
              borderRadius: ms(10),
              paddingVertical: ms(10),
              backgroundColor: `${theme.colors.backgroundWhite}`,
            }}
          />
        </SectionWrapper>

        <SectionWrapper>
          <StatisticsSectionTitle>Coleta por categoria</StatisticsSectionTitle>

          <BackgroundStatsChart>
            <PieChart
              data={dataPie}
              width={width - width / 2}
              height={220}
              chartConfig={chartConfigPie}
              accessor="qtd"
              backgroundColor="transparent"
              hasLegend={false}
              paddingLeft="0"
              center={[50, 0]}
              style={{
                borderRadius: ms(10),
                backgroundColor: `${theme.colors.backgroundWhite}`,
              }}
            />
            <LegendStats>
              <Legend title="Resíduo Solido Orgânico" color="#1BB471" />
              <Legend title="Poda" color="#C92C2C" />
              <Legend title="Entulho" color="#E2E71B" />
              <Legend title="Catação" color="#2E71D7" />
            </LegendStats>
          </BackgroundStatsChart>
        </SectionWrapper>
      </StatisticsContent>
    </ContainerStatistics>
  );
}
