import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import RNFS from "react-native-fs";
import { launchImageLibrary } from "react-native-image-picker";

import { useDispatch, useSelector } from "react-redux";
import { Header, ModalError } from "../../../../components";
import { ProfileButton } from "./components/ProfileButton";

import {
  ContainerTitle,
  ProfileContainer,
  SubtitleProfile,
  TitleProfile,
} from "./style";

import { removeStorage, updateStorage } from "../../../../utils";
import { signOut, updateFirebaseData } from "../../../../services";
import { ProfileAvatar } from "./components/ProfileAvatar";
import { RootState } from "../../../../redux/createStore";
import { User } from "../../../../@types";
import { initialState, setLogin } from "../../../../redux/modules/auth/reducer";

export function Profile() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

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
            ...auth,
            avatar: `data:image/png;base64,${data}`,
          } as User;

          modalErrorVisible && setLoadingModal(true);

          updateFirebaseData("Users", auth.userId, {
            avatar: userUpdate.avatar,
          })
            .then(() => {
              updateStorage("@user", userUpdate);
              dispatch(setLogin(userUpdate));
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
  }, [auth, dispatch, modalErrorVisible]);

  const handleSignOut = useCallback(() => {
    signOut()
      .then(() => {
        console.log("Deslogado com sucesso");
        dispatch(setLogin(initialState));
        removeStorage("@user");
      })
      .catch(() => {
        console.log("Não foi possivel deslogar");
      });
  }, [dispatch]);

  return (
    <ProfileContainer>
      <Header
        headerLeft={<ProfileAvatar onPress={handleGallery} src={auth.avatar} />}
        headerCenter={
          <ContainerTitle>
            <TitleProfile>{auth.name}</TitleProfile>
            <SubtitleProfile>{auth.email}</SubtitleProfile>
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
