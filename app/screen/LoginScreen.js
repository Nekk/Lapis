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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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

const s = require("../style/style");
const assets = require("../../assets/index");
const gap = -40.5;

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  _signInAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("DrawerStack");
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ThemeProvider theme={s.theme}>
        <KeyboardShift>
          {() => (
            <View style={s.globalStyle.container}>
              <ImageBackground
                source={require("../../assets/bg/loginBg2.jpg")}
                style={s.globalStyle.bgStyle}
              >
                <Image source={assets.logoSrc} style={s.globalStyle.logo} />
                <Input placeholder="Username" />
                <Input placeholder="Password" secureTextEntry={true} />
                <Button title="Login" onPress={this._signInAsync} />
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
  }
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: s.height * 0.05
  }
});
