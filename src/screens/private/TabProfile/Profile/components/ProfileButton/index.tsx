import React, { useState } from "react";
import { TouchableOpacityProps } from "react-native";
import {
  ProfileButtonContainer,
  ButtonContent,
  ButtonText,
  ButtonIcon,
} from "./styles";

interface ProfileButtonProps extends TouchableOpacityProps {
  title: string;
  icon: string;
}

export function ProfileButton({ title, icon, ...rest }: ProfileButtonProps) {
  const [click, setClick] = useState(false);

  return (
    <ProfileButtonContainer
      onPressIn={() => setClick(true)}
      onPressOut={() => setClick(false)}
      style={{
        backgroundColor: click ? "#d6d6d6" : "transparent",
      }}
      {...rest}
    >
      <ButtonContent>
        <ButtonIcon name={icon} />
        <ButtonText>{title}</ButtonText>
      </ButtonContent>
    </ProfileButtonContainer>
  );
}
