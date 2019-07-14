import React, { Component } from "react";
import { StyleSheet, View, Alert, ImageBackground, Image } from "react-native";
import { Button, Input, ThemeProvider } from "react-native-elements";
import KeyboardShift from "../shared/KeyboardShift";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import validator from "validator";
import Spinner from "react-native-loading-spinner-overlay";

const s = require("../style/style");
const assets = require("../../assets/index");
const gap = -95.5;

const REGISTER_USER = gql`
  mutation RegisterUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    registerUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    ) {
      username
    }
  }
`;
export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstNameVal: "",
      lastNameVal: "",
      emailVal: "",
      usernameVal: "",
      passwordVal: "",
      confirmPasswordVal: "",

      spinner: false
    };
  }

  static navigationOptions = {
    title: "Register",
    header: null
  };

  _handleEmailChange = e => {
    this.setState({
      emailVal: e
    });
  };

  _handleFirstNameChange = e => {
    this.setState({
      firstNameVal: e
    });
  };

  _handleLastNameChange = e => {
    this.setState({
      lastNameVal: e
    });
  };

  _handleUsernameChange = e => {
    this.setState({
      usernameVal: e
    });
  };

  _handlePasswordChange = e => {
    this.setState({
      passwordVal: e
    });
  };

  _handleConfirmPasswordChange = e => {
    this.setState({
      confirmPasswordVal: e
    });
  };

  _onPressBack = () => {
    this.props.navigation.navigate("Login");
  };

  _validate = () => {
    //email -> not empty, isEmail
    //username -> not empty, (later) check existing username
    //password -> not empty,
    //confirm password -> not empty, the same value as password
    const isFirstNameOk = !validator.isEmpty(this.state.firstNameVal);
    const isLastNameOk = !validator.isEmpty(this.state.lastNameVal);
    const isEmailOk =
      !validator.isEmpty(this.state.emailVal) &&
      validator.isEmail(this.state.emailVal);
    const isUsernameOk = !validator.isEmpty(this.state.usernameVal);
    const isPasswordOk = !validator.isEmpty(this.state.passwordVal);
    const isConfirmPasswordOk =
      !validator.isEmpty(this.state.confirmPasswordVal) &&
      this.state.passwordVal === this.state.confirmPasswordVal;

    if (!isFirstNameOk) {
      Alert.alert("Please enter your first name");
      return false;
    } else if (!isLastNameOk) {
      Alert.alert("Please enter your last name");
      return false;
    } else if (!isEmailOk) {
      Alert.alert("Please enter an email in the right format");
      return false;
    } else if (!isUsernameOk) {
      Alert.alert("Please enter a username");
      return false;
    } else if (!isPasswordOk) {
      Alert.alert("Please enter a password");
      return false;
    } else if (!isConfirmPasswordOk) {
      Alert.alert(
        "Password you entered doesn't match the confirm password field"
      );
      return false;
    }
    return true;
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Mutation mutation={REGISTER_USER}>
        {(registerUser, { data }) => {
          return (
            <ThemeProvider theme={s.theme}>
              <KeyboardShift>
                {() => (
                  <View style={styles.container}>
                    <Spinner
                      visible={this.state.spinner}
                      textContent={"Loading..."}
                      textStyle={s.globalStyle.spinnerTextStyle}
                    />
                    <ImageBackground
                      source={assets.loginBg}
                      style={s.globalStyle.bgStyle}
                    >
                      <Image
                        source={assets.logoSrc}
                        style={s.globalStyle.logo}
                      />
                      <View style={styles.container}>
                        <Input
                          containerStyle={styles.halfWidth}
                          value={this.state.firstNameVal}
                          placeholder="First Name"
                          onChangeText={e => this._handleFirstNameChange(e)}
                        />
                        <Input
                          containerStyle={styles.halfWidth}
                          value={this.state.lastNameVal}
                          placeholder="Last Name"
                          onChangeText={e => this._handleLastNameChange(e)}
                        />
                      </View>
                      <Input
                        value={this.state.emailVal}
                        placeholder="E-mail"
                        onChangeText={e => this._handleEmailChange(e)}
                      />
                      <Input
                        value={this.state.usernameVal}
                        placeholder="Username"
                        onChangeText={e => this._handleUsernameChange(e)}
                      />
                      <View style={styles.container}>
                        <Input
                          containerStyle={styles.halfWidth}
                          value={this.state.passwordVal}
                          placeholder="Password"
                          onChangeText={e => this._handlePasswordChange(e)}
                          secureTextEntry={true}
                        />
                        <Input
                          containerStyle={styles.halfWidth}
                          value={this.state.confirmPasswordVal}
                          placeholder="Confirm Password"
                          onChangeText={e =>
                            this._handleConfirmPasswordChange(e)
                          }
                          secureTextEntry={true}
                        />
                      </View>
                      <Button
                        title="Register"
                        onPress={() => {
                          const isValidatePass = this._validate();

                          if (isValidatePass) {
                            this.setState({
                              spinner: true
                            });

                            registerUser({
                              variables: {
                                firstName: this.state.firstNameVal,
                                lastName: this.state.lastNameVal,
                                email: this.state.emailVal,
                                username: this.state.usernameVal,
                                password: this.state.passwordVal
                              }
                            })
                              .then(result => {
                                setTimeout(
                                  () => Alert.alert("Register Successfully!"),
                                  10
                                );
                                navigate("Login");
                              })
                              .catch(error => {
                                setTimeout(
                                  () =>
                                    Alert.alert(
                                      "Oops! There's an error registering - " +
                                        error
                                    ),
                                  10
                                );
                              });
                            this.setState({
                              spinner: false
                            });
                          }
                        }}
                      />
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
        }}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
    // height: 10
  },
  marginBottom: {
    marginBottom: s.height * 0.05
  },
  halfWidth: {
    width: "50%"
  }
});
