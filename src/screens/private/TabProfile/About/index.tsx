import React, { useState } from "react";
import { Header } from "../../../../components/Header";
import {
  PrivacyPoliceButton,
  BottomView,
  Companies,
  Container,
  LogoVertical,
  PrivacyPolicyText,
  VersionText,
} from "./styles";
import Codi from "../../../../assets/icons/logo-codi.svg";
import Mombaça from "../../../../assets/icons/logo-mombaça.svg";
import { PolicyModal } from "./components/PolicyModal";

export function About() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Header title="Sobre" type="goback" />
      <Container>
        <LogoVertical />
        <VersionText>Versão 1.0.0</VersionText>
        <BottomView>
          <PrivacyPoliceButton onPress={() => setModalVisible(!modalVisible)}>
            <PrivacyPolicyText>Política de privacidade</PrivacyPolicyText>
          </PrivacyPoliceButton>
          <Companies>
            <Mombaça />
            <Codi />
          </Companies>
        </BottomView>
      </Container>
      <PolicyModal
        title="Política de privacidade"
        isVisible={modalVisible}
        transparent
        onConfirm={() => setModalVisible(false)}
      />
    </>
  );
}
