import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  ImageBackground,
  Image,
  Dimensions
} from "react-native";
import {
  Button,
  Input,
  FormLabel,
  FormInput,
  FormValidationMessage,
  ThemeProvider
} from "react-native-elements";
import KeyboardShift from "../shared/KeyboardShift";

const s = require("../style/style");
const assets = require("../../assets/index");
const gap = -95.5;

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.emailRef = React.createRef();
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  static navigationOptions = {
    title: "Register",
    header: null
  };

  _onPressBack = () => {
    this.props.navigation.navigate("Login");
  };

  _onPressReturn = () => {
    this.usernameRef.current.focus();
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ThemeProvider theme={s.theme}>
        <KeyboardShift>
          {() => (
            <View style={styles.container}>
              <ImageBackground
                source={require("../../assets/bg/loginBg2.jpg")}
                style={s.globalStyle.bgStyle}
              >
                <Image
                  source={require("../../assets/logo/logo2.png")}
                  style={s.globalStyle.logo}
                />
                {/* <Input ref={this.emailRef} placeholder="E-mail" onSubmitEditing={this._onPressReturn}/> */}
                <Input ref={this.emailRef} placeholder="E-mail" />
                <Input ref={this.usernameRef} placeholder="Username" />
                <Input
                  ref={this.passwordRef}
                  placeholder="Password"
                  secureTextEntry={true}
                />
                <Button title="Register" />
                <Button
                  containerStyle={styles.marginBottom}
                  title="Back"
                  type="outline"
                  onPress={this._onPressBack}
                />
              </ImageBackground>
            </View>
          )}
        </KeyboardShift>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50
  },
  marginBottom: {
    marginBottom: s.height * 0.05
  }
});
