

import PropTypes from "prop-types";

import React from "react";

export default class StaticContainer extends React.Component {
  static propTypes = {
    shouldUpdate: PropTypes.bool
  };

  shouldComponentUpdate(nextProps) {
    return !!nextProps.shouldUpdate;
  }

  render() {
    let { children } = this.props;
    return children ? React.Children.only(children) : null;
  }
}
