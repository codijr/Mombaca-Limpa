import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Login } from "../screens/public/Login";
import { SignUp } from "../screens/public/SignUp";
import { ForgetPassword } from "../screens/public/ForgetPassword";
import { ChangeEmail } from "../screens/private/TabProfile/ChangeEmail";
import { theme } from "../global/styles/theme";

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
      <Stack.Screen name="ChangeEmail" component={ChangeEmail} 
        options={{
          title: 'Alterar email',
          headerStyle: {
            backgroundColor: theme.colors.primary
          },
          headerTintColor: theme.colors.textWhite,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: theme.fonts.title600
          }
        }}
      />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
}
