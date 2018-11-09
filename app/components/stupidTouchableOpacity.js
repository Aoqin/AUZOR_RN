/**
 * 公共组件：截流点击组件
 * @flow
 */

import PropTypes from "prop-types";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native";

/**
 * ==============================================================================
 * <StupidTouchableOpacity /> 组件
 * ------------------------------------------------------------------------------
 * @param {?Object} propTypes TouchableOpacity组件属性
 * @param {?string} lockTime 截流时间
 * @return {ReactElement}
 * ==============================================================================
 */
class StupidTouchableOpacity extends Component {
  constructor(props) {
    super(props);
    this.lockTime =
      //发版本用800，调试用0
      typeof this.props.lockTime === "number" ? this.props.lockTime : 800;
  }

  componentWillUnmount() {
    if (this.lock !== null) {
      clearTimeout(this.lock);
    }
  }

  static propTypes = {
    ...TouchableOpacity.propTypes,
    lockTime: PropTypes.number
  };

  onPress() {
    if (!this.locked) {
      let that = this;
      if (this.lock !== null) {
        clearTimeout(this.lock);
      }
      this.locked = true;
      this.lock = setTimeout(() => {
        that.locked = false;
      }, this.lockTime);
      if (typeof this.props.onPress === "function") {
        this.props.onPress();
      }
    }
  }

  render() {
    return (
      <TouchableOpacity {...this.props} onPress={this.onPress.bind(this)}>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

/* Export
================================================================ */
export default StupidTouchableOpacity;
