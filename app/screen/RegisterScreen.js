import React,{ Component } from 'react'
import { 
    StyleSheet, 
    Text, 
    TextInput,
    View,  
    Alert,
    ImageBackground,
    Image,
    Dimensions     
 } from 'react-native';
import {Button, Input, FormLabel, FormInput, FormValidationMessage, ThemeProvider} from 'react-native-elements'

const s = require('../style/style')
const assets = require('../../assets/index')

export default class RegisterScreen extends Component {
    static navigationOptions = {
        title: 'Register',
    };
  
    render() {
      const {navigate} = this.props.navigation;

      return (
        <ThemeProvider theme={s.theme}>
            <View style={s.globalStyle.container}>
                <ImageBackground 
                    source={require('../../assets/bg/loginBg2.jpg')} 
                    style={s.globalStyle.bgStyle}
                >
                    <Image source={require('../../assets/logo/logo2.png')} style={s.globalStyle.logo}></Image>
                    <Input placeholder='Username' />
                    <Input placeholder="Password"/>
                    <Button title="Register" type="outline"/>
                </ImageBackground>
             </View>
        </ThemeProvider>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
  });