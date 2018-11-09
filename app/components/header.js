/**
 * 公共组件：header
 */

import React, { Component } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { COLOR } from "../constants/baseStyleDefinition";
const isandroid = Platform.OS === "android" ? true : false;

/**
 * ==============================================================================
 * <Header /> 组件
 * ------------------------------------------------------------------------------
 * @param {?string} title              header的文字
 * @param {?any} leftArea              header左边区域(传入元素)
 * @param {?any} rightArea             header右边区域(传入元素)
 * @param {?any} headerWrapStyle       header样式（可改颜色，高度等）
 * @param {?any} titleStyle            header文字样式
 * @return {ReactElement}
 * @flow
 * ==============================================================================
 */

type Props = {
  title: string,
  leftArea: any,
  rightArea: any,
  headerWrapStyle: any,
  titleStyle: any
};

class Header extends Component {
  props: {
    title: string,
    leftArea?: any,
    rightArea?: any,
    headerWrapStyle?: any,
    titleStyle?: any
  };

  static defaultProps = {
    title: "",
    leftArea: "",
    rightArea: "",
    headerWrapStyle: {},
    titleStyle: {}
  };

  render() {
    const {
      leftArea,
      rightArea,
      title,
      headerWrapStyle,
      titleStyle
    } = this.props;
    return (
      <View
        accessibilityLabel="header_wrap"
        style={[styles.headerWrap, headerWrapStyle]}
      >
        <View style={styles.leftStyle}>{leftArea ? leftArea : null}</View>
        <Text style={[styles.title, titleStyle]}>{title ? title : ""}</Text>
        <View style={styles.rightStyle}>{rightArea ? rightArea : null}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerWrap: {
    height: 40,
    backgroundColor: isandroid ? COLOR.default : COLOR.white,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  leftStyle: {
    flex: 1,
    marginLeft: 10
  },
  rightStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: isandroid ? COLOR.white : COLOR.blackRank0
  }
});

/* Export
================================================================ */
module.exports = Header;
