import React from "react";
import { AuthContextProvider } from "./AuthContext";
import { MapContextProvider } from "./MapContext";

export * from "./AuthContext";
export * from "./MapContext";

type ContextProps = {
  children: React.ReactNode;
};

export function Context({ children }: ContextProps) {
  return (
    <AuthContextProvider>
      <MapContextProvider>{children}</MapContextProvider>
    </AuthContextProvider>
  );
}
