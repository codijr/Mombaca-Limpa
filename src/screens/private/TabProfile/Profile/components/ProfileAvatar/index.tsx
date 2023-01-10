import react from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { ImageProfile } from "./styles";

interface ProfileAvatarProps extends TouchableOpacityProps {
  src: string | undefined;
}

export function ProfileAvatar({ src, ...rest }: ProfileAvatarProps) {
  return (
    <TouchableOpacity {...rest}>
      <ImageProfile
        source={{
          uri: src,
        }}
      />
    </TouchableOpacity>
  );
}
