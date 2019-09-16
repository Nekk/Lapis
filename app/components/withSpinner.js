import React, { Component } from "react";
import { View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
const s = require("../style/style");

const withSpinner = WrappedComponent => {
  class WithSpinner extends Component {
    state = {
      spinner: false
    };

    setSpinnerTrue = () => {
      this.setState({
        spinner: true
      });
    };

    setSpinnerFalse = () => {
      this.setState({
        spinner: false
      });
    };

    render() {
      return (
        <React.Fragment>
          <Spinner
            visible={this.state.spinner}
            textContent={"Loading..."}
            textStyle={s.globalStyle.spinnerTextStyle}
          />
          <WrappedComponent
            spinner={this.state.spinner}
            setSpinnerTrue={this.setSpinnerTrue}
            setSpinnerFalse={this.setSpinnerFalse}
          />
        </React.Fragment>
      );
    }
  }
};

export default withSpinner;
