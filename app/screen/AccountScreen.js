import React, { Component } from "react";
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
import FloatLabelTextInput from "react-native-floating-label-text-input";

const s = require("../style/style");
const assets = require("../../assets/index");
const constant = require("../constant");

export default class AccountScreen extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    username: null,
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

  _onPressEdit = () => {};

  _onPressCancel = () => {
    Alert.alert("Disgard all changes", "Do you really want to cancel?", [
      { text: "OK", onPress: () => this.props.navigation.navigate("Home") },
      { text: "Cancel" }
    ]);
  };

  render() {
    return (
      <KeyboardShift>
        {() => (
          <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.container}>
              <View style={s.globalStyle.profilePicContainer}>
                <Text style={styles.headerTextStyle}>Account Setting</Text>

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
              <Text style={styles.subHeaderStyle}>PERSONAL INFORMATION</Text>
              <Card containerStyle={styles.cardContainer}>
                <View style={styles.infoContainer}>
                  <FloatLabelTextInput
                    placeholder={"First Name"}
                    value={this.state.firstName}
                    onChangeTextValue={e => this.setState({ firstName: e })}
                  />
                  <FloatLabelTextInput
                    placeholder={"Last Name"}
                    value={this.state.lastName}
                    onChangeTextValue={e => this.setState({ lastName: e })}
                  />
                  <FloatLabelTextInput
                    placeholder={"E-mail"}
                    value={this.state.email}
                    onChangeTextValue={e => this.setState({ email: e })}
                  />
                  <FloatLabelTextInput
                    placeholder={"Username"}
                    value={this.state.username}
                    onChangeTextValue={e => this.setState({ username: e })}
                  />
                  <FloatLabelTextInput
                    secureTextEntry={true}
                    placeholder={"Password"}
                    value={this.state.password}
                    onChangeTextValue={e => this.setState({ password: e })}
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
                  <Button title="Save" />
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
