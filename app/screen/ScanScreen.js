// import React, { Component } from "react";
// import {
//   Alert,
//   Linking,
//   Dimensions,
//   LayoutAnimation,
//   Text,
//   View,
//   StatusBar,
//   StyleSheet,
//   TouchableOpacity
// } from "react-native";
// import { BarCodeScanner, Permissions } from "expo";

// export default class ScanScreen extends Component {
//   state = {
//     hasCameraPermission: null,
//     lastScannedUrl: null
//   };

//   componentDidMount() {
//     this._requestCameraPermission();
//   }

//   _requestCameraPermission = async () => {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     this.setState({
//       hasCameraPermission: status === "granted"
//     });
//   };

//   _handleBarCodeRead = result => {
//     console.log("result = ");
//     console.log(result.data);
//     // console.log("lastScannedUrl = ")
//     // console.log(this.state.lastScannedUrl)
//     this.props.navigation.navigate("Rent");
//     //   if (result.data !== this.state.lastScannedUrl) {
//     //     LayoutAnimation.spring();
//     //     this.setState({ lastScannedUrl: result.data });
//     //   }
//   };

//   render() {
//     return (
//       <View style={styles.container}>
//         {this.state.hasCameraPermission === null ? (
//           <Text>Requesting for camera permission</Text>
//         ) : this.state.hasCameraPermission === false ? (
//           <Text style={{ color: "#fff" }}>
//             Camera permission is not granted
//           </Text>
//         ) : (
//           <BarCodeScanner
//             onBarCodeRead={this._handleBarCodeRead}
//             style={{
//               height: Dimensions.get("window").height,
//               width: Dimensions.get("window").width
//             }}
//           />
//         )}

//         {/* {this._maybeRenderUrl()} */}

//         <StatusBar hidden />
//       </View>
//     );
//   }

//   _handlePressUrl = () => {
//     //   Alert.alert(
//     //     'Open this URL?',
//     //     this.state.lastScannedUrl,
//     //     [
//     //       {
//     //         text: 'Yes',
//     //         onPress: () => Linking.openURL(this.state.lastScannedUrl),
//     //       },
//     //       { text: 'No', onPress: () => {} },
//     //     ],
//     //     { cancellable: false }
//     //   );
//   };

//   _handlePressCancel = () => {
//     this.setState({ lastScannedUrl: null });
//   };

//   _maybeRenderUrl = () => {
//     if (!this.state.lastScannedUrl) {
//       return;
//     }

//     return (
//       <View style={styles.bottomBar}>
//         {/* <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
//             <Text numberOfLines={1} style={styles.urlText}>
//               {this.state.lastScannedUrl}
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.cancelButton}
//             onPress={this._handlePressCancel}>
//             <Text style={styles.cancelButtonText}>
//               Cancel
//             </Text>
//           </TouchableOpacity> */}
//         {this.props.navigation.navigate("Rent")}
//       </View>
//     );
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#000"
//   },
//   bottomBar: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 15,
//     flexDirection: "row"
//   },
//   url: {
//     flex: 1
//   },
//   urlText: {
//     color: "#fff",
//     fontSize: 20
//   },
//   cancelButton: {
//     marginLeft: 10,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   cancelButtonText: {
//     color: "rgba(255,255,255,0.8)",
//     fontSize: 18
//   }
// });

import * as React from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { Constants, Permissions, BarCodeScanner } from "expo";

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false
  };

  componentWillMount() {
    Alert.alert("Please scan the vending machine QR Code");
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1
          //   justifyContent: 'flex-end',
        }}
      >
        <Text>Please Scan for a QR Code</Text>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={[StyleSheet.absoluteFill, styles.container]}
        >
          <View style={styles.layerTop} />
          <View style={styles.layerCenter}>
            <View style={styles.layerLeft} />
            <View style={styles.focused} />
            <View style={styles.layerRight} />
          </View>
          <View style={styles.layerBottom} />
        </BarCodeScanner>

        {/* {scanned && (
          <Button
            title={'Tap to Scan Again'}
            onPress={() => this.setState({ scanned: false })}
          />
        )} */}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    // this.setState({ scanned: true });
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    const param = { data: data };
    this.props.navigation.navigate("Rent", param);
  };
}

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: "column"
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 5,
    flexDirection: "row"
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity
  }
});
