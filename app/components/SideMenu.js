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
const constant = require("../constant");

export default class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null
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
    this.props.navigation.navigate("Account");
  };

  render() {
    return (
      // <ThemeProvider theme={theme}>
      <View style={styles.container}>
        <ScrollView>
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
            {this.state.username ? (
              <Text style={styles.marginBottom}>{this.state.username}</Text>
            ) : (
              <Text style={styles.marginBottom}>firstName lastName</Text>
            )}
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
  marginBottom: {
    marginBottom: s.height * 0.01
  },
  profilePictureStyle: {
    width: constant.pictureSize,
    height: constant.pictureSize,
    marginBottom: s.height * 0.02,
    borderRadius: constant.pictureSize / 2,
    overflow: "hidden"
  }
});
