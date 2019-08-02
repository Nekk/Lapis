// import React, { Component } from "react";
// import { StyleSheet, Text, View, Alert, Dimensions } from "react-native";
// import { Icon, Button, ThemeProvider } from "react-native-elements";
// // import Icon from 'react-native-vector-icons/FontAwesome5'
// import CountDown from "react-native-countdown-component";
// const s = require("../style/style");

// export default class TimerScreen extends Component {
//   static navigationOptions = {
//     title: "Rent"
//   };

//   constructor(props) {
//     super(props);

//     this.state = {
//       isTimerOn: true,
//       time: 172800 // 2 hours
//     };
//   }

//   componentWillMount() {
//     const qrCodeData = this.props.navigation.getParam(
//       "data",
//       "no data scanned"
//     );
//     // console.log(qrCodeData)
//     Alert.alert("Scanned Complete!!");
//     // qrCodeData ? this.setState({isTimerOn: true}) : alert("Please go back and scan again!")
//   }

//   _onPressReturn = () => {
//     // this.props.navigation.navigate("Payment");
//   };

//   _onPressRenew = () => {
//     // this.setState({
//     //   isTimerOn: false
//     // });
//     this.props.navigation.navigate("Scan");
//   };

//   render() {
//     const countDownSize = s.width * 0.08;

//     return (
//       <View style={styles.rentContainer}>
//         <View style={s.globalStyle.container}>
//           <Text style={styles.headerTextStyle}>Timer</Text>
//           {this.state.isTimerOn ? (
//             <CountDown
//               style={styles.countDownStyle}
//               size={countDownSize}
//               until={172800} // 48 hours
//               onFinish={() => alert("Finished")}
//               digitStyle={styles.digitStyle}
//               timeLabelStyle={styles.timeLabelStyle}
//               timeToShow={["D", "H", "M", "S"]}
//               showSeparator
//             />
//           ) : (
//             <CountDown
//               style={styles.countDownStyle}
//               size={countDownSize}
//               until={0}
//               digitStyle={styles.digitStyle}
//               timeLabelStyle={styles.timeLabelStyle}
//               timeToShow={["D", "H", "M", "S"]}
//               showSeparator
//             />
//           )}
//         </View>
//         <ThemeProvider theme={theme}>
//           <View style={styles.buttonContainer}>
//             <Button
//               icon={<Icon name="refresh" size={40} color="white" />}
//               title="Renew"
//               onPress={this._onPressRenew}
//             />
//             <Button
//               icon={<Icon name="chevron-left" size={40} color="white" />}
//               buttonStyle={s.globalStyle.redBtn}
//               title="Return"
//               onPress={this._onPressReturn}
//             />
//           </View>
//         </ThemeProvider>
//       </View>
//     );
//   }
// }

// const theme = {
//   Button: {
//     buttonStyle: {
//       width: s.width * 0.4,
//       borderRadius: 30
//     }
//   }
// };

// const styles = StyleSheet.create({
//   countDownStyle: {
//     paddingRight: s.width * 0.05
//   },
//   digitStyle: {
//     backgroundColor: "#FFF",
//     paddingTop: 30
//   },
//   timeLabelStyle: {
//     color: "rgb(27,111,204)",
//     fontWeight: "bold"
//   },
//   rentContainer: {
//     flex: 1
//   },
//   buttonContainer: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: s.width * 0.4
//   },
//   headerTextStyle: {
//     fontWeight: "bold",
//     color: "rgb(27,111,204)",
//     fontSize: 30
//   }
// });

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight
} from "react-native";
import { Icon, Button, ThemeProvider } from "react-native-elements";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";

const s = require("../style/style");
// const SEND_TOKEN = gql`
//   mutation sendToken($token: String!){
//     sendToken(token: $token){

//     }
//   }
// `

export default class TimerScreen extends Component {
  static navigationOptions = {
    title: "Rent"
  };

  constructor(props) {
    super(props);

    this.state = {
      timerStart: false,
      stopwatchStart: true,
      totalDuration: 90000,
      timerReset: false,
      stopwatchReset: false
    };
  }

  toggleStopwatch = () => {
    this.setState({
      stopwatchStart: !this.state.stopwatchStart,
      stopwatchReset: false
    });
  };

  resetStopwatch = () => {
    this.setState({ stopwatchStart: false, stopwatchReset: true });
  };

  getFormattedTime = time => {
    this.currentTime = time;
  };

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
    this.props.navigation.navigate("Payment");
  };

  _onPressRenew = () => {
    // this.setState({
    //   isTimerOn: false
    // });
    this.props.navigation.navigate("Scan");
  };

  render() {
    return (
      <View style={styles.rentContainer}>
        <View style={s.globalStyle.container}>
          <Text style={styles.headerTextStyle}>Timer</Text>
          <Stopwatch
            laps
            start={this.state.stopwatchStart}
            reset={this.state.stopwatchReset}
            options={options}
            getTime={this.getFormattedTime}
          />
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

const handleTimerComplete = () => alert("custom completion function");

const options = {
  // container: {
  // backgroundColor: '#000',
  //   padding: 5,
  //   borderRadius: 5,
  //   width: 220,
  // },
  container: {
    marginTop: s.height * 0.02
  },
  text: {
    fontSize: 50,
    color: "#000",
    marginLeft: 7
  }
};

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