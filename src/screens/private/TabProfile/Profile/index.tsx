import React from "react";
import { ProfileButton } from "./components/ProfileButton";
import { Container } from "./style";

export function Profile() {
  return (
    <Container>
      <ProfileButton title="Alterar email" icon="mail" />

      <ProfileButton title="Alterar senha" icon="lock" />

      <ProfileButton title="Sobre" icon="info" />

      <ProfileButton title="Sair" icon="log-out" />
    </Container>
  );
}
