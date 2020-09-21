import React, { Component } from "react";
import 'react-native-gesture-handler';
import { SafeAreaView, StatusBar, View, Platform, NativeModules } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./stores/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import App from "./navigators/App";
String.prototype.Capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
}
export default class Root extends Component {
  constructor(props) {
    super(props);
    const { persistor, store } = configureStore();
    this.persistor = persistor;
    this.store = store;
  }

  render() {
    // console.disableYellowBox = true;    //To disable yellowbox
    //NativeModules.ExceptionsManager = null;   //To Stop seeing redscreen
    const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 10 : StatusBar.currentHeight;
    return (
        <Provider store={this.store}>
          <PersistGate persistor={this.persistor}>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#0077c0' }}>
              <StatusBar barStyle={"light-content"} backgroundColor={"#5927e0"} />
                <App persistor={this.persistor} />
            </SafeAreaView>
          </PersistGate>
        </Provider>
    );
  }
}

global.XMLHttpRequest = global.originalXMLHttpRequest ?
  global.originalXMLHttpRequest :
  global.XMLHttpRequest;
global.FormData = global.originalFormData ?
  global.originalFormData :
  global.FormData;

fetch; // Ensure to get the lazy property

if (window.__FETCH_SUPPORT__) { // it's RNDebugger only to have
  window.__FETCH_SUPPORT__.blob = false;
} else {
  global.Blob = global.originalBlob ?
    global.originalBlob :
    global.Blob;
  global.FileReader = global.originalFileReader ?
    global.originalFileReader :
    global.FileReader;
}

