import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { CentralizeView } from "../../../global/styles/theme";
import {
  ContainerForgetPassword,
  PasswordIcon,
  Title,
  TextDescription,
  Content,
  PasswordIconWrapper,
  ForgotPasswordContainer,
} from "./styles";
import { ButtonSubmit, Header, Input, ModalAlert } from "../../../components";

export function ForgetPassword() {
  const { navigate } = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleForgetPassword = useCallback(() => {
    // add forget password rule
  }, []);

  const handleNavigateToLogin = useCallback(() => {
    setModalVisible(false);
    navigate("Login" as never);
  }, [setModalVisible, navigate]);

  return (
    <ContainerForgetPassword>
      <Header type="goback" />
      <Content>
        <ForgotPasswordContainer>
          <CentralizeView>
            <PasswordIconWrapper>
              <PasswordIcon />
            </PasswordIconWrapper>
            <Title>Esqueci minha senha</Title>
            <TextDescription>
              Digite seu email e enviaremos um código para redefinir sua senha
            </TextDescription>
          </CentralizeView>

          <Input title="Email" placeholder="Ex: pedroaugusto@gmail.com" />

          <CentralizeView>
            <ButtonSubmit
              title="Enviar Email"
              onPress={() => setModalVisible(!modalVisible)}
            />
          </CentralizeView>
        </ForgotPasswordContainer>
      </Content>
      <ModalAlert
        title="Email enviado!"
        text="Enviamos um link de redefinição de senha para o seu email"
        isVisible={modalVisible}
        transparent
        onConfirm={handleNavigateToLogin}
      />
    </ContainerForgetPassword>
  );
}
