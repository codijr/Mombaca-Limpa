import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ButtonSubmit } from "../../../../components/ButtonSubmit";
import { InputGreen } from "../../../../components/InputGreen";
import { CentralizeView } from "../../../../global/styles/theme";
import {
  ContainerChangeEmail,
  ChangeEmailContent,
  TopContent,
  Content,
} from "./styles";

export function ChangeEmail() {
  const { navigate } = useNavigation();

  return (
    <ContainerChangeEmail>
      <ChangeEmailContent>
        <Content>
          <TopContent>
            <InputGreen title="Novo email" placeholder="Ex: pedroaugusto@gmail.com" />
            <InputGreen title="Senha" placeholder="************" isPassword />
            <CentralizeView>
              <ButtonSubmit title="Confirmar novo email" />
            </CentralizeView>
          </TopContent>
        </Content>
      </ChangeEmailContent>
    </ContainerChangeEmail>
  );
}
