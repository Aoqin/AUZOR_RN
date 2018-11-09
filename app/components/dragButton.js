/**
 * 拖动按钮
 * @flow
 */

import React from "react";
import { PanResponder, StyleSheet, View, Platform, Image } from "react-native";
import { pixeled, width, height } from "../utils/pixel";
import StupidTouchableOpacity from "./stupidTouchableOpacity";

// const BUTTON_SIZE = 68;
const BUTTON_SIZE = width / 320 * 68;
const isandroid = Platform.OS === "android" ? true : false;
const numberSize = width / 320 * 60;
type State = {
  isSelected: boolean
};
type Props = {
  initialPositionX: string,
  initialPositionY: string,
  size: string,
  clickHandler: any
};

class DragButton extends React.Component {
  _panResponder: {};
  _previousLeft: 0;
  _previousTop: 0;
  _circleStyles: {};
  state: State = {
    isSelected: false
  };
  props: Props;

  constructor(props) {
    super(props);
    this.handleClick = this._handleClick.bind(this);
    this.handlePanResponderGrant = this._handlePanResponderGrant.bind(this);
    this.handlePanResponderMove = this._handlePanResponderMove.bind(this);
    this.handlePanResponderEnd = this._handlePanResponderEnd.bind(this);
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: this.handlePanResponderGrant,
      onPanResponderMove: this.handlePanResponderMove,
      onPanResponderRelease: this.handlePanResponderEnd,
      onPanResponderTerminate: this.handlePanResponderEnd
    });
    let positionX = this.props.size
      ? width - this.props.size - pixeled(numberSize)
      : width - BUTTON_SIZE - pixeled(numberSize);
    let positionY = this.props.size
      ? height - this.props.size - pixeled(BUTTON_SIZE) - numberSize
      : height - BUTTON_SIZE - pixeled(BUTTON_SIZE) - numberSize;
    this._previousLeft = this.props.initialPositionX
      ? this.props.initialPositionX
      : positionX;
    this._previousTop = this.props.initialPositionY
      ? this.props.initialPositionY
      : positionY;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop
      }
    };
  }

  componentDidMount() {
    this._updatePosition();
  }

  render() {
    return (
      <View
        ref={circle => (this.circle = circle)}
        style={styles.circle}
        //{...this._panResponder.panHandlers}
      >
        <StupidTouchableOpacity
          style={[isandroid && styles.iosRadius, !isandroid && styles.button]}
          accessibilityLabel="btn-receiveCarIcon"
          onPress={this.handleClick}
        >
          {this.state.isSelected ? (
            <Image
              style={styles.icon}
              resizeMode={"contain"}
              source={require("../assets/images/bottom_nav/dragButton.png")}
            />
          ) : (
            <Image
              style={styles.icon}
              resizeMode={"contain"}
              source={require("../assets/images/bottom_nav/dragButton.png")}
            />
          )}
        </StupidTouchableOpacity>
      </View>
    );
  }

  _handleClick() {
    this.props.clickHandler();
  }

  _highlight() {
    this.setState({
      isSelected: true
    });
  }

  _unHighlight() {
    this.setState({
      isSelected: false
    });
  }

  _updatePosition() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  _handlePanResponderGrant(e: Object, gestureState: Object) {
    this._highlight();
  }

  _handlePanResponderMove(e: Object, gestureState: Object) {
    let left = this._previousLeft + gestureState.dx;
    let top = this._previousTop + gestureState.dy;
    if (left <= 0) {
      left = 0;
    }
    if (top <= 0) {
      top = 0;
    }
    if (left >= width - BUTTON_SIZE) {
      left = width - BUTTON_SIZE;
    }
    if (top >= height - BUTTON_SIZE - numberSize) {
      top = height - BUTTON_SIZE - numberSize;
    }
    this._circleStyles.style.left = left;
    this._circleStyles.style.top = top;
    this._updatePosition();
  }

  _handlePanResponderEnd(e: Object, gestureState: Object) {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  }
}

let styles = StyleSheet.create({
  circle: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    position: "absolute",
    left: 0,
    top: 0,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
    // borderRadius: BUTTON_SIZE / 2
  },
  iosRadius: {
    marginLeft: -6,
    marginTop: -7
  },
  button: {
    flex: 1,
    marginLeft: 13,
    marginTop: 15,
    position: "relative",
    borderRadius: BUTTON_SIZE / 2,
    height: BUTTON_SIZE,
    width: BUTTON_SIZE
  },
  icon: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE
  }
});

export default DragButton;
