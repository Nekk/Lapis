import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, AsyncStorage } from "react-native";
import { ThemeProvider, Button } from "react-native-elements";

const s = require("../style/style");

export default class PaymentScreen extends Component {
  render() {
    return (
      <View style={s.globalStyle.container}>
        <Text>Payment Screen</Text>
      </View>
    );
  }
}
