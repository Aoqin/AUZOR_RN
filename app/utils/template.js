/**
 * 模版页面
 * @flow
 */
"use strict";

// Depdencies
import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

// Components
import BasePage from "../components/basePage";
import StyleSheet from "../utils/styleSheet";
import { COLOR } from "../constants/baseStyleDefinition";
import { width, height, pixeled } from "../utils/pixel";
import Loading from "../components/loading";

// Pages

type Props = {};
type State = {};

/**
 * ==============================================================================
 * <Template /> 页面/组件
 * ------------------------------------------------------------------------------
 * @param {?string} prop
 * @return {ReactElement}
 * @flow
 * ==============================================================================
 */
class Template extends BasePage {
  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    return <View />;
  }
}

/* StyleSheet
================================================================ */

const styles = StyleSheet.create({});

/* react-redux store
================================================================ */

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

/* Export
================================================================ */

export default connect(mapStateToProps, mapDispatchToProps)(Template);
