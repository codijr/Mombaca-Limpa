import React, { ReactNode } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  HeaderCenter,
  HeaderContainer,
  HeaderIcon,
  HeaderLeft,
  HeaderTitle,
} from "./styles";

type HeaderProps = {
  title?: string;
  type?: "goback";
  headerCenter?: () => ReactNode;
  headerLeft?: () => ReactNode;
};

export function Header({ title, type, headerCenter, headerLeft }: HeaderProps) {
  const { goBack } = useNavigation();

  return (
    <HeaderContainer>
      <HeaderLeft>
        {headerLeft
          ? headerLeft()
          : type === "goback" && (
              <HeaderIcon name="arrow-left" onPress={goBack} />
            )}
      </HeaderLeft>

      <HeaderCenter>
        {headerCenter ? headerCenter() : <HeaderTitle>{title}</HeaderTitle>}
      </HeaderCenter>
    </HeaderContainer>
  );
}
