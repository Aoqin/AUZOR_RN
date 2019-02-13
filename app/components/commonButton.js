/**
 * 公共组件：按钮
 */
"use strict";
import PropTypes from "prop-types";

import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLOR } from "../constants/baseStyleDefinition";
import { pixeled } from "../utils/pixel";

const BUTTON_HEIGHT_BIG = 70,
  BUTTON_HEIGHT = 40,
  BUTTON_HEIGHT_SM = 32,
  BUTTON_HEIGHT_EX_SM = 24;

/**
 * ==============================================================================
 * <CommonButton /> 组件
 * ------------------------------------------------------------------------------
 * @param {?string} buttonSize       按钮的大小（big,medium,small）
 * @param {?string} type             按钮的形状（方的default，还是圆的round,圆角的为radius）
 * @param {?string} theme            按钮的主题（颜色）
 * @param {string} caption           按钮的标题
 * @param {string} captionTheme      按钮文字的样式
 * @param {?number} fontSize         按钮文字的大小
 * @param {?number} opacity          按钮的透明度
 * @param {?any} style               按钮的样式
 * @param {function} pressClick      按钮的点击事件
 * @param {function} pressClick      按钮的点击事件
 * @param {?number} buttonRadius     按钮的圆角
 * @return {ReactElement}
 * @flow
 * ==============================================================================
 */
type Props = {
  buttonSize: string,
  type: string,
  theme: string,
  caption: string,
  captionTheme: string,
  style: any,
  fontSize: number,
  opacity: number,
  pressClick: Function,
  buttonRadius: number
};

class CommonButton extends Component {
  props: {
    theme?:
      | "default"
      | "red"
      | "yellow"
      | "green"
      | "white"
      | "white_border"
      | "disable",
    type?: "radius" | "round" | "default",
    buttonSize?: "big" | "medium" | "small" | "extraSmall",
    opacity?: number,
    caption: string,
    style?: any,
    fontSize?: number,
    onPress: () => {}
  };
  static defaultProps = {
    theme: "default",
    buttonSize: "medium",
    type: "default",
    fontSize: 15,
    opacity: 1,
    pressClick: () => {}
  };

  getTheme() {
    const { theme } = this.props;
    let buttonTheme,
      captionTheme; /*buttonTheme:按钮的主题，，，captionTheme文字的主题*/
    if (theme === "yellow") {
      buttonTheme = { backgroundColor: COLOR.hintColorWarning };
      captionTheme = { color: COLOR.white };
    } else if (theme === "default") {
      buttonTheme = { backgroundColor: COLOR.default };
      captionTheme = { color: COLOR.white };
    } else if (theme === "disable") {
      buttonTheme = { backgroundColor: COLOR.borderDefaultColor };
      captionTheme = { color: COLOR.blackRank2 };
    } else if (theme === "red") {
      buttonTheme = { backgroundColor: COLOR.hintColorDanger };
      captionTheme = { color: COLOR.white };
    } else if (theme === "green") {
      buttonTheme = { backgroundColor: COLOR.hintColorGood };
      captionTheme = { color: COLOR.white };
    } else if (theme === "white") {
      buttonTheme = { backgroundColor: COLOR.white };
      captionTheme = { color: COLOR.default };
    } else if (theme === "white_border") {
      buttonTheme = {
        backgroundColor: COLOR.white,
        borderWidth: pixeled(1),
        borderColor: COLOR.default
      };
      captionTheme = { color: COLOR.default };
    } else {
      buttonTheme = { backgroundColor: COLOR.default };
      captionTheme = { color: COLOR.white };
    }
    return { buttonTheme, captionTheme };
  }

  getButtonSize() {
    const { buttonSize } = this.props;
    let containerType, buttonType;
    if (buttonSize === "big") {
      containerType = { height: BUTTON_HEIGHT_BIG };
      buttonType = { paddingHorizontal: 0 };
    } else if (buttonSize === "medium") {
      containerType = { height: BUTTON_HEIGHT };
      buttonType = { paddingHorizontal: 0 };
    } else if (buttonSize === "small") {
      containerType = { height: BUTTON_HEIGHT_SM };
      buttonType = { paddingHorizontal: 12 };
    } else if (buttonSize === "extraSmall") {
      containerType = { height: BUTTON_HEIGHT_EX_SM };
      buttonType = { paddingHorizontal: 4 };
    } else {
      containerType = { height: BUTTON_HEIGHT };
      buttonType = { paddingHorizontal: 0 };
    }
    return { containerType, buttonType };
  }

  getRoundType() {
    const { type, buttonRadius } = this.props;
    let containerBorderRadius;
    if (type === "radius") {
      containerBorderRadius = { borderRadius: buttonRadius };
    } else if (type === "round") {
      containerBorderRadius = { borderRadius: BUTTON_HEIGHT / 2 };
    } else {
      containerBorderRadius = { borderRadius: 0 };
    }
    return { containerBorderRadius };
  }

  render() {
    let { opacity, style, fontSize, icon } = this.props;
    const caption = this.props.caption && this.props.caption.toUpperCase();
    const { buttonTheme, captionTheme } = this.getTheme();
    const { containerType, buttonType } = this.getButtonSize();
    const { containerBorderRadius } = this.getRoundType();
    let iconImage;
    if (icon) {
      iconImage = (
        <Image source={icon} style={[styles.tipTriangle, styles.icon]} />
      );
    }

    if (this.props.pressClick) {
      return (
        <TouchableOpacity
          style={[containerType]}
          accessibilityLabel="btn-commonSure"
          onPress={this.props.pressClick}
          activeOpacity={opacity}
        >
          <View
            style={[
              styles.button,
              buttonTheme,
              containerBorderRadius,
              buttonType,
              style
            ]}
          >
            <Text
              style={[styles.caption, captionTheme, { fontSize: fontSize }]}
            >
              {caption ? caption : "确认"}
            </Text>
            {iconImage}
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <View style={[containerType]}>
          <View
            style={[
              styles.button,
              buttonTheme,
              containerBorderRadius,
              buttonType,
              style
            ]}
          >
            <Text
              style={[styles.caption, captionTheme, { fontSize: fontSize }]}
            >
              {caption ? caption : "确认"}
            </Text>
            {iconImage}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: BUTTON_HEIGHT
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  caption: {
    fontSize: 15,
    textAlign: "center"
  },
  icon: {
    marginRight: 0
  },
  tipTriangle: {
    marginRight: 0,
    position: "absolute",
    right: 0,
    bottom: 0
  }
});

/* Export
================================================================ */
module.exports = CommonButton;
