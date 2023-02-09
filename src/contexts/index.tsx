import React from "react";
import { MapContextProvider } from "./MapContext";

export * from "./MapContext";

type ContextProps = {
  children: React.ReactNode;
};

export function Context({ children }: ContextProps) {
  return <MapContextProvider>{children}</MapContextProvider>;
}
