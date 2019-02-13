/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
  AppState,
  AsyncStorage,
  Platform,
  StatusBar,
  View
} from 'react-native';
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";
import AppContainer from './appNavigator';
import configureStore from "./store/rootStore";


const store = configureStore({});

type Props = {};

export default class App extends Component<Props> {
  isAppStateActive: boolean = false;
  constructor() {
    super();
    console.log('app lunch')
  }

  handleAppStateChange(nextState: String) {
    if (nextState === "action") {
      this.isAppStateActive = true;
    } else {
      this.isAppStateActive = false;
    }
  }
  componentDidMount() {
    console.log('app didmount');
    //隐藏启动屏
    SplashScreen.hide();
    AppState.addEventListener("change", nextState => {
      console.log(`app change state to :: ${nextState}`);
      this.handleAppStateChange(nextState);
    });
  }
  renderStatusBar() {
    if (Platform.OS === "ios") {
      return (
        <StatusBar
          translucent={true}
          hidden={false}
          animated={false}
          barStyle="dark-content"
        />
      );
    } else {
      return (
        <StatusBar backgroundColor={COLOR.default} barStyle="light-content" />
      );
    }
  }
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}
