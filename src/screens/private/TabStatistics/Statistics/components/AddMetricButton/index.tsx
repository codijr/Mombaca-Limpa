import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AddMetricButtonWrapper, ButtonText } from "./styles";
import { theme } from "../../../../../../global/styles/theme";

export function AddMetricButton() {
  const [clicked, setClicked] = React.useState(false);
  const { navigate } = useNavigation();

  return (
    <AddMetricButtonWrapper
      style={{
        backgroundColor: clicked ? theme.colors.backgroundWhite : "transparent",
      }}
      onPressIn={() => setClicked(true)}
      onPressOut={() => setClicked(false)}
      onPress={() => navigate("AddMetrics" as never)}
    >
      <ButtonText>Adicionar Métricas</ButtonText>
    </AddMetricButtonWrapper>
  );
}
