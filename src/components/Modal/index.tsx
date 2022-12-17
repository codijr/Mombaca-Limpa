import React from "react";
import { ModalProps, StatusBar } from "react-native";
import {
  ButtonConfirmModal,
  CorrectIcon,
  ModalBackground,
  ModalContainer,
  ModalContent,
  TextModal,
  TitleModal,
  ButtonText,
  ContentContainer,
} from "./styles";

interface ModalAlertProps extends ModalProps {
  title: string;
  text: string;
}

export function Modal({ title, text, ...rest }: ModalAlertProps) {
  return (
    <>
      <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
      <ModalContainer {...rest}>
        <ModalBackground>
          <ModalContent>
            <ContentContainer>
              <CorrectIcon />
              <TitleModal>{title}</TitleModal>
              <TextModal>{text}</TextModal>
            </ContentContainer>
            <ButtonConfirmModal>
              <ButtonText>Ok</ButtonText>
            </ButtonConfirmModal>
          </ModalContent>
        </ModalBackground>
      </ModalContainer>
    </>
  );
}
