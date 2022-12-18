import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcons from "react-native-vector-icons/Feather";
import { RFValue } from "react-native-responsive-fontsize";
import { ms } from "react-native-size-matters";
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
  StatisticsIcon,
} from "./styles";
import { ChangeEmail } from "../screens/private/TabProfile/ChangeEmail";

const Stack = createStackNavigator();

function MapTab() {
  return (
    <Stack.Navigator
      initialRouteName="Map"
      screenOptions={{
        headerStyle: {
          height: ms(70),
        },
      }}
    >
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          headerShown: false,
        }}
      />
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
          height: ms(70),
        },
        headerTintColor: theme.colors.textWhite,
        ...TransitionPresets.SlideFromRightIOS,
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
      <Stack.Screen
        name="ChangeEmail"
        component={ChangeEmail}
        options={{
          title: "Alterar email",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

function StatisticsTab() {
  return (
    <Stack.Navigator
      initialRouteName="Statistics"
      screenOptions={{
        headerStyle: {
          height: ms(70),
        },
      }}
    >
      <Stack.Screen name="Statistics" component={Statistics} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export function PrivateRoutes() {
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
        options={{
          tabBarLabel: "Perfil",
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
