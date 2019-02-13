/**
 * 启动页面
 * 
 */
import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { checkLocalUser, loadLocalRemoteConfig, getJson } from "./action"

export class AuthLoading extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getJson();
    this.props.checkLocalUser();
  }

  componentDidMount() {
    console.log('welcome to app');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.getJsonState !== this.props.getJsonState) {
      if (nextProps.getJsonState === "success") {
        let androidData = nextProps.jsonData.android;
        let iosData = nextProps.jsonData.ios;
        let alertTitle = "更新提示";
        let alertContent = "";
        let alertBtn = [];
        let version = global.buildVersion;
        let newVersionNo = "";
        let packageUrl = "";
        let status = "0";
        let minVersionNo = "";
        let flag = 0;
        //ios
        if (Platform.OS === "ios") {
          newVersionNo = iosData.versionNo;
          packageUrl = iosData.packageUrl;
          status = iosData.status;
          minVersionNo = iosData.minVersionNo;
          alertContent = iosData.content;
        }
        // android
        if (Platform.OS === "android") {
          newVersionNo = androidData.versionNo;
          packageUrl = androidData.packageUrl;
          status = androidData.status;
          minVersionNo = androidData.minVersionNo;
          alertContent = androidData.content;
        }
        //判断当前版本是否是最新版本
        if (minVersionNo - version > 0) {
          flag = flag + 1;
          if (!alertContent) {
            alertContent = "您的车况大师App版本太老，必须升级后才能使用！";
          }
          alertBtn = [
            {
              text: "好，去升级",
              onPress: () => {
                if (Platform.OS === "android") {
                  NativeModules.MyMtaModule.MtaEvent("splash_tooOld", "");
                }
                Linking.openURL(packageUrl).catch(
                  err => { }
                  // console.error("An error occurred", err)
                );
              }
            }
          ];
        } else {
          if (newVersionNo - version > 0) {
            if (status === "1") {
              flag = flag + 1;
              if (!alertContent) {
                alertContent =
                  "检测到新版本的车况大师App，更新了一大堆功能，请快快升级体验吧!";
              }
              alertBtn = [
                {
                  text: "以后再更新",
                  onPress: () => { },
                  style: "cancel"
                },
                {
                  text: "去升级",
                  onPress: () => {
                    if (Platform.OS === "android") {
                      NativeModules.MyMtaModule.MtaEvent("splash_old", "");
                    }
                    Linking.openURL(packageUrl).catch(
                      err => { }
                      // console.error("An error occurred", err)
                    );
                  }
                }
              ];
            } else if (status === "2") {
              flag = flag + 1;
              if (!alertContent) {
                alertContent = "您的车况大师App版本太老，必须升级后才能使用！";
              }
              alertBtn = [
                {
                  text: "去升级",
                  onPress: () => {
                    Linking.openURL(packageUrl).catch(
                      err => { }
                      // console.error("An error occurred", err)
                    );
                  }
                }
              ];
            }
          }
        }

        if (flag > 0) {
          flag = 0;
          Alert.alert(alertTitle, alertContent, alertBtn, {
            cancelable: false
          });
        }
      }
    }

    if (nextProps.getJsonState !== "init") {
      if (nextProps.isLogin === "success") {
        this.goToSpecifiedPage("Main");
      } else if (nextProps.isLogin === "failed") {
        this.goToSpecifiedPage("SignIn");
      }
    }
  }

  goToSpecifiedPage(routeName) {
    const { navigation } = this.props;
    let resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: routeName })]
    });
    navigation.dispatch(resetAction);
  }


  render() {
    return (
      <View style={styles.container}>
        <Text> prop </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  }
});

const mapStateToProps = state => {
  return {
    auth: state.AuthLoadingReducer.auth,
    isLogin: state.AuthLoadingReducer.isLogin,
    loading: state.AuthLoadingReducer.loading,
    needUpdateState: state.AuthLoadingReducer.need_update_state,
    remoteConfig: state.AuthLoadingReducer.remoteConfig,
    versionState: state.AuthLoadingReducer.versionState,
    getJsonState: state.AuthLoadingReducer.getJsonState,
    jsonData: state.AuthLoadingReducer.jsonData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkLocalUser: () => {
      checkLocalUser(dispatch);
    },
    getJson: () => {
      getJson(dispatch);
    },
    loadLocalRemoteConfig: () => {
      loadLocalRemoteConfig(dispatch);
    },
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading)
