import React, { Component } from "react";
import { Alert, View, Platform, StyleSheet } from "react-native";
import { ThemeProvider, Button, SocialIcon } from "react-native-elements";
import { Facebook } from "expo";

const s = require("../style/style");

export default class FBLoginButton extends Component {
  isAStandaloneApp = () => {
    return !(Platform.OS === "ios" && Expo.Constants.appOwnership === "expo");
  };

  _handleFacebookLogin = async () => {
    try {
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "349205579115885", // Replace with your own app id in standalone app
        // { permissions: ["public_profile"], behavior: this.isAStandaloneApp() ? 'native' : 'web' }
        { permissions: ["public_profile"], behavior: "web" }
      );
      console.log("token");
      console.log(token);
      switch (type) {
        case "success": {
          console.log("success");
          // Get the user's name using Facebook's Graph API
          const response = await fetch(
            `https://graph.facebook.com/me?access_token=${token}`
          );
          const profile = await response.json();
          Alert.alert("Logged in!", `Hi ${profile.name}!`, `${profile}`);

          break;
        }
        case "cancel": {
          console.log("cancel");
          Alert.alert("Cancelled!", "Login was cancelled!");
          break;
        }
        default: {
          console.log("default");
          Alert.alert("Oops!", "Login failed!");
        }
      }
    } catch (e) {
      console.log("error");
      // console.log(type)
      console.log(e);
      Alert.alert("Oops!", "Login failed!");
    }
  };

  // logIn = async () => {
  //   try {
  //     const {
  //       type,
  //       token,
  //       expires,
  //       permissions,
  //       declinedPermissions,
  //     } = await Facebook.logInWithReadPermissionsAsync('349205579115885', {
  //       permissions: ['public_profile'], behavior: 'web'
  //     });
  //     if (type === 'success') {
  //       // Get the user's name using Facebook's Graph API
  //       const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
  //       Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
  //     } else {
  //       // type === 'cancel'
  //     }
  //   } catch ({ message }) {
  //     alert(`Facebook Login Error: ${message}`);
  //   }
  // }

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
    marginTop: s.height * 0.04
  }
});
