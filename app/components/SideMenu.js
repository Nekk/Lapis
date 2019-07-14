import React, { Component } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Alert,
  Image,
  AsyncStorage
} from "react-native";
import { ThemeProvider, Button } from "react-native-elements";
import { DrawerItems } from "react-navigation";

const s = require("../style/style");
const assets = require("../../assets/index");

export default class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "firstName lastName"
    };
  }

  componentDidMount = async () => {
    this.setState({
      username: await AsyncStorage.getItem("username"),
      pictureUrl: await AsyncStorage.getItem("pictureUrl")
    });
  };

  _comingSoon = () => {
    Alert.alert("Coming Soon...");
  };

  _onPressAccountSetting = () => {
    console.log("Account Setting Pressed");
  };

  render() {
    return (
      // <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.profilePicContainer}>
            {/* <Image
              style={styles.profilePictureStyle}
              source={assets.anonymous}
            /> */}
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
            <Text style={styles.marginBottom}>{this.state.username}</Text>
          </View>
          <Button
            type="clear"
            backgroundColor={"red"}
            title="History Usage"
            onPress={this._comingSoon}
          />
          <Button
            type="clear"
            title="Payment Method"
            onPress={this._comingSoon}
          />
          <Button
            type="clear"
            title="Account Setting"
            onPress={this._onPressAccountSetting}
          />
        </ScrollView>
      </View>
      // </ThemeProvider>
    );
  }
}

// const theme = {
//     Button:{
//         containerStyle:{
//             backgroundColor: '3b5998'
//         }
//     }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  navItemStyle: {
    padding: 15
  },
  profilePicContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  profilePictureStyle: {
    width: 40,
    height: 40,
    marginBottom: s.height * 0.01
    // borderRadius:
  },
  marginBottom: {
    marginBottom: s.height * 0.01
  }
});
