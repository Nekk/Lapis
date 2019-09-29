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
  //   variables:{token: token, username: "username"},
  //   mutation: gql`
  //   mutation StorePushNotiToken($token: String!, $username: String!){
  //     storePushNotiToken(token: $token, username: $username)
  //   }
  //   `
  // })
  // .then(response => console.log(response))
  // .error(error => console.log(error))

  // POST the token to your backend server from where you can retrieve it to send push notifications.
  return fetch(PUSH_NOTIFICATION_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to: token,
      title: "Test Title",
      body: "test body",
      sound: "default"
    })
  });

  // return fetch(constant.apiUrl, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     mutation: `mutation {storePushNotiToken(token:"testt", username:"user")}`
  //     // query: `query { user(username:"A"){
  //     //     firstName,
  //     //     lastName,
  //     //     email,
  //     //     username
  //     //   }
  //     // }`
  //   })
  // }).then(async response => {
  //   console.log(10)
  //   console.log(await response.json())
  //   // console.log(response.json())
  //   // return response.json()
  // })
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
