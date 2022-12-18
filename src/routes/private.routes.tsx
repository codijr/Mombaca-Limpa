import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Complaint } from "../screens/private/TabMap/Complaint";
import { Map } from "../screens/private/TabMap/Map";
import { Profile } from "../screens/private/TabProfile/Profile";
import { Statistics } from "../screens/private/TabStatistics/Statistics";
import { theme } from "../global/styles/theme";
import {
  TitleProfile,
  Container,
  SubtitleProfile,
  ImageProfile,
} from "./styles";

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
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.backgroundPrimary,
          elevation: 0,
          shadowOpacity: 0,
          height: 70,
        },
        headerTintColor: theme.colors.textWhite,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => (
            <ImageProfile
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFtPdoUstm8sKQH99usU7SCKcyqHNwhcJ7WonkIE9Rr-r0b-O3b0iATAP66sVtdH1NEow&usqp=CAU",
              }}
            />
          ),
          headerLeftContainerStyle: {
            marginLeft: 20,
          },
          title: "",
          // eslint-disable-next-line react/no-unstable-nested-components
          headerTitle: () => (
            <Container>
              <TitleProfile>Igaaoo</TitleProfile>
              <SubtitleProfile>igaaoo@gmail.com</SubtitleProfile>
            </Container>
          ),
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
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
