import React, { useCallback } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ms } from "react-native-size-matters";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { User, useAuth } from "../../../contexts";

import { ButtonSubmit, Input, ModalError } from "../../../components";

import {
  ContainerLogin,
  IconBackground,
  LogoIcon,
  Title,
  LoginContent,
  ForgotPasswordWrapper,
  ForgotPasswordText,
  TopContent,
  SignUpText,
  SignUpTextBold,
  Content,
} from "./styles";

import {
  setStorage,
  validateInputEmail,
  validateInputPassword,
} from "../../../utils";

import { getFirebaseData, login } from "../../../services";

import { CentralizeView } from "../../../global/styles/theme";

export function Login() {
  const { navigate } = useNavigation();
  const { setUser } = useAuth();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingModal, setLoadingModal] = React.useState(false);
  const [modalErrorVisible, setModalErrorVisible] = React.useState(false);

  const checkErrors = useCallback(() => {
    if (
      !validateInputEmail(email) &&
      !validateInputPassword(password, password)
    )
      return true;

    setError([
      validateInputEmail(email),
      validateInputPassword(password, password),
    ]);
  }, [email, password]);

  const handleLogin = useCallback(() => {
    if (!checkErrors()) return;

    modalErrorVisible ? setLoadingModal(true) : setLoading(true);

    login(email, password)
      .then((value) => {
        getFirebaseData("Users", value.user.uid).then((doc) => {
          if (doc.exists) {
            const user: User = doc.data() as User;
            setStorage("@user", user);
            setUser(user);
          }
        });
      })
      .catch(() => {
        setModalErrorVisible(true);
      })
      .finally(() => {
        setLoadingModal(false);
        setLoading(false);
      });
  }, [checkErrors, email, modalErrorVisible, password, setUser]);

  return (
    <ContainerLogin>
      <IconBackground />

      <LoginContent>
        <Content>
          <TopContent>
            <CentralizeView>
              <LogoIcon />
              <Title>Login</Title>
            </CentralizeView>

            <Input
              title="Email"
              placeholder="Ex: pedroaugusto@gmail.com"
              keyboardType="email-address"
              value={email}
              onChangeText={(value) => setEmail(value)}
              error={error[0]}
            />
            <Input
              title="Senha"
              placeholder="************"
              isPassword
              value={password}
              onChangeText={(value) => setPassword(value)}
              error={error[1]}
            />
            <ForgotPasswordWrapper>
              <ForgotPasswordText
                onPress={() => navigate("ForgetPassword" as never)}
              >
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPasswordWrapper>

            <CentralizeView>
              <ButtonSubmit
                title="Fazer Login"
                onPress={handleLogin}
                loading={loading}
              />
            </CentralizeView>
          </TopContent>

          <CentralizeView
            style={{
              bottom:
                Platform.OS === "ios" ? getStatusBarHeight() + ms(20) : ms(20),
            }}
          >
            <SignUpText>
              Não tem uma conta?{" "}
              <SignUpTextBold onPress={() => navigate("SignUp" as never)}>
                Cadastre-se
              </SignUpTextBold>
            </SignUpText>
          </CentralizeView>
        </Content>
      </LoginContent>

      <ModalError
        title="Erro ao logar"
        text="Ocorreu um erro ao logar sua conta, tente novamente mais tarde"
        isVisible={modalErrorVisible}
        isLoading={loadingModal}
        onClose={() => setModalErrorVisible(false)}
        transparent
        onConfirm={handleLogin}
      />
    </ContainerLogin>
  );
}
