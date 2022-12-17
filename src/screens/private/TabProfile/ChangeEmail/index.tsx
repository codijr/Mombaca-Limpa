import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import { ButtonSubmit } from "../../../../components/ButtonSubmit";
import { InputGreen } from "../../../../components/InputGreen";
import { CentralizeView } from "../../../../global/styles/theme";
import { ModalAlert } from "../../../../components/Modal";
import {
  ContainerChangeEmail,
  ChangeEmailContent,
  TopContent,
  Content,
} from "./styles";

export function ChangeEmail() {
  const { navigate } = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  function closeModal () {
    setModalVisible(false);
  }

  return (
    <>
    <ContainerChangeEmail>
      <ChangeEmailContent>
        <Content>
          <TopContent>
            <InputGreen title="Novo email" placeholder="Ex: pedroaugusto@gmail.com" />
            <InputGreen title="Senha" placeholder="************" isPassword />
            <CentralizeView>
              <ButtonSubmit onPress={() => setModalVisible(!modalVisible)} title="Confirmar novo email" />
            </CentralizeView>
          </TopContent>
        </Content>
      </ChangeEmailContent>
    </ContainerChangeEmail>
    <ModalAlert
    title="Email alterado!"
    text="Seu email foi alterado com sucesso"
    isVisible={modalVisible}
    transparent
    onConfirm={closeModal}
    />
    </>
  );
}
