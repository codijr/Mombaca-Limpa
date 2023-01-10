import React, { useState } from "react";
import { View } from "react-native";
import { CentralizeView, theme } from "../../../../global/styles/theme";
import {
  ContainerAddMetrics,
  AddMetricsContent,
  Content,
  InputTitleGreen,
  MetricPicker,
} from "./styles";
import {
  ButtonSubmit,
  Header,
  Input,
  ModalAlert,
} from "../../../../components";

export function AddMetrics() {
  const [modalVisible, setModalVisible] = useState(false);
  const [metric, setMetric] = useState("");

  return (
    <ContainerAddMetrics>
      <Header title="Adicionar Métricas" type="goback" />

      <AddMetricsContent>
        <Content>
          <Input
            title="Data"
            placeholder="DD/MM/AAAA"
            type="green"
            keyboardType="numeric"
          />
          <Input
            title="Quantidade de resíduos"
            placeholder="0"
            type="green"
            keyboardType="numeric"
          />
          <InputTitleGreen>Tipo de resíduo</InputTitleGreen>
          <View
            style={{
              backgroundColor: theme.colors.backgroundWhite,
              borderRadius: 10,
              marginBottom: 30,
            }}
          >
            <MetricPicker
              selectedValue={metric}
              onValueChange={(itemValue, itemIndex) =>
                setMetric(itemValue as string)
              }
              dropdownIconColor={theme.colors.text}
            >
              <MetricPicker.Item
                label="Resíduos Sólidos Urbanos"
                value="Resíduos Sólidos Urbanos"
              />
              <MetricPicker.Item label="Poda" value="Poda" />
              <MetricPicker.Item label="Entulho " value="Entulho " />
              <MetricPicker.Item label="Varrição" value="Varrição" />
              <MetricPicker.Item label="Catação" value="Catação" />
            </MetricPicker>
          </View>
          <CentralizeView>
            <ButtonSubmit
              onPress={() => setModalVisible(!modalVisible)}
              title="Adicionar métrica"
            />
          </CentralizeView>
        </Content>
      </AddMetricsContent>

      <ModalAlert
        title="Métrica adicionada!"
        text="Sua métrica foi adicionada com sucesso"
        isVisible={modalVisible}
        transparent
        onConfirm={() => setModalVisible(false)}
      />
    </ContainerAddMetrics>
  );
}
