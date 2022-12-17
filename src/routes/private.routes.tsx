import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Complaint } from "../screens/private/TabMap/Complaint";
import { Map } from "../screens/private/TabMap/Map";
import { Profile } from "../screens/private/TabProfile/Profile";
import { Statistics } from "../screens/private/TabStatistics/Statistics";
import { ChangeEmail } from "../screens/private/TabProfile/ChangeEmail";
import { theme } from "../global/styles/theme"; 

const Stack = createStackNavigator();

function MapTab() {
  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Complaint" component={Complaint} />
    </Stack.Navigator>
  );
}

function ProfileTab() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Profile} />
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
    </Stack.Navigator>
  );
}

function StatisticsTab() {
  return (
    <Stack.Navigator initialRouteName="Statistics">
      <Stack.Screen name="Statistics" component={Statistics} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export function PrivateRoutes() {
  return (
    <Tab.Navigator initialRouteName="MapTab">
      <Tab.Screen name="StatisticsTab" component={StatisticsTab} />
      <Tab.Screen name="MapTab" component={MapTab} />
      <Tab.Screen name="ProfileTab" component={ProfileTab} />
    </Tab.Navigator>
  );
}
