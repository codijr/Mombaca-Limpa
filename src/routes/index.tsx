import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { PrivateRoutes } from "./private.routes";
import { PublicRoutes } from "./public.routes";
import { useAuth } from "../contexts/AuthContext";

export function Routes() {
  const { isAuth } = useAuth();

  return (
    <NavigationContainer>
      {isAuth ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
}
