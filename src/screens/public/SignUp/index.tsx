import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { ms } from "react-native-size-matters";
import { Platform } from "react-native";
import { CentralizeView } from "../../../global/styles/theme";
import {
  ContainerLogin,
  IconBackground,
  LogoIcon,
  Title,
  LoginContent,
  TopContent,
  SignUpText,
  SignUpTextBold,
  Content,
} from "./styles";
import { useAuth } from "../../../contexts/AuthContext";
import { ButtonSubmit, Input } from "../../../components";

export function SignUp() {
  const { navigate } = useNavigation();
  const { setIsAuth } = useAuth();

  const handleSignUp = useCallback(() => {
    setIsAuth(true);
  }, [setIsAuth]);

  return (
    <ContainerLogin>
      <IconBackground />

      <LoginContent>
        <Content>
          <TopContent>
            <CentralizeView>
              <LogoIcon />
              <Title>Cadastro</Title>
            </CentralizeView>

            <Input title="Nome" placeholder="Ex: Pedro Augusto" />
            <Input title="Email" placeholder="Ex: pedroaugusto@gmail.com" />
            <Input title="Senha" placeholder="************" isPassword />
            <Input
              title="Confirmar Senha"
              placeholder="************"
              isPassword
            />

            <CentralizeView>
              <ButtonSubmit title="Fazer Cadastro" onPress={handleSignUp} />
            </CentralizeView>
          </TopContent>

          <CentralizeView
            style={{
              bottom:
                Platform.OS === "ios" ? getStatusBarHeight() + ms(20) : ms(20),
            }}
          >
            <SignUpText>
              Já possui uma conta?{" "}
              <SignUpTextBold onPress={() => navigate("Login" as never)}>
                Faça Login
              </SignUpTextBold>
            </SignUpText>
          </CentralizeView>
        </Content>
      </LoginContent>
    </ContainerLogin>
  );
}
