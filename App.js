import { createAppContainer } from "react-navigation";
import { SwitchNavigator } from "./Routes";
import { ApolloProvider } from "react-apollo";
import React from "react";
import NavigationService from "./app/shared/NavigationService";
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  // uri: "https://48p1r2roz4.sse.codesandbox.io"
  uri: "http://192.168.2.35:4000/graphql"
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
      // <ApolloProvider client={client}>
      //   <AppContainer
      //     ref={navigatorRef => {
      //       NavigationService.setTopLevelNavigator(navigatorRef);
      //     }}
      //   />
      // </ApolloProvider>
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

// AppRegistry.registerComponent('App', () => App)
