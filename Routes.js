import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator
} from "react-navigation";
import React from "react";
import { Button, Text, View, Alert, AsyncStorage } from "react-native";
import { Icon } from "react-native-elements";

import HomeScreen from "./app/screen/HomeScreen.js";
import LoginScreen from "./app/screen/LoginScreen";
import RegisterScreen from "./app/screen/RegisterScreen";
import RentScreen from "./app/screen/RentScreen";
import AuthLoadingScreen from "./app/screen/AuthLoadingScreen";
import { _getState, _openDrawer, _signOut } from "./app/shared/function.js";

const s = require("./app/style/style");

const DrawerStack = createDrawerNavigator(
  {
    Home: HomeScreen,
    Rent: RentScreen
    //Profile: ProfileScreen,
    //Others...
  },
  {
    gesturesEnabled: false
  }
);

const DrawerNavigation = createStackNavigator(
  {
    DrawerStack: DrawerStack
  },
  {
    defaultNavigationOptions: {
      title: _getState(),
      headerLeft: (
        <Icon
          containerStyle={s.globalStyle.headerMarginLeft}
          name="bars"
          type="font-awesome"
          onPress={_openDrawer}
        />
      ),
      headerRight: <Button title="Sign Out" onPress={_signOut} />,
      gesturesEnabled: false
    }
  }
);

// login stack
const LoginStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
  // forgottenPasswordScreen: { screen: ForgottenPasswordScreen, navigationOptions: { title: 'Forgot Password' } }
});

// Manifest of possible screens
const AppStack = createStackNavigator(
  {
    LoginStack: LoginStack,
    DrawerStack: DrawerNavigation
  },
  {
    defaultNavigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
);

export const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: LoginStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);
