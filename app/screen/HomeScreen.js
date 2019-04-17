import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, AsyncStorage } from "react-native";
import { ThemeProvider, Button } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const s = require("../style/style");

export default class HomeScreen extends Component {
  static navigationOptions = {
    title: "Home"
  };

  constructor(props) {
    super(props);
  }

  _onPressRent = () => {
    this.props.navigation.navigate("Rent");
  };

  _openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  render() {
    return (
      <ThemeProvider theme={s.theme}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          />
        </View>
        <View style={styles.container}>
          <Button title="Rent" onPress={this._onPressRent} />
          {/* <Button title="Rent" onPress={() => {this.props.navigation.openDrawer()}}></Button> */}
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: s.height * 0.05,
    justifyContent: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: s.height * 0.78
  }
});
