import { AsyncStorage } from "react-native";
import { Alert } from "react-native";
import NavigationService from "./NavigationService";
import { Permissions, Notifications } from "expo";

export const _openDrawer = () => {
  NavigationService.openDrawer();
};

export const _signOut = async () => {
  await AsyncStorage.clear();
  NavigationService.navigate("Auth");
};

export const _navigate = (routeName, params) => {
  NavigationService.navigate(routeName, params);
};

export const _getState = () => {
  return NavigationService.getState();
};

export const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== "granted") {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }
  // console.log("finalStatus = ")
  // console.log(finalStatus)
  // Stop here if the user did not grant permissions
  if (finalStatus !== "granted") {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  // console.log("token = ")
  // console.log(token)

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  // return fetch(PUSH_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //     user: {
  //       username: 'Brent',
  //     },
  //   }),
  // });
};
