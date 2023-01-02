import React, { ReactNode, useState } from "react";
import { TouchableOpacityProps } from "react-native";
import { ButtonContainer } from "./styles";
import { theme } from "../../../../../../global/styles/theme";

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode;
}

export function Button({ children, ...rest }: ButtonProps) {
  const [click, setClick] = useState(false);

  return (
    <ButtonContainer
      onPressIn={() => setClick(true)}
      onPressOut={() => setClick(false)}
      style={{
        backgroundColor: click ? "#d6d6d6" : theme.colors.backgroundWhite,
      }}
      {...rest}
    >
      {children}
    </ButtonContainer>
  );
}
