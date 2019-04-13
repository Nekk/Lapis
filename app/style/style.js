import { Dimensions, StyleSheet } from "react-native";

export const { height, width } = Dimensions.get("window");

exports.globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  button: {
    width: width * 0.9
  },
  redBtn: {
    backgroundColor: "#d9534f"
  },
  bgStyle: {
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "100%"
  },
  logo: {
    width: "60%",
    height: "60%",
    resizeMode: "contain"
  },
  headerMarginLeft: {
    marginLeft: width * 0.02
  }
});

exports.theme = {
  Button: {
    buttonStyle: {
      width: width * 0.9
    },
    containerStyle: {
      marginTop: height * 0.02
    }
  },
  Input: {
    containerStyle: {
      marginTop: height * 0.02
    }
  }
};
