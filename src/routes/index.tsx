import React, { useCallback, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { PrivateRoutes } from "./private.routes";
import { PublicRoutes } from "./public.routes";
import { useAuth } from "../contexts/AuthContext";
import { getStorage } from "../utils";
import { reauthenticateWithCredential } from "../services";

export function Routes() {
  const { user, setUser } = useAuth();

  useEffect(() => {
    (async () => {
      await getStorage("@user").then((response) => {
        if (response) {
          reauthenticateWithCredential(response.password).then(() => {
            setUser(response);
          });
        }
        response ? setUser(response) : setUser(null);
      });
    })();
  }, [setUser]);

  return (
    <NavigationContainer>
      {user ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
}
