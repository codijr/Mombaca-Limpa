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
  CompaniesLogo,
} from "./styles";
import { PolicyModal } from "./components/PolicyModal";

import MombacaLogo from "../../../../assets/images/mombaca-logo.png";
import CodiLogo from "../../../../assets/images/codi-logo.png";

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
            <CompaniesLogo source={MombacaLogo} />
            <CompaniesLogo source={CodiLogo} />
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
