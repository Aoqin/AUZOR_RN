"use strict";
import { PixelRatio, Platform, Dimensions } from "react-native";

// iPhoneX
const X_WIDTH: number = 375;
const X_HEIGHT: number = 812;

// screen
const SCREEN_WIDTH: number = Dimensions.get("window").width;
const SCREEN_HEIGHT: number = Dimensions.get("window").height;

const pixel_1: number = (1 / PixelRatio.get()).toFixed(2);

function pixeled(pix: number): Number {
  return pix * pixel_1;
}

function isIphoneX(): Boolean {
  return (
    Platform.OS === "ios" &&
    ((SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH) ||
      (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT))
  );
}

module.exports = {
  pixeled,
  isIphoneX: isIphoneX(), // 兼容iPhoneX
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT
};
