import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ProfileButton } from "./components/ProfileButton";
import { Container } from "./style";

export function Profile() {
  const { navigate } = useNavigation();

  return (
    <Container>
      <ProfileButton
        title="Alterar email"
        icon="mail"
        onPress={() => navigate("ChangeEmail" as never)}
      />

      <ProfileButton title="Alterar senha" icon="lock" />

      <ProfileButton title="Sobre" icon="info" />

      <ProfileButton title="Sair" icon="log-out" />
    </Container>
  );
}
