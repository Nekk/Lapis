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
import {Button, Input, FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

const { height, width } = Dimensions.get('window');

export default class RegisterScreen extends Component {
    static navigationOptions = {
        title: 'Register',
    };
  
    render() {
      const {navigate} = this.props.navigation;

      return (
        <View style={styles.container}>
            <ImageBackground 
                source={require('../../assets/bg/loginBg2.jpg')} 
                style={styles.bgStyle}
            >
                <Image source={require('../../assets/logo/logo2.png')} style={styles.logo}></Image>
                <Input placeholder='Username' />
                <Input placeholder="Password"/>
                <Button title="Register" type="outline" buttonStyle={styles.button}/>
            </ImageBackground>
        </View>
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
    formContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    bgStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        paddingTop: 10
    },
    logo:{
        width: "60%",
        height: "60%",
        resizeMode: 'contain'
    },
    button:{
        width: width * 0.9
    }
  });