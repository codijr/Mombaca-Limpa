import React, { useState } from "react";
import { ButtonSubmit } from "../../../../components/ButtonSubmit";
import { Input } from "../../../../components/Input";
import { CentralizeView } from "../../../../global/styles/theme";
import { ModalAlert } from "../../../../components/Modal";
import { ContainerChangePassword, ChangePasswordContent, Content } from "./styles";
import { Header } from "../../../../components/Header";

export function ChangePassword() {
  const [modalVisible, setModalVisible] = useState(false);
  // const [passwordHasBeenChanged, setPasswordHasBeenChanged] = useState(true);
  
  return (
    <>
      <Header title="Alterar senha" type="goback" />
      <ContainerChangePassword>
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
      </ContainerChangePassword>
      <ModalAlert
        title="Senha alterada!"
        text="Sua senha foi alterada com sucesso"
        isVisible={modalVisible}
        transparent
        onConfirm={() => setModalVisible(false)}
      />
    </>
  );
}
