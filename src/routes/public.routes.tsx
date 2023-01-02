import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import Icon from "react-native-vector-icons/Feather";

import { ForgetPassword, Login, SignUp } from "../screens";

const Stack = createStackNavigator();

export function PublicRoutes() {
  Icon.loadFont();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Group
        screenOptions={{
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Group>
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
}
