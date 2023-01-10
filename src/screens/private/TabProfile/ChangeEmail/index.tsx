/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { CentralizeView } from "../../../../global/styles/theme";
import {
  ContainerChangeEmail,
  ChangeEmailContent,
  Content
} from "./styles";
import {
  ButtonSubmit,
  Header,
  Input,
  ModalError,
  ModalAlert
} from "../../../../components";
import { User } from "../../../../contexts/AuthContext";
import {
  setStorage,
  validateInputEmail,
  validateInputPassword,
} from "../../../../utils";


export function ChangeEmail() {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmationVisible, setModalConfirmationVisible] = useState(false);
  const [modalTitleError, setModalTitleError] = useState("");
  const [modalTextError, setModalTextError] = useState("");
  const { navigate } = useNavigation();

  const checkErrors = useCallback(() => {
    if (
      !validateInputEmail(newEmail) &&
      !validateInputPassword(password, password)
    )
      return true;
    setError([
      validateInputEmail(newEmail),
      validateInputPassword(password, password)
    ]);
  }, [newEmail, password]);


  const handleChangeEmail = useCallback(() => {
    if (!checkErrors()) return;
    modalVisible ? setLoadingModal(true) : setLoading(true);

    const actualUser = auth().currentUser;
    if (actualUser && (actualUser.email !== undefined)) {
      const currentEmail = actualUser.email || '';
      const credential = auth.EmailAuthProvider.credential(currentEmail.toString(), password);
      actualUser.reauthenticateWithCredential(credential)
        .then(() => {
          actualUser.updateEmail(newEmail)
            .then(() => {
              firestore().collection("Users").doc(actualUser.uid).update({ "email": newEmail })
              firestore().collection("Users").doc(actualUser.uid).get()
                .then((doc) => {
                  if (doc.exists) {
                    const user: User = doc.data() as User;
                    setStorage("@user", user);
                  }
                });
              setModalConfirmationVisible(true);
              setLoading(false);
            }).catch((err) => {
              setModalTitleError("Erro na alteração!")
              err.code === "auth/invalid-email"
                ? setModalTextError("Email inválido, digite um email válido.") : setModalTextError(err.toString());
              setModalVisible(true);
              setLoading(false);
            })
        }).catch((err) => {
          setModalTitleError("Erro de autenticação!")
          err.code === "auth/wrong-password"
            ? setModalTextError("Senha incorreta, tente novamente.") : setModalTextError(err.toString());
          setModalVisible(true);
          setLoading(false);
        }).finally(() => {
          setLoadingModal(false);
        });
    }
  }, [checkErrors, newEmail, modalVisible, password]);

  return (
    <>
      <Header title="Alterar email" type="goback" />
      <ContainerChangeEmail>
        <ChangeEmailContent>
          <Content>
            <Input
              title="Novo email"
              placeholder="Ex: pedroaugusto@gmail.com"
              type="green"
              keyboardType="email-address"
              value={newEmail}
              onChangeText={(value) => setNewEmail(value)}
              error={error[0]}
            />
            <Input
              title="Senha"
              placeholder="************"
              isPassword
              type="green"
              value={password}
              onChangeText={(value) => setPassword(value)}
              error={error[1]}
            />
            <CentralizeView>
              <ButtonSubmit
                title="Confirmar novo email"
                onPress={handleChangeEmail}
                loading={loading}
              />
            </CentralizeView>
          </Content>
        </ChangeEmailContent>
      </ContainerChangeEmail>
      <ModalError
        title={modalTitleError}
        text={modalTextError}
        isVisible={modalVisible}
        isLoading={loadingModal}
        transparent
        onClose={() => setModalVisible(false)}
        onConfirm={handleChangeEmail}
      />
      <ModalAlert
        title="Email alterado!"
        text="Seu email foi alterado com sucesso"
        isVisible={modalConfirmationVisible}
        transparent
        onConfirm={() => [setModalConfirmationVisible(false), navigate("Profile" as never)]}
      />
    </>
  );
}
