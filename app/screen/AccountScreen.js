import React, { useState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  AsyncStorage,
  Image
} from "react-native";
import {
  ThemeProvider,
  Button,
  Input,
  ListItem,
  Card,
  FormInput
} from "react-native-elements";
import KeyboardShift from "../shared/KeyboardShift";
import { gql } from "apollo-boost";
import { Mutation, Query } from "react-apollo";
import validator from "validator";
import FloatLabelTextInput from "react-native-floating-label-text-input";

const s = require("../style/style");
const assets = require("../../assets/index");
const constant = require("../constant");
const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      firstName
      lastName
      email
      username
    }
  }
`;
const UPDATE_USER = gql`
  mutation UpdateUser(
    $oldUsername: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    updateUser(
      oldUsername: $oldUsername
      firstName: $firstName
      lastName: $lastName
      email: $email
      username: $username
      password: $password
    )
  }
`;

export default class AccountScreen extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    usernameInput: "",
    password: "",
    confirmPassword: ""
  };

  componentDidMount = async () => {
    this.setState({
      // query all existing user info here
      username: await AsyncStorage.getItem("username"),
      pictureUrl: await AsyncStorage.getItem("pictureUrl")
    });
    this.props.navigation.setParams({ headerTitle: "demo" });
  };

  queryUserComplete = data => {
    this.setState({
      firstName: data.user.firstName,
      lastName: data.user.lastName,
      email: data.user.email,
      usernameInput: data.user.username
    });
  };

  _onPressEdit = () => {};

  _onPressCancel = () => {
    Alert.alert("Disgard all changes", "Do you really want to cancel?", [
      { text: "OK", onPress: () => this.props.navigation.navigate("Home") },
      { text: "Cancel" }
    ]);
  };

  _validate = () => {
    const isFirstNameOk = !validator.isEmpty(this.state.firstName);
    const isLastNameOk = !validator.isEmpty(this.state.lastName);
    const isEmailOk =
      !validator.isEmpty(this.state.email) &&
      validator.isEmail(this.state.email);

    this.state.username == null
      ? (isUsernameOk = !validator.isEmpty(""))
      : (isUsernameOk = !validator.isEmpty(this.state.username));

    const isPasswordOk = !validator.isEmpty(this.state.password);
    const isConfirmPasswordOk =
      !validator.isEmpty(this.state.confirmPassword) &&
      this.state.password === this.state.confirmPassword;

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
    return (
      <Query
        query={GET_USER}
        variables={{ username: this.state.username }}
        onCompleted={this.queryUserComplete}
      >
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>;
          if (error) return <Text>Error :(</Text>;
          // console.log(data)
          return (
            <Mutation mutation={UPDATE_USER}>
              {(updateUser, { data }) => {
                return (
                  <KeyboardShift>
                    {() => (
                      <ScrollView style={styles.scrollViewContainer}>
                        <View style={styles.container}>
                          <View style={s.globalStyle.profilePicContainer}>
                            <Text style={styles.headerTextStyle}>
                              Account Setting
                            </Text>

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

                            <Button type="clear" title="Change Picture" />

                            {this.state.username ? (
                              <Text>{this.state.username}</Text>
                            ) : (
                              <Text>firstName lastName</Text>
                            )}
                          </View>
                          <Text style={styles.subHeaderStyle}>
                            PERSONAL INFORMATION
                          </Text>
                          <Card containerStyle={styles.cardContainer}>
                            <View style={styles.infoContainer}>
                              <FloatLabelTextInput
                                placeholder={"First Name"}
                                value={this.state.firstName}
                                onChangeTextValue={e =>
                                  this.setState({ firstName: e })
                                }
                              />
                              <FloatLabelTextInput
                                placeholder={"Last Name"}
                                value={this.state.lastName}
                                onChangeTextValue={e =>
                                  this.setState({ lastName: e })
                                }
                              />
                              <FloatLabelTextInput
                                placeholder={"E-mail"}
                                value={this.state.email}
                                onChangeTextValue={e =>
                                  this.setState({ email: e })
                                }
                              />
                              <FloatLabelTextInput
                                placeholder={"Username"}
                                value={this.state.usernameInput}
                                onChangeTextValue={e =>
                                  this.setState({ usernameInput: e })
                                }
                              />
                              <FloatLabelTextInput
                                secureTextEntry={true}
                                placeholder={"Password"}
                                value={this.state.password}
                                onChangeTextValue={e =>
                                  this.setState({ password: e })
                                }
                              />
                              <FloatLabelTextInput
                                secureTextEntry={true}
                                placeholder={"Confirm Password"}
                                value={this.state.confirmPassword}
                                onChangeTextValue={e =>
                                  this.setState({ confirmPassword: e })
                                }
                              />
                            </View>
                          </Card>
                          <ThemeProvider theme={theme}>
                            <View style={styles.buttonContainer}>
                              <Button
                                title="Save"
                                onPress={async () => {
                                  const isValidatePass = this._validate();
                                  if (isValidatePass) {
                                    updateUser({
                                      variables: {
                                        oldUsername: await AsyncStorage.getItem(
                                          "username"
                                        ),
                                        // oldUsername: "Nekk",
                                        firstName: this.state.firstName,
                                        lastName: this.state.lastName,
                                        email: this.state.email,
                                        username: this.state.usernameInput,
                                        password: this.state.password
                                      }
                                    })
                                      .then(result => {
                                        Alert.alert("Save Successfully!");
                                      })
                                      .catch(error => {
                                        Alert.alert(
                                          "Oops! There's an error registering - " +
                                            error
                                        );
                                      });
                                  }
                                }}
                              />
                              <Button
                                type="outline"
                                title="Cancel"
                                onPress={this._onPressCancel}
                              />
                            </View>
                          </ThemeProvider>
                        </View>
                      </ScrollView>
                    )}
                  </KeyboardShift>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

const theme = {
  Button: {
    buttonStyle: {
      width: s.width * 0.4
    }
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    // padding: 0,
    // width: '100%',
    marginTop: s.height * 0.01,
    marginBottom: s.height * 0.02
  },
  infoContainer: {
    marginBottom: s.height * 0.02
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: "rgb(235, 233, 242)" // grey background color
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
    // alignItems: 'center'
  },
  headerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerTextStyle: {
    fontSize: s.height * 0.03,
    marginTop: s.height * 0.03,
    marginBottom: s.height * 0.03
  },
  subHeaderStyle: {
    color: "rgb(145, 143, 150)",
    marginLeft: s.width * 0.02,
    marginTop: s.height * 0.02
  },
  inputWidth: {
    width: "20%"
  },
  buttonStyle: {
    width: s.width * 0.4
  },
  textInputStyle: {
    backgroundColor: "white",
    borderColor: "black"
  },
  profilePictureStyle: {
    height: constant.pictureSize,
    width: constant.pictureSize,
    borderRadius: constant.pictureSize / 2,
    overflow: "hidden"
  }
});
