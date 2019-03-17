import React,{ Component } from 'react';
import { StyleSheet, Text, View, Alert,Dimensions } from 'react-native';
import {Button, ThemeProvider} from 'react-native-elements'
import CountDown from 'react-native-countdown-component'

const s = require('../style/style')

const { height, width } = Dimensions.get('window');

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
        const countDownSize = width * 0.08

      return(
        <ThemeProvider theme={s.theme}>
            <View style={s.globalStyle.container}>
            {
                this.state.isPressRent ? (
                    <CountDown
                      style={styles.countDownStyle}
                      size={countDownSize}
                      until={172800} // 48 hours
                      onFinish={() => alert('Finished')}
                      digitStyle={styles.digitStyle}
                      timeLabelStyle={styles.timeLabelStyle}
                      timeToShow={['D','H', 'M', 'S']}
                      showSeparator
                    />
                ) : (
                    <CountDown
                      style={styles.countDownStyle}
                      size={countDownSize}
                      until={0} 
                      digitStyle={styles.digitStyle}
                      timeLabelStyle={styles.timeLabelStyle}
                      timeToShow={['D','H', 'M', 'S']}
                      showSeparator
                    />
                )
            }
            </View>
            <View style={s.globalStyle.container}>
                <Button title="Rent" 
                    onPress={this._onPressRent}/>
                <Button buttonStyle={s.globalStyle.redBtn} title="Back"
                    onPress={this._onPressBack}/>
            </View>
        </ThemeProvider>
      );
    }
  }

  

  const styles = StyleSheet.create({
      countDownStyle:{
        paddingRight: width * 0.05
      },
      digitStyle:{
        backgroundColor: '#FFF', paddingTop: 30
      },
      timeLabelStyle:{
          color: 'rgb(27,111,204)', fontWeight: 'bold'
    }
  })