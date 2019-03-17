import React,{ Component } from 'react';
import { StyleSheet, Text, View, Alert,Dimensions } from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements'
import CountDown from 'react-native-countdown-component'

const { height, width } = Dimensions.get('window');
const theme = {
    Button:{
        buttonStyle:{
            width: width * 0.9
        },
        containerStyle:{
            marginTop: height * 0.02
        }
    }
}

export default class RentScreen extends Component{
    static navigationOptions = {
        title: 'Rent',
    };

    constructor(props){
        super(props)

        this.state = {
            isPressRent: false,
            time: 172800,
        }
    }

    _onPressBack = () => {
        this.props.navigation.navigate('Home')
    }

    _onPressRent = () => {
        Alert.alert('Rented')
        this.setState({
            isPressRent: true
        })
    }
  
    render(){
      const labelColor = 'rgb(27,111,204)';

      return(
        <ThemeProvider theme={theme}>
            <View style={styles.container}>
            {
                this.state.isPressRent ? (
                    <CountDown
                      style={{paddingRight: width * 0.05}}
                      size={width * 0.08}
                      until={172800} // 48 hours
                      onFinish={() => alert('Finished')}
                      digitStyle={{backgroundColor: '#FFF', paddingTop: 30}}
                      timeLabelStyle={{color: labelColor, fontWeight: 'bold'}}
                      timeToShow={['D','H', 'M', 'S']}
                      showSeparator
                    />
                ) : (
                    <CountDown
                      style={{paddingRight: width * 0.05}}
                      size={width * 0.08}
                      until={0} 
                      digitStyle={{backgroundColor: '#FFF', paddingTop: 30}}
                      timeLabelStyle={{color: labelColor, fontWeight: 'bold'}}
                      timeToShow={['D','H', 'M', 'S']}
                      showSeparator
                    />
                )
            }
            </View>
            <View style={styles.container}>
                <Button title="Rent" 
                    onPress={this._onPressRent}/>
                <Button buttonStyle={styles.red} title="Back"
                    onPress={this._onPressBack}/>
            </View>
        </ThemeProvider>
      );
    }
  }

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    red:{
        backgroundColor: "#d9534f"
    }
})