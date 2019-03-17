import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { create } from 'uuid-js';

import HomeScreen from './app/screen/HomeScreen.js';
import DetailsScreen from './app/screen/DetailsScreen'; 
import LoginScreen from './app/screen/LoginScreen';
import RegisterScreen from './app/screen/RegisterScreen'
import RentScreen from './app/screen/RentScreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Login: LoginScreen,
    Register: RegisterScreen,
    Rent: RentScreen
  },
  {
    initialRouteName: 'Login'
  }
)
const AppContainer = createAppContainer(AppNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default AppContainer