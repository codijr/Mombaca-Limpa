import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  ButtonSubmit,
  Header,
  Input,
  ModalError,
  ModalAlert,
} from "../../../../components";

import { ContainerChangeEmail, ChangeEmailContent, Content } from "./styles";

import { User, useAuth } from "../../../../contexts";

import {
  updateStorage,
  validateInputEmail,
  validateInputPassword,
} from "../../../../utils";

import {
  changeEmail,
  reauthenticateWithCredential,
  updateFirebaseData,
} from "../../../../services";

import { CentralizeView } from "../../../../global/styles/theme";

export function ChangeEmail() {
  const { user, setUser } = useAuth();

  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalConfirmationVisible, setModalConfirmationVisible] =
    useState(false);
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
      validateInputPassword(password, password),
    ]);
  }, [newEmail, password]);

  const handleChangeEmail = useCallback(() => {
    if (!checkErrors()) return;

    modalVisible ? setLoadingModal(true) : setLoading(true);

    reauthenticateWithCredential(password)
      .then(() => {
        changeEmail(newEmail, password)
          .then(() => {
            updateFirebaseData("Users", user?.userId, { email: newEmail })
              .then(() => {
                const newUser = { ...user, email: newEmail } as User;
                updateStorage("@user", { email: newEmail });
                setUser(newUser);
                setModalConfirmationVisible(true);
              })
              .catch(() => {
                setModalTitleError("Erro ao alterar email");
                setModalTextError(
                  "Ocorreu um erro ao alterar o email, tente novamente mais tarde"
                );
                setModalVisible(true);
              });
          })
          .catch((err) => {
            if (err.code === "auth/invalid-email") {
              setError([
                "Email inválido, por favor digite um email válido",
                "",
              ]);
            }
          });
      })
      .catch((err) => {
        if (err.code === "auth/wrong-password") {
          setError(["", "Senha incorreta, por favor digite a senha correta"]);
        }
      })
      .finally(() => {
        setLoading(false);
        setLoadingModal(false);
      });
  }, [checkErrors, modalVisible, password, newEmail, user, setUser]);

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
        onConfirm={() => navigate("Profile" as never)}
      />
    </>
  );
}
