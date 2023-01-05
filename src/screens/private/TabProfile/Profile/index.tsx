import React, { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import RNFS from "react-native-fs";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { LogBox, TouchableOpacity, View } from "react-native";
import { ProfileButton } from "./components/ProfileButton";
import {
  Container,
  ContainerTitle,
  ImageProfile,
  SubtitleProfile,
  TitleProfile,
} from "./style";
import { Header } from "../../../../components/Header";
import { User, useAuth } from "../../../../contexts/AuthContext";
import { removeStorage } from "../../../../utils";

export function Profile() {
  const { navigate } = useNavigation();
  const { user, setUser } = useAuth();

  const handleGallery = useCallback(async () => {
    await launchImageLibrary({
      maxHeight: 200,
      maxWidth: 200,
      quality: 1,
      selectionLimit: 1,
      includeBase64: false,
      mediaType: "photo",
    })
      .then(async (result) => {
        if (result?.assets && result?.assets[0]?.uri) {
          await RNFS.readFile(result.assets[0]?.uri, "base64").then((data) => {
            const userUpdate = {
              ...user,
              avatar: `data:image/png;base64,${data}`,
            } as User;
            setUser(userUpdate);
          });
        }
      })
      .catch(() => {
        console.log("Não foi possivel selecionar a imagem");
      });
  }, [setUser, user]);

  const handleSignOut = useCallback(() => {
    removeStorage("@user").then(() => {
      setUser(null);
      auth().signOut();
    });
  }, [setUser]);

  return (
    <>
      <Header
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft={() => (
          <TouchableOpacity onPress={handleGallery}>
            <ImageProfile
              source={{
                uri: user?.avatar,
              }}
            />
          </TouchableOpacity>
        )}
        // eslint-disable-next-line react/no-unstable-nested-components
        headerCenter={() => (
          <ContainerTitle>
            <TitleProfile>{user?.name}</TitleProfile>
            <SubtitleProfile>{user?.email}</SubtitleProfile>
          </ContainerTitle>
        )}
      />
      <Container>
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
      </Container>
    </>
  );
}
