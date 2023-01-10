import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import RNFS from "react-native-fs";
import { launchImageLibrary } from "react-native-image-picker";

import { User, useAuth } from "../../../../contexts";

import { Header, ModalError } from "../../../../components";
import { ProfileButton } from "./components/ProfileButton";

import {
  ContainerTitle,
  ProfileContainer,
  SubtitleProfile,
  TitleProfile,
} from "./style";

import { removeStorage } from "../../../../utils";
import { signOut, updateFirebaseData } from "../../../../services";
import { ProfileAvatar } from "./components/ProfileAvatar";

export function Profile() {
  const { navigate } = useNavigation();
  const { user, setUser } = useAuth();

  const [modalErrorVisible, setModalErrorVisible] = React.useState(false);
  const [loadingModal, setLoadingModal] = React.useState(false);

  const handleGallery = useCallback(async () => {
    await launchImageLibrary({
      maxHeight: 200,
      maxWidth: 200,
      quality: 1,
      selectionLimit: 1,
      includeBase64: false,
      mediaType: "photo",
    }).then(async (result) => {
      if (result?.assets && result?.assets[0]?.uri) {
        await RNFS.readFile(result.assets[0]?.uri, "base64").then((data) => {
          const userUpdate = {
            ...user,
            avatar: `data:image/png;base64,${data}`,
          } as User;

          modalErrorVisible && setLoadingModal(true);

          updateFirebaseData("Users", user?.userId, {
            avatar: userUpdate.avatar,
          })
            .then(() => {
              setUser(userUpdate);
            })
            .catch(() => {
              setModalErrorVisible(true);
            })
            .finally(() => {
              setLoadingModal(false);
            });
        });
      }
    });
  }, [modalErrorVisible, setUser, user]);

  const handleSignOut = useCallback(() => {
    signOut()
      .then(() => {
        console.log("Deslogado com sucesso");
        setUser(null);
        removeStorage("@user");
      })
      .catch(() => {
        console.log("Não foi possivel deslogar");
      });
  }, [setUser]);

  return (
    <ProfileContainer>
      <Header
        headerLeft={
          <ProfileAvatar onPress={handleGallery} src={user?.avatar} />
        }
        headerCenter={
          <ContainerTitle>
            <TitleProfile>{user?.name}</TitleProfile>
            <SubtitleProfile>{user?.email}</SubtitleProfile>
          </ContainerTitle>
        }
      />

      <ProfileButton
        title="Alterar email"
        icon="mail"
        onPress={() => navigate("ChangeEmail" as never)}
      />

      <ProfileButton
        title="Alterar senha"
        icon="lock"
        onPress={() => navigate("ChangePassword" as never)}
      />

      <ProfileButton
        title="Sobre"
        icon="info"
        onPress={() => navigate("About" as never)}
      />

      <ProfileButton title="Sair" icon="log-out" onPress={handleSignOut} />

      <ModalError
        title="Falha ao alterar imagem"
        text="Não foi possível enviar a imagem, tente novamente mais tarde."
        isVisible={modalErrorVisible}
        isLoading={loadingModal}
        onClose={() => setModalErrorVisible(false)}
        transparent
        onConfirm={handleGallery}
      />
    </ProfileContainer>
  );
}
