import { createAppContainer } from "react-navigation";
import { SwitchNavigator } from "./Routes";
import { AsyncStorage } from "react-native";
import { ApolloProvider } from "react-apollo";
import React from "react";
import NavigationService from "./app/shared/NavigationService";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://192.168.2.35:4000/graphql"
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

const AppContainer = createAppContainer(SwitchNavigator);

// client
//   .query({
//     query: gql`
//       {
//         rates(currency: "USD") {
//           currency
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

// client
//   .query({
//     query: gql`
//       {
//         books{
//           title,
//           author
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </ApolloProvider>
      // <AppContainer
      //   ref={navigatorRef => {
      //     NavigationService.setTopLevelNavigator(navigatorRef);
      //   }}
      // />
    );
  }
}

// AppRegistry.registerComponent('App', () => App)
