import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import { create } from 'uuid-js';

import HomeScreen from './app/screen/HomeScreen.js';
import LoginScreen from './app/screen/LoginScreen';
import RegisterScreen from './app/screen/RegisterScreen'
import RentScreen from './app/screen/RentScreen';
import AuthLoadingScreen from './app/screen/AuthLoadingScreen'

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
    Register: RegisterScreen,
    Rent: RentScreen
  },
  // {
  //   initialRouteName: 'Login'
  // }
)

const AuthStack = createStackNavigator({ Login: LoginScreen })

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer