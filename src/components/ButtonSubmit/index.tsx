import React, { useState } from "react";
import { TouchableHighlightProps } from "react-native";
import { theme } from "../../global/styles/theme";
import { Container, ButtonText } from "./styles";

interface ButtonSubmitProps extends TouchableHighlightProps {
  title: string;
}

export function ButtonSubmit({ title, ...rest }: ButtonSubmitProps) {
  const [click, setClick] = useState(false);

  return (
    <Container
      onPressIn={() => setClick(true)}
      onPressOut={() => setClick(false)}
      style={{
        backgroundColor: click ? "#5FE7A0" : theme.colors.primaryExtraDark,
      }}
      {...rest}
    >
      <ButtonText>{title}</ButtonText>
    </Container>
  );
}
