import React, { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  ButtonSubmit,
  Header,
  Input,
  ModalAlert,
  ModalError
} from "../../../../components";

import {
  ContainerChangePassword,
  ChangePasswordContent,
  Content,
} from "./styles";

import { CentralizeView } from "../../../../global/styles/theme";

import { User, useAuth } from "../../../../contexts";

import {
  updateStorage,
  validateInputPassword,
} from "../../../../utils";

import {
  changePassword,
  reauthenticateWithCredential,
  updateFirebaseData,
} from "../../../../services";

export function ChangePassword() {
  const { user, setUser } = useAuth();

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
    if (
      !validateInputPassword(newPassword, confirmNewPassword)
    )
      return true;
    setError([
      validateInputPassword(newPassword, confirmNewPassword),
    ]);
  }, [newPassword, confirmNewPassword]);

  const handleChangePassword = useCallback(() => {
    if (!checkErrors()) return;

    modalVisible ? setLoadingModal(true) : setLoading(true);

    reauthenticateWithCredential(oldPassword)
      .then(() => {
        changePassword(newPassword, oldPassword)
          .then(() => {
            updateFirebaseData("Users", user?.userId, { password: newPassword })
              .then(() => {
                const newUser = { ...user, password: newPassword } as User;
                updateStorage("@user", { password: newPassword });
                setUser(newUser);
                setModalConfirmationVisible(true);
              })
              .catch(() => {
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
        if (err.code === "auth/wrong-password") {
          setError(["", "Senha incorreta, por favor digite a senha correta"]);
        }
      })
      .finally(() => {
        setLoading(false);
        setLoadingModal(false);
      });
  }, [checkErrors, modalVisible, oldPassword, newPassword, user, setUser]);

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
