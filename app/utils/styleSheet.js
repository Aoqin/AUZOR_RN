/**
 * 封装react native StyleSheet
 *
 * StyleSheet.create({
 *  h1: {
 *      ios: {
 *          color: 'red'
 *      },
 *      android: {
 *          color: 'green'
 *      }
 *  }
 * });
 *
 * @flow
 */
"use strict";

import { StyleSheet, Platform } from "react-native";

export default {
  create(styleSheet: Object): { [name: string]: number } {
    const platformStyles = {};
    Object.keys(styleSheet).forEach(name => {
      let { ios, android, ...style } = { ...styleSheet[name] };
      if (ios && Platform.OS === "ios") {
        style = { ...style, ...ios };
      }
      if (android && Platform.OS === "android") {
        style = { ...style, ...android };
      }
      platformStyles[name] = style;
    });
    return StyleSheet.create(platformStyles);
  }
};
