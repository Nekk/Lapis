import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, Dimensions } from "react-native";
import { Icon, Button, ThemeProvider } from "react-native-elements";
// import Icon from 'react-native-vector-icons/FontAwesome5'
import CountDown from "react-native-countdown-component";
const s = require("../style/style");

export default class RentScreen extends Component {
  static navigationOptions = {
    title: "Rent"
  };

  constructor(props) {
    super(props);

    this.state = {
      isTimerOn: true,
      time: 172800 // 2 hours
    };
  }

  componentWillMount() {
    const qrCodeData = this.props.navigation.getParam(
      "data",
      "no data scanned"
    );
    // console.log(qrCodeData)
    Alert.alert("Scanned Complete!!");
    // qrCodeData ? this.setState({isTimerOn: true}) : alert("Please go back and scan again!")
  }

  _onPressReturn = () => {
    // this.props.navigation.navigate("Payment");
  };

  _onPressRenew = () => {
    // this.setState({
    //   isTimerOn: false
    // });
    this.props.navigation.navigate("Scan");
  };

  render() {
    const countDownSize = s.width * 0.08;

    return (
      <View style={styles.rentContainer}>
        <View style={s.globalStyle.container}>
          <Text style={styles.headerTextStyle}>Timer</Text>
          {this.state.isTimerOn ? (
            <CountDown
              style={styles.countDownStyle}
              size={countDownSize}
              until={172800} // 48 hours
              onFinish={() => alert("Finished")}
              digitStyle={styles.digitStyle}
              timeLabelStyle={styles.timeLabelStyle}
              timeToShow={["D", "H", "M", "S"]}
              showSeparator
            />
          ) : (
            <CountDown
              style={styles.countDownStyle}
              size={countDownSize}
              until={0}
              digitStyle={styles.digitStyle}
              timeLabelStyle={styles.timeLabelStyle}
              timeToShow={["D", "H", "M", "S"]}
              showSeparator
            />
          )}
        </View>
        <ThemeProvider theme={theme}>
          <View style={styles.buttonContainer}>
            <Button
              icon={<Icon name="refresh" size={40} color="white" />}
              title="Renew"
              onPress={this._onPressRenew}
            />
            <Button
              icon={<Icon name="chevron-left" size={40} color="white" />}
              buttonStyle={s.globalStyle.redBtn}
              title="Return"
              onPress={this._onPressReturn}
            />
          </View>
        </ThemeProvider>
      </View>
    );
  }
}

const theme = {
  Button: {
    buttonStyle: {
      width: s.width * 0.4,
      borderRadius: 30
    }
  }
};

const styles = StyleSheet.create({
  countDownStyle: {
    paddingRight: s.width * 0.05
  },
  digitStyle: {
    backgroundColor: "#FFF",
    paddingTop: 30
  },
  timeLabelStyle: {
    color: "rgb(27,111,204)",
    fontWeight: "bold"
  },
  rentContainer: {
    flex: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: s.width * 0.4
  },
  headerTextStyle: {
    fontWeight: "bold",
    color: "rgb(27,111,204)",
    fontSize: 30
  }
});
