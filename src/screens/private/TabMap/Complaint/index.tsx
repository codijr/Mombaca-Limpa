import React, { useState } from "react";
import { CentralizeView } from "../../../../global/styles/theme";
import {
  ComplaintContainer,
  ComplaintContent,
  Content,
  ComplaintLocation,
  ComplaintDescription,
} from "./styles";
import { ButtonSubmit, Header, ModalAlert } from "../../../../components";
import { concatAddressSubtitle, concatAddressTitle } from "../../../../utils";
import { useMap } from "../../../../contexts";

export function Complaint() {
  const [modalVisible, setModalVisible] = useState(false);
  const {selectedAddress} = useMap();

  return (
    <ComplaintContainer>
      <Header title="Fazer denúncia" type="goback" />

      <ComplaintContent>
        <Content>
          <ComplaintLocation
          //value={selectedAddress.formatted_address}
          value={`${concatAddressTitle(selectedAddress.address_components)}, ${concatAddressSubtitle(selectedAddress.address_components)}`}
          />
          <ComplaintDescription />
          <CentralizeView>
            <ButtonSubmit
              onPress={() => setModalVisible(!modalVisible)}
              title="Enviar Denúncia"
            />
          </CentralizeView>
        </Content>
      </ComplaintContent>

      <ModalAlert
        title="Denúncia enviada!"
        text="Sua denúncia foi enviada com sucesso para a nossa ouvidoria, muito obrigado!"
        isVisible={modalVisible}
        transparent
        onConfirm={() => setModalVisible(false)}
      />
    </ComplaintContainer>
  );
}
