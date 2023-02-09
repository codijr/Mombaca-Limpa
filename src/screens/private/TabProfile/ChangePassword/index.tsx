import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import {
  ButtonSubmit,
  Header,
  Input,
  ModalAlert,
  ModalError,
} from "../../../../components";

import {
  ContainerChangePassword,
  ChangePasswordContent,
  Content,
} from "./styles";

import { updateStorage, validateInputPassword } from "../../../../utils";

import {
  changePassword,
  reauthenticateWithCredential,
  updateFirebaseData,
} from "../../../../services";

import { CentralizeView } from "../../../../global/styles/theme";
import { RootState } from "../../../../redux/createStore";
import { setLogin } from "../../../../redux/modules/auth/reducer";
import { User } from "../../../../@types";

export function ChangePassword() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
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
    setError(["", "", ""]);

    if (
      !validateInputPassword(oldPassword, oldPassword) &&
      !validateInputPassword(newPassword, confirmNewPassword)
    )
      return true;

    setError([
      validateInputPassword(oldPassword, oldPassword),
      validateInputPassword(newPassword, confirmNewPassword),
      validateInputPassword(confirmNewPassword, newPassword),
    ]);
  }, [oldPassword, newPassword, confirmNewPassword]);

  const handleChangePassword = useCallback(() => {
    if (!checkErrors()) return;

    modalVisible ? setLoadingModal(true) : setLoading(true);

    reauthenticateWithCredential(oldPassword)
      .then(() => {
        changePassword(newPassword)
          .then(() => {
            updateFirebaseData("Users", auth.userId, { password: newPassword })
              .then(() => {
                const newUser = { ...auth, password: newPassword } as User;
                updateStorage("@user", { password: newPassword });
                dispatch(setLogin(newUser));
                setModalConfirmationVisible(true);
              })
              .catch((err) => {
                console.log(err);

                setModalTitleError("Erro ao alterar a senha");
                setModalTextError(
                  "Ocorreu um erro ao alterar a senha, tente novamente mais tarde"
                );
                setModalVisible(true);
              });
          })
          .catch((err) => {
            if (err.code === "auth/invalid-password") {
              setError([
                "Senha inválida, por favor digite uma senha válida",
                "",
              ]);
            }
          });
      })
      .catch((err) => {
        console.log(err);

        if (err.code === "auth/wrong-password") {
          setError([
            "Senha incorreta, por favor digite a senha correta",
            "",
            "",
          ]);
        } else if (err.code === "auth/too-many-requests") {
          setModalTitleError("Erro ao alterar a senha");
          setModalTextError(
            "Você realizou muitas tentativas de alterar senha, tente novamente mais tarde"
          );
          setModalVisible(true);
        } else {
          setModalTitleError("Erro ao alterar a senha");
          setModalTextError(
            "Ocorreu um erro ao alterar a senha, tente novamente mais tarde"
          );
          setModalVisible(true);
        }
      })
      .finally(() => {
        setLoading(false);
        setLoadingModal(false);
      });
  }, [checkErrors, modalVisible, oldPassword, newPassword, auth, dispatch]);

  return (
    <ContainerChangePassword>
      <Header title="Alterar senha" type="goback" />

      <ChangePasswordContent>
        <Content>
          <Input
            title="Senha atual"
            placeholder="************"
            isPassword
            type="green"
            value={oldPassword}
            onChangeText={(value) => setOldPassword(value)}
            error={error[0]}
          />

          <Input
            title="Nova senha"
            placeholder="************"
            isPassword
            type="green"
            value={newPassword}
            onChangeText={(value) => setNewPassword(value)}
            error={error[1]}
          />

          <Input
            title="Confirmar nova senha"
            placeholder="************"
            isPassword
            type="green"
            value={confirmNewPassword}
            onChangeText={(value) => setConfirmNewPassword(value)}
            error={error[2]}
          />

          <CentralizeView>
            <ButtonSubmit
              title="Confirmar alteração de senha"
              onPress={handleChangePassword}
              loading={loading}
            />
          </CentralizeView>
        </Content>
      </ChangePasswordContent>

      <ModalError
        title={modalTitleError}
        text={modalTextError}
        isVisible={modalVisible}
        isLoading={loadingModal}
        transparent
        onClose={() => setModalVisible(false)}
        onConfirm={handleChangePassword}
      />

      <ModalAlert
        title="Senha alterada!"
        text="Sua senha foi alterada com sucesso"
        isVisible={modalConfirmationVisible}
        transparent
        onConfirm={() => navigate("Profile" as never)}
      />
    </ContainerChangePassword>
  );
}
