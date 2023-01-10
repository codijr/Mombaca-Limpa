import React, { useCallback } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { ms } from "react-native-size-matters";

import { useAuth } from "../../../contexts";

import { ButtonSubmit, Input, ModalError } from "../../../components";

import {
  IconBackground,
  LogoIcon,
  Title,
  TopContent,
  SignUpText,
  SignUpTextBold,
  Content,
  ContainerSignUp,
  SignUpContent,
} from "./styles";

import {
  setStorage,
  validateInputEmail,
  validateInputPassword,
  validateInputText,
} from "../../../utils";

import { setFirebaseData, signUp } from "../../../services";

import { profileTemplate } from "../../../assets/icons/profile-template";
import { CentralizeView } from "../../../global/styles/theme";

export function SignUp() {
  const { navigate } = useNavigation();
  const { setUser } = useAuth();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [loadingModal, setLoadingModal] = React.useState(false);
  const [modalErrorVisible, setModalErrorVisible] = React.useState(false);

  const checkErrors = useCallback(() => {
    if (
      !validateInputText(name) &&
      !validateInputEmail(email) &&
      !validateInputPassword(password, confirmPassword)
    )
      return true;

    setError([
      validateInputText(name),
      validateInputEmail(email),
      validateInputPassword(password, confirmPassword),
      validateInputPassword(password, confirmPassword),
    ]);
  }, [name, email, password, confirmPassword]);

  const handleSignUp = useCallback(() => {
    if (!checkErrors()) return;

    modalErrorVisible ? setLoadingModal(true) : setLoading(true);

    signUp(email, password)
      .then((value) => {
        const user = {
          userId: value.user?.uid,
          name,
          email,
          password,
          avatar: profileTemplate,
          role: "user",
        };

        setFirebaseData("Users", user.userId, user).then(() => {
          setStorage("@user", user);
          setUser(user);
        });
      })
      .catch((err) => {
        err.code === "auth/email-already-in-use"
          ? setError([
              "",
              "O email informado já se encontra cadastrado.",
              "",
              "",
            ])
          : setModalErrorVisible(true);
      })
      .finally(() => {
        setLoadingModal(false);
        setLoading(false);
      });
  }, [checkErrors, modalErrorVisible, email, password, name, setUser]);

  return (
    <ContainerSignUp>
      <IconBackground />

      <SignUpContent>
        <Content>
          <TopContent>
            <CentralizeView>
              <LogoIcon />
              <Title>Cadastro</Title>
            </CentralizeView>

            <Input
              title="Nome"
              placeholder="Ex: Pedro Augusto"
              value={name}
              onChangeText={(value) => setName(value)}
              error={error[0]}
            />
            <Input
              title="Email"
              placeholder="Ex: pedroaugusto@gmail.com"
              keyboardType="email-address"
              value={email}
              onChangeText={(value) => setEmail(value)}
              error={error[1]}
            />
            <Input
              title="Senha"
              placeholder="************"
              isPassword
              value={password}
              onChangeText={(value) => setPassword(value)}
              error={error[2]}
            />
            <Input
              title="Confirmar Senha"
              placeholder="************"
              isPassword
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
              error={error[3]}
            />

            <CentralizeView>
              <ButtonSubmit
                title="Fazer Cadastro"
                onPress={handleSignUp}
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
              Já possui uma conta?{" "}
              <SignUpTextBold onPress={() => navigate("Login" as never)}>
                Faça Login
              </SignUpTextBold>
            </SignUpText>
          </CentralizeView>
        </Content>
      </SignUpContent>
      <ModalError
        title="Erro ao criar conta"
        text="Ocorreu um erro ao criar sua conta, tente novamente mais tarde"
        isVisible={modalErrorVisible}
        isLoading={loadingModal}
        onClose={() => setModalErrorVisible(false)}
        transparent
        onConfirm={handleSignUp}
      />
    </ContainerSignUp>
  );
}
