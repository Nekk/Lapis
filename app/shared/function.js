import { AsyncStorage } from "react-native";
import { Alert } from "react-native";
import NavigationService from "./NavigationService";

export const _openDrawer = () => {
  NavigationService.openDrawer();
};

export const _signOut = async () => {
  await AsyncStorage.clear();
  NavigationService.navigate("Auth");
};

export const _getState = () => {
  return NavigationService.getState();
};
