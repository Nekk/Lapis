import { AsyncStorage } from "react-native";
import { Alert } from "react-native";
import NavigationService from "./NavigationService";
import { Notifications } from "expo";
import { gql } from "apollo-boost";
import * as Permissions from "expo-permissions";
import { client } from "../constant";

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
  let userIdStr = await AsyncStorage.getItem("userId");
  let userId = Number(userIdStr);

  // don't forget to check whether the push notification token has been stored before
  // storing it.
  await client.mutate({
    variables: { token: token, userId: userId },
    mutation: gql`
      mutation StorePushNotiToken($token: String!, $userId: Int!) {
        storePushNotiToken(token: $token, userId: $userId) {
          token
        }
      }
    `
  });
  // .then(response => console.log(response))
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
