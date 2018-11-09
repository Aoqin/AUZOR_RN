

import { Set } from "immutable";
import PropTypes from "prop-types";
import React from "react";
import { StyleSheet, View, ViewPropTypes } from "react-native";

import Badge from "./Badge";
import StaticContainer from "./StaticContainer";
import Tab from "./Tab";
import TabBar from "./TabBar";
import TabNavigatorItem from "./TabNavigatorItem";
import { COLOR } from "../../constants/baseStyleDefinition";
import { pixeled } from "../../utils/pixel";

export default class TabNavigator extends React.Component {
  static propTypes = {
    ...ViewPropTypes,
    sceneStyle: ViewPropTypes.style,
    tabBarStyle: TabBar.propTypes.style,
    renderShadow: TabBar.propTypes.renderShadow,
    hidesTabTouch: PropTypes.bool,
    titleStyle: TabBar.propTypes.style
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      renderedSceneKeys: this._updateRenderedSceneKeys(props.children)
    };

    this._renderChildrenTabs = this._renderChildrenTabs.bind(this);
    this._renderTab = this._renderTab.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let { renderedSceneKeys } = this.state;
    this.setState({
      renderedSceneKeys: this._updateRenderedSceneKeys(
        nextProps.children,
        renderedSceneKeys
      )
    });
  }

  _getSceneKey(item, index) {
    return `scene-${item.key !== null ? item.key : index}`;
  }

  _updateRenderedSceneKeys(children, oldSceneKeys = Set()) {
    let newSceneKeys = Set().asMutable();
    React.Children.forEach(children, (item, index) => {
      if (item === null) {
        return;
      }
      let key = this._getSceneKey(item, index);
      if (oldSceneKeys.has(key) || item.props.selected) {
        newSceneKeys.add(key);
      }
    });
    return newSceneKeys.asImmutable();
  }

  render() {
    let {
      style,
      children,
      tabBarStyle,
      renderShadow,
      sceneStyle,
      ...props
    } = this.props;
    let scenes = [];

    React.Children.forEach(children, (item, index) => {
      if (item === null) {
        return;
      }
      let sceneKey = this._getSceneKey(item, index);
      if (!this.state.renderedSceneKeys.has(sceneKey)) {
        return;
      }

      let { selected } = item.props;
      let scene = (
        <SceneContainer key={sceneKey} selected={selected} style={sceneStyle}>
          {item}
        </SceneContainer>
      );

      scenes.push(scene);
    });

    return (
      <View {...props} style={[styles.container, style]}>
        {scenes}
        <TabBar
          accessibilityLabel="bottom_icon"
          style={tabBarStyle}
          renderShadow={renderShadow}
        >
          {React.Children.map(children, this._renderChildrenTabs)}
        </TabBar>
      </View>
    );
  }

  _renderChildrenTabs(child) {
    return this._renderTab(child);
  }

  _renderTab(item) {
    let icon;
    if (item === null) {
      return;
    }
    if (item.props.selected) {
      if (item.props.renderSelectedIcon) {
        icon = item.props.renderSelectedIcon();
      } else if (item.props.renderIcon) {
        let defaultIcon = item.props.renderIcon();
        icon = React.cloneElement(defaultIcon, {
          style: [defaultIcon.props.style, styles.defaultSelectedIcon]
        });
      }
    } else if (item.props.renderIcon) {
      icon = item.props.renderIcon();
    }

    let badge;
    if (item.props.renderBadge) {
      badge = item.props.renderBadge();
    } else if (item.props.badgeText) {
      badge = <Badge>{item.props.badgeText}</Badge>;
    }

    return (
      <Tab
        testID={item.props.testID}
        title={item.props.title}
        allowFontScaling={item.props.allowFontScaling}
        titleStyle={[
          [item.props.titleStyle, styles.titleStyle],
          item.props.selected
            ? [styles.defaultSelectedTitle, item.props.selectedTitleStyle]
            : null
        ]}
        badge={badge}
        accessibilityLabel={`btn-tabNavigator${item.props.testID}`}
        onPress={item.props.onPress}
        hidesTabTouch={this.props.hidesTabTouch}
        style={item.props.tabStyle}
      >
        {icon}
      </Tab>
    );
  }
}

class SceneContainer extends React.Component {
  static propTypes = {
    ...View.propTypes,
    selected: PropTypes.bool
  };

  render() {
    let { selected, ...props } = this.props;
    return (
      <View
        {...props}
        pointerEvents={selected ? "auto" : "none"}
        removeClippedSubviews={!selected}
        style={[
          styles.sceneContainer,
          selected ? null : styles.hiddenSceneContainer,
          props.style
        ]}
      >
        <StaticContainer shouldUpdate={selected}>
          {this.props.children}
        </StaticContainer>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  sceneContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
    // paddingBottom: Layout.tabBarHeight
  },
  hiddenSceneContainer: {
    overflow: "hidden",
    opacity: 0
  },
  defaultSelectedTitle: {
    color: COLOR.default
  },
  defaultSelectedIcon: {},
  titleStyle: {
    marginBottom: pixeled(12)
  }
});

TabNavigator.Item = TabNavigatorItem;
