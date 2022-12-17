import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { Login } from "../screens/public/Login";
import { SignUp } from "../screens/public/SignUp";
import { ForgetPassword } from "../screens/public/ForgetPassword";
import { ChangeEmail } from "../screens/private/TabProfile/ChangeEmail";
import { theme } from "../global/styles/theme";

const Stack = createStackNavigator();

export function PublicRoutes() {
  Icon.loadFont();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Group
        screenOptions={{
          headerShown: false,
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
