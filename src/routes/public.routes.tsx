import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Feather";
import { Login } from "../screens/public/Login";
import { SignUp } from "../screens/public/SignUp";
import { ForgetPassword } from "../screens/public/ForgetPassword";
import { theme } from "../global/styles/theme";

const Stack = createStackNavigator();

export function PublicRoutes() {
  Icon.loadFont();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerTintColor: theme.colors.textWhite,
        headerStyle: {
          backgroundColor: theme.colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
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
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          title: "",
        }}
      />
    </Stack.Navigator>
  );
}
