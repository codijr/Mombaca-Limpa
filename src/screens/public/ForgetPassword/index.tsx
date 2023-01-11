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
import {
  ButtonSubmit,
  Header,
  Input,
  ModalAlert,
  ModalError,
} from "../../../components";
import { validateInputEmail } from "../../../utils";
import { forgetPassword } from "../../../services";

export function ForgetPassword() {
  const { navigate } = useNavigation();

  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingModal, setLoadingModal] = React.useState(false);
  const [modalErrorVisible, setModalErrorVisible] = React.useState(false);

  const checkErrors = useCallback(() => {
    if (!validateInputEmail(email)) return true;

    setError([validateInputEmail(email)]);
  }, [email]);

  const handleForgetPassword = useCallback(() => {
    if (!checkErrors()) return;

    modalErrorVisible ? setLoadingModal(true) : setLoading(true);

    forgetPassword(email)
      .then((value) => {
        console.log(value);

        setModalVisible(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.code === "auth/user-not-found")
          setError(["O email não está cadastrado"]);
        else if (err.code === "auth/invalid-email")
          setError(["Email inválido."]);
        else setModalErrorVisible(true);
      })
      .finally(() => {
        setLoadingModal(false);
        setLoading(false);
      });
  }, [checkErrors, email, modalErrorVisible]);

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

          <Input
            title="Email"
            placeholder="Ex: pedroaugusto@gmail.com"
            onChangeText={(value) => setEmail(value)}
            error={error[0]}
          />

          <CentralizeView>
            <ButtonSubmit
              title="Enviar Email"
              onPress={handleForgetPassword}
              loading={loading}
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
      <ModalError
        title="Erro ao redefinir senha"
        text="Ocorreu um erro ao redefinir sua senha, tente novamente mais tarde"
        isVisible={modalErrorVisible}
        isLoading={loadingModal}
        onClose={() => setModalErrorVisible(false)}
        transparent
        onConfirm={handleForgetPassword}
      />
    </ContainerForgetPassword>
  );
}
