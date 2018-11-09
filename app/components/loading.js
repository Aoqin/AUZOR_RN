/**
 * 公共组件： 加载组件
 * @flow
 */


import PropTypes from "prop-types";
import React, { Component } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import Spanner from "react-native-spinkit";
import * as Progress from "react-native-progress";
import { COLOR } from "../constants/baseStyleDefinition";

/**
 * ==============================================================================
 * <Loading /> 组件
 * ------------------------------------------------------------------------------
 * @param {?boolean} isVisible 是否显示加载组件
 * @param {?string} text 加载组件的文字
 * @param {?string} backgroundColor 背景颜色
 * @param {string} boxBackgroundColor 方框背景颜色
 * @param {?string} textColor 文字颜色
 * @param {?string} spannerColor 圆环颜色
 * @param {?number} progress 进度
 * @param {?boolean} showAsProgress 是否为进度条
 * @return {ReactElement}
 * ==============================================================================
 */
class Loading extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    text: PropTypes.string,
    backgroundColor: PropTypes.string,
    boxBackgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    spannerColor: PropTypes.string,
    progress: PropTypes.number,
    showAsProgress: PropTypes.bool
  };

  static defaultProps = {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    textColor: "#000000",
    boxBackgroundColor: COLOR.whiteBgColor,
    progress: 0,
    showAsProgress: false
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (!this.props.isVisible) {
      return <View />;
    }
    return (
      <View
        style={[
          styles.overlay,
          { backgroundColor: this.props.backgroundColor }
        ]}
      >
        <View
          style={[
            styles.box,
            { backgroundColor: this.props.boxBackgroundColor }
          ]}
        >
          {this.props.showAsProgress ? (
            <Progress.Circle
              size={40}
              textStyle={{
                fontSize: 10,
                color: this.props.spannerColor || "#3697ff"
              }}
              thickness={3}
              showsText={true}
              animated={true}
              formatText={progress => Math.round(progress * 100)}
              color={this.props.spannerColor || "#3697ff"}
              progress={this.props.progress}
            />
          ) : (
            <Spanner
              style={{ height: 50, width: 50 }}
              size={50}
              type={Platform.OS === "ios" ? "Arc" : "FoldingCube"}
              color={this.props.spannerColor || "#3697ff"}
            />
          )}
          {this.props.text ? (
            <Text style={[styles.text, { color: this.props.textColor }]}>
              {this.props.text}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }
}

/* StyleSheet
================================================================ */
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    width: 100,
    height: 100,
    borderRadius: 10
  },
  text: {
    marginTop: 15,
    color: "#aaaaaa",
    fontSize: 12,
    alignSelf: "center",
    textAlign: "center"
  }
});

/* Export
================================================================ */
export default Loading;
