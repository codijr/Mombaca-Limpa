import React, { useState } from "react";

import {
  ButtonSubmit,
  Header,
  Input,
  ModalAlert,
} from "../../../../components";

import {
  ContainerChangePassword,
  ChangePasswordContent,
  Content,
} from "./styles";

import { CentralizeView } from "../../../../global/styles/theme";

export function ChangePassword() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ContainerChangePassword>
      <Header title="Alterar senha" type="goback" />

      <ChangePasswordContent>
        <Content>
          <Input
            title="Senha atual"
            placeholder="************"
            isPassword
            type="green"
          />

          <Input
            title="Nova senha"
            placeholder="************"
            isPassword
            type="green"
          />

          <Input
            title="Confirmar nova senha"
            placeholder="************"
            isPassword
            type="green"
          />

          <CentralizeView>
            <ButtonSubmit
              onPress={() => setModalVisible(!modalVisible)}
              title="Confirmar alteração de senha"
            />
          </CentralizeView>
        </Content>
      </ChangePasswordContent>

      <ModalAlert
        title="Senha alterada!"
        text="Sua senha foi alterada com sucesso"
        isVisible={modalVisible}
        transparent
        onConfirm={() => setModalVisible(false)}
      />
    </ContainerChangePassword>
  );
}
