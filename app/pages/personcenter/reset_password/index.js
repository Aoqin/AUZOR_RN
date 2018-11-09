import React,{PureComponent} from "react";
import { View, Text, TextInput, Platform, Image } from "react-native";

import StyleSheet from "../../../utils/styleSheet";
import Header from "../../../components/header";
import StupidTouchableOpacity from "../../../components/stupidTouchableOpacity";
import CommonButton from "../../../components/commonButton";
import { COLOR } from "../../../constants/baseStyleDefinition";
import { ToastShort } from "../../../utils/rootToast";
import { width } from "../../../utils/pixel";

import { connect } from "react-redux";
import { DoResetPassword } from "./actions";

const isandroid = Platform.OS === "android" ? true : false;

class ResetPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      isShow2: true
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetStatus !== this.props.resetStatus) {
      if (nextProps.resetStatus === "success") {
        ToastShort("重置密码成功！");
        this.props.navigation.goBack();
      } else if (nextProps.resetStatus === "failed") {
        ToastShort("重置密码失败，请重试！");
      }
    }
  }
  resetPassword() {
    let password = this.state.password;
    let confirm = this.state.confirm;
    if (password === "" || confirm === "") {
      ToastShort("密码不能为空,请输入!");
      return;
    } else if (
      password.length < 6 ||
      confirm.length < 6 ||
      password.length > 20 ||
      confirm.length > 20
    ) {
      ToastShort("密码长度是6-20位!");
      return;
    } else if (password !== confirm) {
      ToastShort("两次输入的密码不一致,请重新输入!");
      return;
    } else {
      this.props.DoResetPassword(password, this.props.auth.token);
    }
  }

  showPass() {
    this.setState({ isShow: !this.state.isShow });
  }

  showPass2() {
    this.setState({ isShow2: !this.state.isShow2 });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="重置密码"
          leftArea={
            <StupidTouchableOpacity
              accessibilityLabel="btn-resetPass"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 22
                }}
                source={
                  isandroid
                    ? require("../../../assets/images/back-W.png")
                    : require("../../../assets/images/back.png")
                }
              />
            </StupidTouchableOpacity>
          }
        />
        <View
          style={{
            paddingLeft: 10,
            paddingRight: 10
          }}
        >
          <Text style={styles.resetPassTitle}>请输入新密码</Text>
          <View style={styles.resetPass}>
            <TextInput
              underlineColorAndroid="transparent"
              maxLength={20}
              style={[styles.pass, { backgroundColor: COLOR.white }]}
              placeholder="请输入您的新密码"
              accessibilityLabel="txt-resetPassNew"
              placeholderTextColor={COLOR.blackRank2}
              secureTextEntry={this.state.isShow}
              onChangeText={text => {
                this.setState({ password: text });
              }}
            />
            <StupidTouchableOpacity
              style={styles.eyeIcon}
              accessibilityLabel="btn-showNewPass"
              activeOpacity={1}
              onPress={this.showPass.bind(this)}
            >
              {this.state.isShow ? (
                <Image
                  style={styles.icon}
                  source={require("../../../assets/images/dont-show.png")}
                />
              ) : (
                <Image
                  style={styles.icon}
                  source={require("../../../assets/images/show.png")}
                />
              )}
            </StupidTouchableOpacity>
          </View>
          <View style={[styles.resetPass, { marginBottom: 30 }]}>
            <TextInput
              underlineColorAndroid="transparent"
              style={[styles.pass, { backgroundColor: COLOR.white }]}
              placeholder="确认密码"
              maxLength={20}
              accessibilityLabel="txt-resetPassSure"
              placeholderTextColor={COLOR.blackRank2}
              secureTextEntry={this.state.isShow2}
              onChangeText={text => {
                this.setState({ confirm: text });
              }}
            />
            <StupidTouchableOpacity
              style={styles.eyeIcon}
              activeOpacity={1}
              accessibilityLabel="btn-resetPassShowSurePass"
              onPress={this.showPass2.bind(this)}
            >
              {this.state.isShow2 ? (
                <Image
                  style={styles.icon}
                  source={require("../../../assets/images/dont-show.png")}
                />
              ) : (
                <Image
                  style={styles.icon}
                  source={require("../../../assets/images/show.png")}
                />
              )}
            </StupidTouchableOpacity>
          </View>

          <CommonButton
            buttonSize="medium"
            type="radius"
            accessibilityLabel="btn-resetPassConfim"
            caption="确认修改"
            fontSize={16}
            opacity={0.8}
            pressClick={this.resetPassword.bind(this)}
            theme="default"
          />
        </View>
      </View>
    );
  }
}

/* StyleSheet
================================================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.greyBgColor
  },
  resetPass: {
    height: 45,
    marginTop: 10
  },
  resetPassTitle: {
    marginTop: 45,
    marginBottom: 20,
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16
  },
  pass: {
    paddingLeft: 10,
    height: 45,
    flexDirection: "row",
    marginBottom: 10,
    fontSize: 14
  },
  btn: {
    marginLeft: 15,
    marginRight: 15,
    width: width - 30,
    height: 45,
    marginTop: 30,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center"
  },
  btnFont: {
    fontSize: 16,
    fontWeight: "bold",
    justifyContent: "center",
    alignSelf: "center"
  },
  eyeIcon: {
    position: "absolute",
    top: 17,
    right: 15,
    width: 20,
    height: 15
  },
  icon: {
    width: 20
  }
});

/* react-redux store
================================================================ */

const mapStateToProps = state => {
  return {
    auth: state.splashReducer.auth,
    resetStatus: state.ResetPasswordReducer.resetStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    DoResetPassword: (password, token) => {
      DoResetPassword(dispatch, password, token);
    }
  };
};

/* Export
================================================================ */

module.exports = connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
