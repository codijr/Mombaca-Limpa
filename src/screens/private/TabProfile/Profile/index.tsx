import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
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

export function Profile() {
  const { navigate } = useNavigation();
  const { setIsAuth } = useAuth();

  const handleSignOut = useCallback(() => {
    setIsAuth(false);
  }, [setIsAuth]);

  return (
    <>
      <Header
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft={() => (
          <ImageProfile
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFtPdoUstm8sKQH99usU7SCKcyqHNwhcJ7WonkIE9Rr-r0b-O3b0iATAP66sVtdH1NEow&usqp=CAU",
            }}
          />
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

        <ProfileButton title="Alterar senha" icon="lock" />

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
