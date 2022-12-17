import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ButtonSubmit } from "../../../components/ButtonSubmit";
import { Input } from "../../../components/Input";
import { CentralizeView } from "../../../global/styles/theme";
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

export function Login() {
  const { navigate } = useNavigation();

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

            <Input title="Email" placeholder="Ex: pedroaugusto@gmail.com" />
            <Input title="Senha" placeholder="************" isPassword />
            <ForgotPasswordWrapper>
              <ForgotPasswordText onPress={() => navigate("ChangeEmail" as never)}>
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPasswordWrapper>

            <CentralizeView>
              <ButtonSubmit title="Fazer Login" />
            </CentralizeView>
          </TopContent>

          <CentralizeView
            style={{
              bottom: 0,
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
    </ContainerLogin>
  );
}
