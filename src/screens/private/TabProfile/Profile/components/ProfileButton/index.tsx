import React, { useState } from "react";
import { TouchableOpacityProps } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { RFValue } from "react-native-responsive-fontsize";
import { ProfileButtonContainer, ButtonContent, ButtonText } from "./styles";

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
        <Icon
          name={icon}
          size={RFValue(20)}
          color="#747070"
          style={{ marginRight: 20 }}
        />
        <ButtonText>{title}</ButtonText>
      </ButtonContent>
    </ProfileButtonContainer>
  );
}
