import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Login } from "../screens/public/Login";
import { SignUp } from "../screens/public/SignUp";
import { ForgetPassword } from "../screens/public/ForgetPassword";

const Stack = createStackNavigator();

export function PublicRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="SignUp"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Group
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ModalFadeTransition,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Group>
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
}
