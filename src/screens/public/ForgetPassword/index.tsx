import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { ButtonSubmit } from "../../../components/ButtonSubmit";
import { Input } from "../../../components/Input";
import { CentralizeView } from "../../../global/styles/theme";
import {
  ContainerForgetPassword,
  ForgotPasswordContainer,
  PasswordIcon,
  Title,
  TextDescription,
  Content,
} from "./styles";

export function ForgetPassword() {
  const { navigate } = useNavigation();

  const handleForgetPassword = useCallback(() => {
    // add forget password rule
  }, []);

  return (
    <ContainerForgetPassword>
      <ForgotPasswordContainer>
        <Content>
          <CentralizeView>
            <PasswordIcon />
            <Title>Esqueci minha senha</Title>
            <TextDescription>
              Digite seu email e enviaremos um código para redefinir sua senha
            </TextDescription>
          </CentralizeView>

          <Input title="Email" placeholder="Ex: pedroaugusto@gmail.com" />

          <CentralizeView>
            <ButtonSubmit title="Enviar Email" onPress={handleForgetPassword} />
          </CentralizeView>
        </Content>
      </ForgotPasswordContainer>
    </ContainerForgetPassword>
  );
}
