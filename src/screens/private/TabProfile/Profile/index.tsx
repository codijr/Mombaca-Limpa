import React, { useCallback } from "react";
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
import { useAuth } from "../../../../contexts/AuthContext";
import { removeStorage } from "../../../../utils";

export function Profile() {
  LogBox.ignoreLogs(["Warning: ..."]);

  const { navigate } = useNavigation();
  const { setIsAuth } = useAuth();

  const handleGallery = useCallback(async () => {
    await launchCamera({
      maxHeight: 200,
      maxWidth: 200,
      quality: 1,
      includeBase64: false,
      mediaType: "photo",
    }).then((result) => {
      console.log(result);

      // if (result?.assets && result?.assets[0]?.uri) {
      //   RNFS.readFile(result.assets[0]?.uri, "base64").then((data) => {
      //     console.log(`data:image/png;base64,${data}`);
      //   });
      // }
    });
    // await launchImageLibrary({
    //   maxHeight: 200,
    //   maxWidth: 200,
    //   quality: 1,
    //   selectionLimit: 1,
    //   includeBase64: false,
    //   mediaType: "photo",
    // })
    //   .then(async (result) => {
    //     if (result?.assets && result?.assets[0]?.uri) {
    //       await RNFS.readFile(result.assets[0]?.uri, "base64").then((data) => {
    //         console.log(`data:image/png;base64,${data}`);
    //       });
    //     }
    //   })
    //   .catch(() => {
    //     console.log("Não foi possivel selecionar a imagem");
    //   });
  }, []);

  const handleSignOut = useCallback(() => {
    removeStorage("@user").then(() => {
      setIsAuth(false);
      auth().signOut();
    });
  }, [setIsAuth]);

  return (
    <>
      <Header
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft={() => (
          <TouchableOpacity onPress={handleGallery}>
            <ImageProfile
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFtPdoUstm8sKQH99usU7SCKcyqHNwhcJ7WonkIE9Rr-r0b-O3b0iATAP66sVtdH1NEow&usqp=CAU",
              }}
            />
          </TouchableOpacity>
        )}
        // eslint-disable-next-line react/no-unstable-nested-components
        headerCenter={() => (
          <ContainerTitle>
            <TitleProfile>Igaaoo</TitleProfile>
            <SubtitleProfile>igaaoo@gmail.com</SubtitleProfile>
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
