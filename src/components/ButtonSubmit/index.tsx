import React, { useState } from "react";
import { theme } from "../../global/styles/theme";
import { Container, ButtonText } from "./styles";

interface ButtonSubmitProps {
  title: string;
}

export function ButtonSubmit({ title }: ButtonSubmitProps) {
  const [click, setClick] = useState(false);

  return (
    <Container
      onPressIn={() => setClick(true)}
      onPressOut={() => setClick(false)}
      style={{
        backgroundColor: click ? "#5FE7A0" : theme.colors.primaryExtraDark,
      }}
    >
      <ButtonText>{title}</ButtonText>
    </Container>
  );
}
