import React, { useState } from "react";
import { ButtonSubmit } from "../../../../components/ButtonSubmit";
import { Input } from "../../../../components/Input";
import { CentralizeView } from "../../../../global/styles/theme";
import { ModalAlert } from "../../../../components/Modal";
import { ContainerAddMetrics, AddMetricsContent, Content, InputTitleGreen, MetricPicker } from "./styles";
import { Header } from "../../../../components/Header";
import { theme } from "../../../../global/styles/theme";
import { View } from "react-native";

export function AddMetrics() {
  const [modalVisible, setModalVisible] = useState(false);
  const [metric, setMetric] = useState('');

  return (
    <>
      <Header title="Adicionar Métricas" type="goback" />
      <ContainerAddMetrics>
        <AddMetricsContent>
          <Content>
            <Input
              title="Data"
              placeholder="12/11/2022"
              type="green"
            />
             <Input
              title="Quantidade de resíduos"
              placeholder="0"
              type="green"
            />
            <InputTitleGreen >
                Tipo de resíduo
            </InputTitleGreen>
            <View style={{backgroundColor: theme.colors.backgroundWhite, borderRadius: 10, marginBottom: 30}}>
              <MetricPicker
                selectedValue={metric} 
                onValueChange={(itemValue, itemIndex) => setMetric(itemValue)}
                dropdownIconColor={theme.colors.text}
              >
                <MetricPicker.Item label="Resíduos Sólidos Urbanos" value="Resíduos Sólidos Urbanos" />
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
      </ContainerAddMetrics>
      <ModalAlert
        title="Métrica adicionada!"
        text="Sua métrica foi adicionada com sucesso"
        isVisible={modalVisible}
        transparent
        onConfirm={() => setModalVisible(false)}
      />
    </>
  );
}