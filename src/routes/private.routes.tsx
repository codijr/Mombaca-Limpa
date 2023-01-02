import React from "react";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";

import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { RFValue } from "react-native-responsive-fontsize";
import { ms } from "react-native-size-matters";

import {
  About,
  AddMetrics,
  ChangeEmail,
  ChangePassword,
  Complaint,
  Map,
  Profile,
  Statistics,
} from "../screens";

import { theme } from "../global/styles/theme";

const Stack = createStackNavigator();

function MapTab() {
  return (
    <Stack.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Complaint" component={Complaint} />
    </Stack.Navigator>
  );
}

function ProfileTab() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}

function StatisticsTab() {
  return (
    <Stack.Navigator
      initialRouteName="Statistics"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Statistics" component={Statistics} />
      <Stack.Screen name="AddMetrics" component={AddMetrics} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export function PrivateRoutes() {
  const getTabBarVisibility = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    return routeName !== "About";
  };

  return (
    <Tab.Navigator
      initialRouteName="MapTab"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: theme.colors.backgroundPrimary,
        },
        tabBarActiveTintColor: theme.colors.textWhite,
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.36)",
        tabBarLabelStyle: {
          fontSize: RFValue(10),
          fontFamily: theme.fonts.text300,
          bottom: ms(5),
        },
      }}
    >
      <Tab.Screen
        name="StatisticsTab"
        component={StatisticsTab}
        options={{
          tabBarLabel: "Métricas",
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="chart-box-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MapTab"
        component={MapTab}
        options={{
          tabBarLabel: "Mapa",
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="map-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={({ route }) => ({
          tabBarLabel: "Perfil",
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-outline" color={color} size={size} />
          ),
          tabBarStyle: {
            backgroundColor: theme.colors.backgroundPrimary,
            display: getTabBarVisibility(route) ? "flex" : "none",
          },
        })}
      />
    </Tab.Navigator>
  );
}
