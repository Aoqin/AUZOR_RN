/**
 * 登录页面
 *  * <Template /> 页面/组件
 * ------------------------------------------------------------------------------
 * @param {?string} prop
 * @return {ReactElement}
 * @flow
 * @flow
 */

// Depdencies
import React, { PureComponent } from "react";
import { Image, Text, TextInput, View, ScrollView, StyleSheet } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import Icon from 'react-native-vector-icons/MaterialIcons'

// Components
// import StyleSheet from "../../../utils/styleSheet";
import { COLOR } from "../../constants/baseStyleDefinition";
import { pixeled } from "../../utils/pixel";
import StupidTouchableOpacity from "../../components/stupidTouchableOpacity";
import { ToastShort } from "../../components/toast";
import { doLogin } from "./action";
// import { checkLocalUser } from "../splash/action";

type State = {
  telNumber: string,
  password: string,
  showPassWd: boolean
};

class LoginPage extends PureComponent {

  static navigationOptions = {
    header: null
  };

  state: State = {
    telNumber: "",
    password: "",
    showPassWd: false,
    loginStatus: "init"
  };

  constructor(props) {
    super(props);
    this.doLoginBind = this.doLogin.bind(this);
    this.showPassBind = this.showPass.bind(this);
    this.clearTelBind = this.clearTel.bind(this);
  }

  clearTel() {
    this.setState({
      telNumber: ""
    });
  }

  showPass() {
    this.setState({
      showPassWd: !this.state.showPassWd
    });
  }

  doLogin() {
    let telNumber = this.state.telNumber;
    let myPassword = this.state.password;
    let telReg = !!telNumber.match(/^1\d{10}$/);
    if (telNumber === "" || myPassword === "") {
      ToastShort("手机号码和密码不能为空,请输入.");
    } else if (!telReg) {
      ToastShort("手机号码格式不正确!");
    } else if (this.state.loginStatus === "init") {
      this.props.doLogin(telNumber, myPassword);
      this.setState({ loginStatus: "loading" });
    } else {
      return;
    }
  }

  componentDidMount() { }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      if (nextProps.isSuccess) {
        global.loginStatus = "success";
        // this.props.checkLocalUser();
        setTimeout(() => {
          this.props.navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: "Main",
                  params: {
                    mainTab: "board"
                  }
                })
              ]
            })
          );
        }, 0);
        ToastShort("登录成功");
      } else {
        if (nextProps.loginStatus === "failed") {
          this.setState({ loginStatus: "init" });
          global.loginStatus = "failed";
        }
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}
        >
          <View style={styles.logoView}>
            <Image
              style={{ width: 117, height: 111 }}
              source={require("../../assets/login/Signin_logo_icon.png")}
            />
          </View>

          <View style={styles.inputItemWrap}>
            <View style={styles.iconStyle}>
              <Icon name="smartphone" size={24} color={COLOR.defaultFontColor} />
            </View>
            <View style={styles.inputStyle}>
              <TextInput
                underlineColorAndroid="transparent"
                keyboardType="numeric"
                style={styles.textInput}
                placeholderTextColor={COLOR.blackRank2}
                maxLength={11}
                accessibilityLabel="txt-loginTelephone"
                placeholder="请输入手机号"
                value={this.state.telNumber}
                onChangeText={text => {
                  this.setState({ telNumber: text });
                }}
              />
              <StupidTouchableOpacity
                style={styles.eyeIcon}
                activeOpacity={1}
                accessibilityLabel="btn-loginClearTxt"
                onPress={this.clearTelBind}
              >
                {this.state.telNumber !== "" ? (
                  <Icon name="clear" size={24} color={COLOR.defaultFontColor} />
                ) : null}
              </StupidTouchableOpacity>
            </View>
          </View>

          <View
            style={[styles.inputItemWrap, { marginTop: 26, marginBottom: 10 }]}
          >
            <View style={styles.iconStyle}>
              <Icon name="lock" size={24} color={COLOR.defaultFontColor} />
            </View>
            <View style={styles.inputStyle}>
              <TextInput
                underlineColorAndroid="transparent"
                style={styles.textInput}
                placeholder="请输入密码"
                accessibilityLabel="txt-loginPassword"
                secureTextEntry={!this.state.showPassWd}
                placeholderTextColor={COLOR.blackRank2}
                autoCorrect={false}
                autoCapitalize="none"
                value={this.state.password}
                onChangeText={text => {
                  this.setState({ password: text });
                }}
              />
              <StupidTouchableOpacity
                style={styles.eyeIcon}
                activeOpacity={1}
                accessibilityLabel="txt-loginShowPassword"
                onPress={this.showPassBind}
              >
                {this.state.showPassWd ? (
                  <Icon name="panorama-fish-eye" size={30} color={COLOR.defaultFontColor} />
                ) : (
                    <Icon name="remove-red-eye" size={30} color={COLOR.defaultFontColor} />
                  )}
              </StupidTouchableOpacity>
            </View>
          </View>

          <StupidTouchableOpacity
            style={
              this.state.loginStatus === "init"
                ? styles.loginWrap
                : styles.loginWrapDisable
            }
            accessibilityLabel="btn-loginBtn"
            activeOpacity={0.9}
            onPress={this.doLoginBind}
          >
            <View accessibilityLabel="login_btn">
              <Text
                style={
                  this.state.loginStatus === "init"
                    ? styles.loginText
                    : styles.loginTextDisable
                }
              >
                {this.state.loginStatus === "init" ? "登 录" : "正在登录..."}
              </Text>
            </View>
          </StupidTouchableOpacity>
        </ScrollView>
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
  logoView: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 40
  },
  logoImgFont: {
    alignSelf: "center",
    justifyContent: "center"
  },
  inputItemWrap: {
    marginLeft: 8,
    marginRight: 8,
    flexDirection: "row",
    height: 45,
    borderBottomWidth: pixeled(1),
    borderBottomColor: COLOR.disabled
  },
  iconStyle: {
    height: 45,
    alignSelf: "flex-start",
    justifyContent: "center"
  },
  inputStyle: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 5
  },
  textInput: {
    flex: 1,
    color: COLOR.defaultFont,
    fontSize: 14
  },
  loginWrap: {
    backgroundColor: COLOR.default,
    margin: 8,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  },
  loginWrapDisable: {
    backgroundColor: COLOR.disabled,
    margin: 8,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3
  },
  loginText: {
    fontSize: 16,
    color: COLOR.primaryFontColor,
    marginTop: 10,
    marginBottom: 10
  },
  loginTextDisable: {
    fontSize: 16,
    color: COLOR.defaultFont,
    marginTop: 10,
    marginBottom: 10
  },
  eyeIcon: {
    width: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});

/* react-redux store
================================================================ */

const mapStateToProps = state => {
  console.log();
  return {
    status: state.loginPageReducer.status,
    isSuccess: state.loginPageReducer.isSuccess,
    auth: state.loginPageReducer.auth,
    loginFont: state.loginPageReducer.loginFont,
    loginStatus: state.loginPageReducer.loginStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkLocalUser: () => {
      // checkLocalUser(dispatch);
    },
    doLogin: (telNumber, password) => {
      doLogin(dispatch, telNumber, password);
    },
    dispatch
  };
};

/* Export
================================================================ */

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
