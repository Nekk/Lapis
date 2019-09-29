import ApolloClient from "apollo-boost";

export const pictureSize = 50;
export const apiUrl = "http://192.168.2.35:4000/graphql";
export const client = new ApolloClient({
  uri: apiUrl
  // uri: "http://192.168.2.35:4000/graphql"
  // uri: "http://127.0.0.1:4000/graphql"
  // uri: "http://10.0.1.17:4000/graphql"
  // request: async operation => {
  //   const token = await AsyncStorage.getItem('token');
  //   operation.setContext({
  //     headers: {
  //       authorization: token ? `Bearer ${token}` : ''
  //     }
  //   });
  //  }
});
export const PUSH_NOTIFICATION_ENDPOINT =
  "https://exp.host/--/api/v2/push/send";
