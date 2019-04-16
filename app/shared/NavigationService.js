import { NavigationActions, DrawerActions } from "react-navigation";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

function getState() {
  return NavigationActions.state;
}

function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer());
}

// add other navigation functions that you need and export them

export default {
  navigate,
  openDrawer,
  setTopLevelNavigator,
  getState
};
