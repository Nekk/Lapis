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
  AsyncStorage,
  TouchableHighlight
} from "react-native";
import { Icon, Button, ThemeProvider } from "react-native-elements";
import { Stopwatch, Timer } from "react-native-stopwatch-timer";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { Notifications } from "expo";
// import { NOTIFICATIONS } from "expo-permissions";
import { registerForPushNotificationsAsync } from "../shared/function";
import { client, PUSH_NOTIFICATION_ENDPOINT } from "../constant";

const s = require("../style/style");

export default class TimerScreen extends Component {
  static navigationOptions = {
    title: "Rent"
  };

  constructor(props) {
    super(props);

    this.state = {
      timerStart: true,
      stopwatchStart: true,
      // totalDuration: 7200000, // 2 hrs
      totalDuration: 2000, // 10 seconds
      timerReset: false,
      stopwatchReset: false,

      notification: {}
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

  getStopwatchTime = time => {
    this.stopwatchTime = time;
  };

  getTimerTime = time => {
    this.timerTime = time;
  };

  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  async componentWillMount() {
    const qrCodeData = this.props.navigation.getParam(
      "data",
      "no data scanned"
    );
    // console.log(qrCodeData)
    await registerForPushNotificationsAsync();

    // set this.state.notification a value that got from expo token which will
    // contain data
    // this._notificationSubscription = Notifications.addListener(
    //   this._handleNotification
    // );

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
    console.log("noti");
    console.log(this.state.notification);
    return (
      // <Mutation mutation={SEND_PUSH_TOKEN}>
      //   {(sendPushToken, { data }) => {
      //     return (
      //       <View style={styles.rentContainer}>
      //         <View style={s.globalStyle.container}>
      //           <Text style={styles.headerTextStyle}>Timer</Text>
      //           <Stopwatch
      //             laps
      //             start={this.state.stopwatchStart}
      //             reset={this.state.stopwatchReset}
      //             options={options}
      //             getTime={this.getStopwatchTime}
      //           />
      //           <Timer
      //             totalDuration={this.state.totalDuration}
      //             start={this.state.timerStart}
      //             reset={this.state.timerReset}
      //             options={timerOptions}
      //             // handleFinish={handleTimerComplete}
      //             getTime={this.getTimerTime}
      //           />
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
      //   }}
      // </Mutation>
      <View style={styles.rentContainer}>
        <View style={s.globalStyle.container}>
          <Text style={styles.headerTextStyle}>Timer</Text>
          <Stopwatch
            laps
            start={this.state.stopwatchStart}
            reset={this.state.stopwatchReset}
            options={options}
            getTime={this.getStopwatchTime}
          />
          <Timer
            totalDuration={this.state.totalDuration}
            start={this.state.timerStart}
            reset={this.state.timerReset}
            options={timerOptions}
            handleFinish={handleTimerComplete}
            getTime={this.getTimerTime}
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

const handleTimerComplete = async () => {
  console.log("handleTimerComplete");
  let userId = Number(await AsyncStorage.getItem("userId"));

  let expoToken = await client
    .query({
      variables: { userId },
      query: gql`
        query GetPushNotiToken($userId: Int!) {
          getPushNotiToken(userId: $userId)
        }
      `
    })
    .then(response => {
      return response.data.getPushNotiToken;
    })
    .catch(error => console.log(error));

  // fetch for a push notification after getting push token from the API
  // alert('Hello')
  return fetch(PUSH_NOTIFICATION_ENDPOINT, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      to: expoToken,
      // to: "ExponentPushToken[j9YKcPEjuGwowN6zOifmPg]",
      title: "Test Title",
      body: "Test body",
      sound: "default"
    })
  });
};

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

const timerOptions = {
  container: {
    display: "block"
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
