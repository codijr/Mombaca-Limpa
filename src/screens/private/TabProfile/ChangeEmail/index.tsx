import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import {
  ButtonSubmit,
  Header,
  Input,
  ModalError,
  ModalAlert,
} from "../../../../components";

import { ChangeEmailContainer, ChangeEmailContent, Content } from "./styles";

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
import { RootState } from "../../../../redux/createStore";
import { User } from "../../../../@types";
import { setLogin } from "../../../../redux/modules/auth/reducer";

export function ChangeEmail() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

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
        changeEmail(newEmail)
          .then(() => {
            updateFirebaseData("Users", auth.userId, { email: newEmail })
              .then(() => {
                const newUser = { ...auth, email: newEmail } as User;
                updateStorage("@user", { email: newEmail });
                dispatch(setLogin(newUser));
                setModalConfirmationVisible(true);
              })
              .catch((err) => {
                console.log(err);

                setModalTitleError("Erro ao alterar email");
                setModalTextError(
                  "Ocorreu um erro ao alterar o email, tente novamente mais tarde"
                );
                setModalVisible(true);
              });
          })
          .catch((err) => {
            console.log(err);

            if (err.code === "auth/invalid-email") {
              setError([
                "Email inválido, por favor digite um email válido",
                "",
              ]);
            }
          });
      })
      .catch((err) => {
        console.log(err);

        if (err.code === "auth/wrong-password") {
          setError(["", "Senha incorreta, por favor digite a senha correta"]);
        } else if (err.code === "auth/too-many-requests") {
          setModalTitleError("Erro ao alterar o email");
          setModalTextError(
            "Você realizou muitas tentativas de alterar o email, tente novamente mais tarde"
          );
          setModalVisible(true);
        } else {
          setModalTitleError("Erro ao alterar o email");
          setModalTextError(
            "Ocorreu um erro ao alterar o email, tente novamente mais tarde"
          );
          setModalVisible(true);
        }
      })
      .finally(() => {
        setLoading(false);
        setLoadingModal(false);
      });
  }, [checkErrors, modalVisible, password, newEmail, auth, dispatch]);

  return (
    <ChangeEmailContainer>
      <Header title="Alterar email" type="goback" />

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
    </ChangeEmailContainer>
  );
}
