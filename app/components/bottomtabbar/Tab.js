
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";
import StupidTouchableOpacity from "../stupidTouchableOpacity";
import { PixelRatio } from "react-native";

export default class Tab extends React.Component {
  static propTypes = {
    testID: PropTypes.string,
    title: PropTypes.string,
    titleStyle: Text.propTypes.style,
    badge: PropTypes.element,
    onPress: PropTypes.func,
    hidesTabTouch: PropTypes.bool,
    allowFontScaling: PropTypes.bool,
    style: ViewPropTypes.style
  };

  constructor(props, context) {
    super(props, context);

    this._handlePress = this._handlePress.bind(this);
  }

  render() {
    let { title, badge } = this.props;
    let icon = null;
    if (React.Children.count(this.props.children) > 0) {
      icon = React.Children.only(this.props.children);
    }

    if (title) {
      title = (
        <Text
          numberOfLines={1}
          allowFontScaling={!!this.props.allowFontScaling}
          style={[styles.title, this.props.titleStyle]}
        >
          {title}
        </Text>
      );
    }

    if (badge) {
      badge = React.cloneElement(badge, {
        style: [styles.badge, badge.props.style]
      });
    }

    let tabStyle = [
      styles.container,
      title ? null : styles.untitledContainer,
      this.props.style
    ];
    return (
      <StupidTouchableOpacity
        testID={this.props.testID}
        accessibilityLabel={`btn-tabBadge${icon}`}
        activeOpacity={this.props.hidesTabTouch ? 1.0 : 0.8}
        onPress={this._handlePress}
        style={tabStyle}
      >
        <View>
          {icon}
          {badge}
        </View>
        {title}
      </StupidTouchableOpacity>
    );
  }

  _handlePress(event) {
    if (this.props.onPress) {
      this.props.onPress(event);
    }
  }
}

let styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -2,
    right: -5
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  untitledContainer: {
    paddingBottom: 13
  },
  title: {
    color: "#929292",
    fontSize: 22 / PixelRatio.get(),
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "stretch",
    marginTop: 4,
    marginBottom: 1 + 1 / PixelRatio.get()
  }
});
