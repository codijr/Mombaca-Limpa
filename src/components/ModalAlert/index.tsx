import React, { useEffect } from "react";
import {
  GestureResponderEvent,
  ModalProps,
  StatusBar,
  Modal,
  Platform,
} from "react-native";
import {
  ButtonConfirmModal,
  CorrectIcon,
  ModalBackground,
  ModalContent,
  TextModal,
  TitleModal,
  ButtonText,
  ContentContainer,
} from "./styles";

interface ModalAlertProps extends ModalProps {
  title: string;
  text: string;
  isVisible: boolean;
  onConfirm?: ((event: GestureResponderEvent) => void) | undefined;
}

export function ModalAlert({
  title,
  text,
  isVisible,
  onConfirm,
  ...rest
}: ModalAlertProps) {
  useEffect(() => {
    if (Platform.OS === "android")
      StatusBar.setBackgroundColor(
        isVisible ? "rgba(0, 0, 0, 0.7)" : "#1BB471"
      );
  }, [isVisible]);

  return (
    <Modal visible={isVisible} {...rest}>
      <ModalBackground>
        <ModalContent>
          <ContentContainer>
            <CorrectIcon />
            <TitleModal>{title}</TitleModal>
            <TextModal>{text}</TextModal>
          </ContentContainer>
          <ButtonConfirmModal onPress={onConfirm}>
            <ButtonText>Ok</ButtonText>
          </ButtonConfirmModal>
        </ModalContent>
      </ModalBackground>
    </Modal>
  );
}
