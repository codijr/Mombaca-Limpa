import React, { useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { PrivateRoutes } from "./private.routes";
import { PublicRoutes } from "./public.routes";
import { getStorage } from "../utils";
import { reauthenticateWithCredential } from "../services";
import { RootState } from "../redux/createStore";
import { setLogin } from "../redux/modules/auth/reducer";

export function Routes() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await getStorage("@user").then((response) => {
        if (response) {
          reauthenticateWithCredential(response.password).then(() => {
            dispatch(setLogin(response));
          });
        }
      });
    })();
  }, []);

  useEffect(() => {
    console.log(auth.userId);
  }, [auth.userId]);

  return (
    <NavigationContainer>
      {auth.userId ? <PrivateRoutes /> : <PublicRoutes />}
    </NavigationContainer>
  );
}
