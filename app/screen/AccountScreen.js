import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  AsyncStorage,
  Image
} from "react-native";
import { ThemeProvider, Button } from "react-native-elements";

const s = require("../style/style");
const assets = require("../../assets/index");
const constant = require("../constant");

export default class AccountScreen extends Component {
  state = {
    username: null
  };

  componentDidMount = async () => {
    this.setState({
      username: await AsyncStorage.getItem("username"),
      pictureUrl: await AsyncStorage.getItem("pictureUrl")
    });
  };

  _onPressEdit = () => {};

  render() {
    return (
      <View style={s.globalStyle.container}>
        <Text style={styles.headerTextStyle}>Account Settings</Text>
        <View style={s.globalStyle.profilePicContainer}>
          {this.state.pictureUrl ? (
            <Image
              style={styles.profilePictureStyle}
              source={{ uri: this.state.pictureUrl }}
            />
          ) : (
            <Image
              style={styles.profilePictureStyle}
              source={assets.anonymous}
            />
          )}
          <Button type="clear" title="Edit" />
          {this.state.username ? (
            <Text>{this.state.username}</Text>
          ) : (
            <Text>firstName lastName</Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerTextStyle: {
    fontSize: s.height * 0.03,
    marginBottom: s.height * 0.03
  },
  profilePictureStyle: {
    height: constant.pictureSize,
    width: constant.pictureSize,
    borderRadius: constant.pictureSize / 2,
    overflow: "hidden"
  }
});
