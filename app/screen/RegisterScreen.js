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
import ApolloClient, { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const s = require("../style/style");
const assets = require("../../assets/index");
const gap = -95.5;

const REGISTER_USER = gql`
  mutation RegisterUser(
    $email: String!
    $username: String!
    $password: String!
  ) {
    registerUser(email: $email, username: $username, password: $password) {
      id
    }
  }
`;
export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailVal: "",
      usernameVal: "",
      passwordVal: ""
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

  _onPressBack = () => {
    this.props.navigation.navigate("Login");
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
                    <ImageBackground
                      source={require("../../assets/bg/loginBg2.jpg")}
                      style={s.globalStyle.bgStyle}
                    >
                      <Image
                        source={require("../../assets/logo/logo2.png")}
                        style={s.globalStyle.logo}
                      />
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
                      <Input
                        value={this.state.passwordVal}
                        placeholder="Password"
                        onChangeText={e => this._handlePasswordChange(e)}
                        secureTextEntry={true}
                      />
                      <Button
                        title="Register"
                        onPress={() => {
                          registerUser({
                            variables: {
                              email: this.state.emailVal,
                              username: this.state.usernameVal,
                              password: this.state.passwordVal
                            }
                          })
                            .then(result => {
                              Alert.alert("Register Successfully!");
                              navigate("Login");
                            })
                            .catch(error => {
                              Alert.alert(
                                "Oops! There's an error registering - " + error
                              );
                            });
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
    justifyContent: "center",
    height: 50
  },
  marginBottom: {
    marginBottom: s.height * 0.05
  }
});
