

import PropTypes from "prop-types";

import React from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";

export default class TabBar extends React.Component {
  static propTypes = {
    ...Animated.View.propTypes,
    renderShadow: PropTypes.func
  };

  render() {
    return (
      <Animated.View
        {...this.props}
        style={[styles.container, this.props.style]}
      >
        {this.props.renderShadow ? this.props.renderShadow.call(this) : null}
        {this.props.children}
      </Animated.View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    overflow: "visible"
  }
});
