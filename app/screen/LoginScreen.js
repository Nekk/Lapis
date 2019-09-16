// import React, { Component } from "react";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import {
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
//   Alert,
//   ImageBackground,
//   Image,
//   AsyncStorage
// } from "react-native";
// import { ThemeProvider, Button, Input } from "react-native-elements";
// import KeyboardShift from "../shared/KeyboardShift";
// import { Query } from "react-apollo";
// import { gql } from "apollo-boost";

// const s = require("../style/style");
// const assets = require("../../assets/index");

// // const query = gql`
// // {
// //   rates(currency: "USD") {
// //     currency
// //   }
// // }
// // `
// const query = gql`
// {
//   books{
//     title,
//     author
//   }
// }
// `

// export default class LoginScreen extends Component{
//   constructor(props){
//     super(props)
//   }

//   render(){
//     return(
//       <View style={s.globalStyle.container}>
//         <Query query={query}>
//           {result => {
//             if(result.loading) return <Text>loading...</Text>
//             if(result.error) return <Text>Error!</Text>
//             return (
//               <View style={s.globalStyle.container}>
//                 {result.data.books.map( (book,index) => {
//                   return (
//                     <React.Fragment key={index}>
//                       <Text>{index}</Text>
//                       <Text>{book.title}</Text>
//                       <Text>{book.author}</Text>
//                     </React.Fragment>
//                   )
//                 })}
//               </View>
//             )
//           }}
//         </Query>
//       </View>
//     );
//   }
// }

import React, { Component } from "react";
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
import KeyboardShift from "../shared/KeyboardShift";
import FBLoginButton from "../components/FBLoginButton";
import validator from "validator";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import Spinner from "react-native-loading-spinner-overlay";

const s = require("../style/style");
const assets = require("../../assets/index");
const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password)
  }
`;

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    spinner: false,
    username: "",
    password: ""
  };

  _signInAsync = async token => {
    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("username", this.state.username);
    // await AsyncStorage.setItem("pictureUrl", profile.picture.data.url); // set profile picture
    this.props.navigation.navigate("DrawerStack");
  };

  _facebookSignInAsync = async (profile, token) => {
    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("username", profile.name);
    await AsyncStorage.setItem("pictureUrl", profile.picture.data.url);
    this.props.navigation.navigate("DrawerStack");
  };

  _validate = () => {
    const isUsernameOk = !validator.isEmpty(this.state.username);
    const isPasswordOk = !validator.isEmpty(this.state.password);

    if (!isUsernameOk) {
      Alert.alert("Please enter a username");
      return false;
    } else if (!isPasswordOk) {
      Alert.alert("Please enter a password");
      return false;
    }
    return true;
  };

  _handleUsernameChange = username => {
    this.setState({
      username
    });
  };

  _handlePasswordChange = password => {
    this.setState({
      password
    });
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Mutation mutation={LOGIN_USER}>
        {(loginUser, { data }) => {
          return (
            <ThemeProvider theme={s.theme}>
              <KeyboardShift>
                {() => (
                  <View style={s.globalStyle.container}>
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
                      <Input
                        placeholder="Username"
                        value={this.state.username}
                        onChangeText={e => this._handleUsernameChange(e)}
                      />
                      <Input
                        placeholder="Password"
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={e => this._handlePasswordChange(e)}
                      />
                      <Button
                        title="Login"
                        onPress={() => {
                          const isValidatePass = this._validate();
                          //Need User notification
                          if (isValidatePass) {
                            this.setState({
                              spinner: true
                            });

                            loginUser({
                              variables: {
                                username: this.state.username,
                                password: this.state.password
                              }
                            })
                              .then(result => {
                                let token = result.data.loginUser;
                                setTimeout(
                                  () =>
                                    token
                                      ? this._signInAsync(token)
                                      : Alert.alert(
                                          "Invalid Username or Password!"
                                        ),
                                  500
                                );
                                this.setState({
                                  spinner: false
                                });
                              })
                              .catch(error => {
                                setTimeout(
                                  () =>
                                    Alert.alert(
                                      "Oops! There's an error logging in - " +
                                        error
                                    ),
                                  500
                                );
                                this.setState({
                                  spinner: false
                                });
                              });
                          }
                        }}
                      />
                      <FBLoginButton
                        onSignInSuccess={this._facebookSignInAsync}
                      />
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
  marginBottom: {
    marginBottom: s.height * 0.05
  }
});
