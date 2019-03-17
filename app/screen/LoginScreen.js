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

const { height, width } = Dimensions.get('window');
const theme={
    Button:{
        buttonStyle:{
            width: width * 0.9
        }
    }
}

export default class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
    };
  
    render() {
      const {navigate} = this.props.navigation;

      return (
        <ThemeProvider theme={theme}>
            <View style={styles.container}>
                <ImageBackground 
                    source={require('../../assets/bg/loginBg2.jpg')} 
                    style={styles.bgStyle}
                >
                    <Image source={require('../../assets/logo/logo2.png')} style={styles.logo}></Image>
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

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgStyle:{
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '100%'
    },
    logo:{
        width: "60%",
        height: "60%",
        resizeMode: 'contain'
    },
    // button:{
    //     width: width * 0.9
    // }
  });