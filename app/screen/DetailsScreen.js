import React,{ Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class DetailsScreen extends Component{
    // _onPressGoToDetail(){
    //   const {navigate} = this.props.navigation;
    //   navigate('Details')
    // }
  
    render(){
      const {navigate} = this.props.navigation;

      return(
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Details Screen</Text>
          <Button title="Go to Details againss" onPress={() => navigate('Home')}></Button>
        </View>
      );
    }
  }