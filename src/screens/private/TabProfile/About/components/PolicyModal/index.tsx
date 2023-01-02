import React, { useEffect } from "react";
import {
  GestureResponderEvent,
  ModalProps,
  StatusBar,
  Modal,
  TouchableOpacity,
} from "react-native";
import Close from "../../../../../../assets/icons/icon-close.svg";
import {
  ModalBackground,
  ModalContent,
  TextModal,
  TitleModal,
  ContentContainer,
  HeaderContainer,
  SubtitleText,
} from "./styles";
import { theme } from "../../../../../../global/styles/theme";

interface ModalAlertProps extends ModalProps {
  title: string;
  isVisible: boolean;
  onConfirm?: ((event: GestureResponderEvent) => void) | undefined;
}

export function PolicyModal({
  title,
  isVisible,
  onConfirm,
  ...rest
}: ModalAlertProps) {
  useEffect(() => {
    StatusBar.setBackgroundColor(isVisible ? "rgba(0, 0, 0, 0.7)" : "#1BB471");
  }, [isVisible]);

  return (
    <Modal visible={isVisible} {...rest}>
      <ModalBackground>
        <ModalContent>
          <HeaderContainer>
            <TitleModal>{title}</TitleModal>
            <TouchableOpacity onPress={onConfirm}>
              <Close />
            </TouchableOpacity>
          </HeaderContainer>
          <ContentContainer>
            <SubtitleText>
              SOBRE NÓS E ESTA POLÍTICA DE PRIVACIDADE
            </SubtitleText>

            <TextModal>
              Sua privacidade é muito importante para nós da Secretaria do Meio
              Ambiente de Mombaça, sempre usaremos suas informações pessoais
              apenas para os fins descritos nesta Política de Privacidade. Esta
              política também permitirá que você saiba quais informações são
              coletadas por nossos provedores de serviços terceirizados e
              fornece um link para como você pode descobrir como eles as usam.
            </TextModal>

            <SubtitleText>INFORMAÇÕES QUE COLETAMOS DE VOCÊ</SubtitleText>

            <TextModal>
              Sua privacidade é muito importante para nós da Secretaria do Meio
              Ambiente de Mombaça, sempre usaremos suas informações pessoais
              apenas para os fins descritos nesta Política de Privacidade. Esta
              política também permitirá que você saiba quais informações são
              coletadas por nossos provedores de serviços terceirizados e
              fornece um link para como você pode descobrir como eles as usam.
              Sua privacidade é muito importante para nós da Secretaria do Meio
              Ambiente de Mombaça. Sua privacidade é muito importante para nós
              da Secretaria do Meio Ambiente de Mombaça, sempre usaremos suas
              informações pessoais apenas para os fins descritos nesta Política
              de Privacidade. Esta política também permitirá que você saiba
              quais informações são coletadas por nossos provedores de serviços
              terceirizados e fornece um link para como você pode descobrir como
              eles as usam. Sua privacidade é muito importante para nós da
              Secretaria do Meio Ambiente de Mombaça. Sua privacidade é muito
              importante para nós da Secretaria do Meio Ambiente de Mombaça,
              sempre usaremos suas informações pessoais apenas para os fins
              descritos nesta Política de Privacidade. Esta política também
              permitirá que você saiba quais informações são coletadas por
              nossos provedores de serviços terceirizados e fornece um link para
              como você pode descobrir como eles as usam. Sua privacidade é
              muito importante para nós da Secretaria do Meio Ambiente de
              Mombaça.
            </TextModal>
          </ContentContainer>
        </ModalContent>
      </ModalBackground>
    </Modal>
  );
}
