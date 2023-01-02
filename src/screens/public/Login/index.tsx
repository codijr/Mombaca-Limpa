import { useNavigation } from "@react-navigation/native";
import React, { useCallback } from "react";
import { ms } from "react-native-size-matters";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Platform } from "react-native";
// import auth from "@react-native-firebase/auth";
// import firestore from "@react-native-firebase/firestore";
import { ButtonSubmit, Input, ModalError } from "../../../components";
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
import { User, useAuth } from "../../../contexts/AuthContext";
import {
  setStorage,
  validateInputEmail,
  validateInputPassword,
} from "../../../utils";

export function Login() {
  const { navigate } = useNavigation();
  const { setIsAuth } = useAuth();

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

    // modalErrorVisible ? setLoadingModal(true) : setLoading(true);

    // auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then((value) => {
    //     console.log(value);

    //     firestore()
    //       .collection("Users")
    //       .doc(value.user?.uid)
    //       .get()
    //       .then((doc) => {
    //         if (doc.exists) {
    //           const user: User = doc.data() as User;
    //           setStorage("@user", user);
    //           setIsAuth(true);
    //         }
    //       });
    //   })
    //   .catch(() => {
    //     setModalErrorVisible(true);
    //   })
    //   .finally(() => {
    //     setLoadingModal(false);
    //     setLoading(false);
    //   });
  }, [checkErrors, email, modalErrorVisible, password]);

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
        title="Erro ao criar conta"
        text="Ocorreu um erro ao criar sua conta, tente novamente mais tarde"
        isVisible={modalErrorVisible}
        isLoading={loadingModal}
        onClose={() => setModalErrorVisible(false)}
        transparent
        onConfirm={handleLogin}
      />
    </ContainerLogin>
  );
}
