import React from "react";
import { useNavigation } from "@react-navigation/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { ms } from "react-native-size-matters";
import { Platform } from "react-native";
import { ButtonSubmit } from "../../../components/ButtonSubmit";
import { Input } from "../../../components/Input";
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

export function SignUp() {
  const { navigate } = useNavigation();

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
              <ButtonSubmit title="Fazer Cadastro" />
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
