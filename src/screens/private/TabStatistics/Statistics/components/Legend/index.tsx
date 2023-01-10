import React from "react";
import {
  LegendStatsColor,
  LegendStatsTitle,
  LegendStatsWrapper,
} from "./styles";

type LegendProps = {
  color: string;
  title: string;
};

export function Legend({ color, title }: LegendProps) {
  return (
    <LegendStatsWrapper>
      <LegendStatsColor
        style={{
          backgroundColor: color,
        }}
      />
      <LegendStatsTitle>{title}</LegendStatsTitle>
    </LegendStatsWrapper>
  );
}
