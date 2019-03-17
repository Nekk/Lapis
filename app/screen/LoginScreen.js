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
import {
    ThemeProvider, 
    Button, 
    Input, 
    FormLabel, 
    FormInput,
    FormValidationMessage
} from 'react-native-elements'

const s = require('../style/style')
const assets = require('../../assets/index')

export default class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
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
                    <Image source={assets.logoSrc} style={s.globalStyle.logo}></Image>
                    <Input placeholder='Username' />
                    <Input placeholder="Password"/>
                    <Button title="Login" 
                        onPress={() => navigate('Home')}/>
                    <Button title="Register" type="outline" 
                        onPress={() => navigate('Register')}/>
                    <Button
                        title="Forget Password"
                        type="clear" 
                    />
                </ImageBackground>
            </View>
        </ThemeProvider>
      );
    }
  }