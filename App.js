import { createAppContainer } from "react-navigation";
import { SwitchNavigator } from "./Routes";
import { AsyncStorage } from "react-native";
import { ApolloProvider } from "react-apollo";
import React from "react";
import NavigationService from "./app/shared/NavigationService";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { client } from "./app/constant";

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
