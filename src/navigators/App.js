import React, { Component } from "react";
// import SwitchNavigator from "./SwitchNavigator";
import LoginScreen from "../screens/auth/loginScreen";
import RootApp from "./AppNavigator";
import { Root } from "native-base";

export default class App extends Component {
  render() {
    return (
      <Root props={this.props}>
        <RootApp />
      </Root>
    );
  }
}

