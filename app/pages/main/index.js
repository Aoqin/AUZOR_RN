/**
 * 首页，包含车间看板、接车、车辆、我的模块
 *  * <MainPage /> App首页
 * ------------------------------------------------------------------------------
 * @return {ReactElement}
 * @flow
 * @flow
 */
"use strict";
// Depdencies
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

// Components
// import TabNavigator from "../../components/bottomtabbar/TabNavigator";

// import StyleSheet from "../../utils/styleSheet";
import { COLOR } from "../../constants/baseStyleDefinition";
import { pixeled } from "../../utils/pixel";
import { selectMainTab } from "./action";
import DragButton from "../../components/dragButton";

// Pages
import BoardPage from "../board";
import PersonPage from "../personcenter";
import CarsPage from "../cars";

type Props = {
  mainTab: string
};
type State = {};

class MainPage extends PureComponent {
  props: Props;
  state: State;
  constructor(props) {
    console.log('main page constructor');
    super(props);
    this.handleDrageBtnClick = this._handleDrageBtnClick.bind(this);
  }

  componentDidMount() {
    this.props.changeTab("board");
  }

  _handleDrageBtnClick() {
    this.goToPickUp();
  }

  goToPickUp() {
    this.props.navigation.navigate("VerifyLicense");
  }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
  }

  render() {
    const { mainTab } = this.props;
    return (
      <View style={styles.container}>
        <Text>Main Page working</Text>
        <DragButton clickHandler={this.handleDrageBtnClick} />
      </View>
    );
  }
}

/* StyleSheet
================================================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white
  },
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopColor: "#eeeeee",
    borderTopWidth: pixeled(1)
  },
  navigationItemIcon: {
    height: 30,
    width: 30,
    marginBottom: -7,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: 20,
    height: 20
  }
});

/* react-redux store
================================================================ */

const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.loginPageReducer.auth,
    mainTab: state.MainPageReducer.mainTab,
    nav: state.nav
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeTab: tabName => {
      selectMainTab(dispatch, tabName);
    },
    dispatch
  };
};

/* Export
================================================================ */

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
