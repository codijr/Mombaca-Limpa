import React from "react";
import { Text } from "react-native";
import {
  ContainerProfile,
  Content,
  ProfileContent,
  ProfileButtons,
  TextProf,
  ButtonsContent,
} from "./style";
import Icon from "react-native-vector-icons/Feather";
import { theme } from "../../../../global/styles/theme";

export function Profile() {
  return (
    <ContainerProfile>
      <ProfileContent>
        <Content>
          <ButtonsContent>
            <ProfileButtons>
              <Icon name="mail" size={35} color={theme.colors.textGray} />
              <TextProf>Alterar email</TextProf>
            </ProfileButtons>
            <ProfileButtons>
              <Icon name="lock" size={35} color={theme.colors.textGray} />
              <TextProf>Alterar senha</TextProf>
            </ProfileButtons>
            <ProfileButtons>
              <Icon name="info" size={35} color={theme.colors.textGray} />
              <TextProf>Sobre</TextProf>
            </ProfileButtons>
            <ProfileButtons>
              <Icon name="log-out" size={35} color={theme.colors.textGray} />
              <TextProf>Sair</TextProf>
            </ProfileButtons>
          </ButtonsContent>
        </Content>
      </ProfileContent>
    </ContainerProfile>
  );
}
