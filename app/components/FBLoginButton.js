import React, { Component } from "react";
import { Alert, View, Platform, StyleSheet } from "react-native";
import { ThemeProvider, Button, SocialIcon } from "react-native-elements";
import { Facebook } from "expo";

const s = require("../style/style");
const appID = "349205579115885";

export default class FBLoginButton extends Component {
  isAStandaloneApp = () => {
    return !(Platform.OS === "ios" && Expo.Constants.appOwnership === "expo");
  };

  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        appID,
        // { permissions: ["public_profile"], behavior: this.isAStandaloneApp() ? 'native' : 'web' }
        { permissions: ["public_profile"], behavior: "web" }
      );
      switch (type) {
        case "success": {
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`
          );
          // profile is an object of "id" and "name"
          const profile = await response.json();
          Alert.alert("Logged in!", `Hi ${profile.name}!`, `${profile}`);
          this.props.onSignInSuccess();
          break;
        }
        case "cancel": {
          Alert.alert("Cancelled!", "Login was cancelled!");
          break;
        }
        default: {
          Alert.alert("Oops!", "Login failed!");
        }
      }
    } catch (e) {
      Alert.alert("Oops!", "Login failed!");
    }
  };

  render() {
    return (
      // <ThemeProvider theme={s.theme}>
      <View>
        {/* <Button
            icon={
              <SocialIcon type="facebook"/>
            }
            title="Login with Faceboook"
            onPress={this._handleFacebookLogin}
            buttonStyle={s.globalStyle.facebookColor}
          /> */}
        <SocialIcon
          title="Login With Facebook"
          type="facebook"
          button
          style={styles.facebookBtnStyle}
          onPress={this._handleFacebookLogin}
        />
      </View>
      // </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  facebookBtnStyle: {
    width: s.width * 0.9,
    marginTop: s.height * 0.02
  }
});
