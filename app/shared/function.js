import { AsyncStorage } from "react-native";
import { Alert } from "react-native";
import NavigationService from "./NavigationService";
import { Notifications } from "expo";
import { gql } from "apollo-boost";
import * as Permissions from "expo-permissions";
import { client, PUSH_NOTIFICATION_ENDPOINT } from "../constant";

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

  // client.mutate({
  //   variables:{token: token},
  //   mutation: gql`
  //   mutation StorePushNotiToken($token: String!){
  //     storePushNotiToken(token: $token){token}
  //   }
  //   `
  // })
  // .then(response => console.log(response))
  // .error(error => console.log(error))
};

// export const getPushNotificationsToken = () => {
//   client.query({
//     variables: {username: "username"},
//     query: gql`
//       {
//         getPushNoti
//       }
//     `
//   })
//   .then(response => console.log(response))
//   .error(error => console.log(error))
// }
