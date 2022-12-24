import React, { useState } from "react";
import { TextInputProps } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { theme } from "../../global/styles/theme";
import {
  AlertText,
  Container,
  InputText,
  InputTitle,
  InputWrapper,
  ShowPasswordButton,
} from "./styles";

interface InputProps extends TextInputProps {
  title: string;
  placeholder: string;
  isPassword?: boolean;
  type?: "green" | "white";
  error?: string;
}

export function Input({
  title,
  placeholder,
  isPassword,
  type,
  error,
  ...rest
}: InputProps) {
  Icon.loadFont();
  const [visiblePassword, setVisiblePassword] = useState(false);

  return (
    <Container>
      <InputTitle
        style={{
          color:
            type === "green" ? theme.colors.primary : theme.colors.textWhite,
        }}
      >
        {title}
      </InputTitle>
      <InputWrapper
        style={{
          borderWidth: error ? 2 : 0,
          borderColor: error
            ? `${theme.colors.alert}`
            : `${theme.colors.backgroundWhite}`,
        }}
      >
        <InputText
          placeholder={placeholder}
          secureTextEntry={isPassword && !visiblePassword}
          style={{
            width: isPassword ? "80%" : "100%",
          }}
          {...rest}
        />

        {isPassword && (
          <ShowPasswordButton
            onPress={() => setVisiblePassword(!visiblePassword)}
          >
            <Icon
              name={visiblePassword ? "eye-off" : "eye"}
              color={`${theme.colors.primary}`}
              size={25}
            />
          </ShowPasswordButton>
        )}
      </InputWrapper>
      <AlertText>{error || " "}</AlertText>
    </Container>
  );
}
