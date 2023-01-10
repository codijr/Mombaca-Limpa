import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import auth from "@react-native-firebase/auth";
import { NativeMethods } from "react-native";
import { CentralizeView } from "../../../global/styles/theme";
import {
  ContainerForgetPassword,
  ForgotPasswordContainer,
  PasswordIcon,
  Title,
  TextDescription,
  Content,
  PasswordIconWrapper,
} from "./styles";
import {
  ButtonSubmit,
  Header,
  Input,
  ModalAlert,
  ModalError,
} from "../../../components";
import { validateInputEmail } from "../../../utils/validation";

export function ForgetPassword() {
  const { navigate } = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const checkErrors = useCallback(() => {
    if (!validateInputEmail(email)) return true;
  }, [email]);

  const handleForgetPassword = useCallback(() => {
    if (!checkErrors()) return;
    setLoading(true);

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setModalVisible(!modalVisible);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email, modalVisible]);

  const handleNavigateToLogin = useCallback(() => {
    setModalVisible(false);
    navigate("Login" as never);
  }, [setModalVisible, navigate]);

  return (
    <>
      <Header type="goback" />
      <ContainerForgetPassword>
        <ForgotPasswordContainer>
          <Content>
            <CentralizeView>
              <PasswordIconWrapper>
                <PasswordIcon />
              </PasswordIconWrapper>
              <Title>Esqueci minha senha</Title>
              <TextDescription>
                Digite seu email e enviaremos um código para redefinir sua senha
              </TextDescription>
            </CentralizeView>

            <Input
              title="Email"
              placeholder="Ex: pedroaugusto@gmail.com"
              autoCapitalize="none"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />

            <CentralizeView>
              <ButtonSubmit
                title="Enviar Email"
                onPress={() => handleForgetPassword()}
                loading={loading}
              />
            </CentralizeView>
          </Content>
        </ForgotPasswordContainer>
      </ContainerForgetPassword>
      <ModalAlert
        title="Email enviado!"
        text="Enviamos um link de redefinição de senha para o seu email"
        isVisible={modalVisible}
        transparent
        onConfirm={handleNavigateToLogin}
      />
    </>
  );
}
