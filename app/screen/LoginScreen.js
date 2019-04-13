import React, { Component } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ImageBackground,
  Image,
  AsyncStorage
} from "react-native";
import { ThemeProvider, Button, Input } from "react-native-elements";

const s = require("../style/style");
const assets = require("../../assets/index");

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: "Login",
    header: null
  };

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("DrawerStack");
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ThemeProvider theme={s.theme}>
        <View style={s.globalStyle.container}>
          <ImageBackground
            source={require("../../assets/bg/loginBg2.jpg")}
            style={s.globalStyle.bgStyle}
          >
            <Image source={assets.logoSrc} style={s.globalStyle.logo} />
            <Input placeholder="Username" />
            <Input placeholder="Password" secureTextEntry={true} />
            <Button title="Login" onPress={this._signInAsync} />
            <Button
              title="Register"
              type="outline"
              onPress={() => navigate("Register")}
            />
            <Button
              containerStyle={styles.marginBottom}
              title="Forget Password"
              type="clear"
            />
          </ImageBackground>
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: s.height * 0.05
  }
});
