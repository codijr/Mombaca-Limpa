import React, { useCallback, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { PrivateRoutes } from "./private.routes";
import { PublicRoutes } from "./public.routes";
import { useAuth } from "../contexts/AuthContext";
import { getStorage } from "../utils";
import { reauthenticateWithCredential } from "../services";

export function Routes() {
  const { user, setUser } = useAuth();

  return (
    <NavigationContainer>
      {user ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
}
