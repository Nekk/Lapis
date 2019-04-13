import { createAppContainer } from "react-navigation";
import { SwitchNavigator } from "./Routes";
import React from "react";
import NavigationService from "./app/shared/NavigationService";

const AppContainer = createAppContainer(SwitchNavigator);

export default class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
