import React, { useState } from "react";
import { ButtonSubmit } from "../../../../components/ButtonSubmit";
import { Input } from "../../../../components/Input";
import { CentralizeView } from "../../../../global/styles/theme";
import { ModalAlert } from "../../../../components/Modal";
import { ContainerChangeEmail, ChangeEmailContent, Content } from "./styles";
import { Header } from "../../../../components/Header";

export function ChangeEmail() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Header title="Alterar email" type="goback" />
      <ContainerChangeEmail>
        <ChangeEmailContent>
          <Content>
            <Input
              title="Novo email"
              placeholder="Ex: pedroaugusto@gmail.com"
              type="green"
            />
            <Input
              title="Senha"
              placeholder="************"
              isPassword
              type="green"
            />
            <CentralizeView>
              <ButtonSubmit
                onPress={() => setModalVisible(!modalVisible)}
                title="Confirmar novo email"
              />
            </CentralizeView>
          </Content>
        </ChangeEmailContent>
      </ContainerChangeEmail>
      <ModalAlert
        title="Email alterado!"
        text="Seu email foi alterado com sucesso"
        isVisible={modalVisible}
        transparent
        onConfirm={() => setModalVisible(false)}
      />
    </>
  );
}
