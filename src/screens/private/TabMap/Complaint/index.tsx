import React, { useState } from "react";
import { ButtonSubmit } from "../../../../components/ButtonSubmit";
import { CentralizeView } from "../../../../global/styles/theme";
import { ModalAlert } from "../../../../components/Modal";
import { Header } from "../../../../components/Header";
import {
  ContainerComplaint,
  ComplaintContent,
  Content,
  ComplaintLocation,
  ComplaintDescription,
} from "./styles";

export function Complaint() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Header title="Fazer denúncia" type="goback" />
      <ContainerComplaint>
        <ComplaintContent>
          <Content>
            <ComplaintLocation />
            <ComplaintDescription />
            <CentralizeView>
              <ButtonSubmit
                onPress={() => setModalVisible(!modalVisible)}
                title="Enviar Denúncia"
              />
            </CentralizeView>
          </Content>
        </ComplaintContent>
      </ContainerComplaint>
      <ModalAlert
        title="Denúncia enviada!"
        text="Sua denúncia foi enviada com sucesso para a nossa ouvidoria, muito obrigado!"
        isVisible={modalVisible}
        transparent
        onConfirm={() => setModalVisible(false)}
      />
    </>
  );
}
