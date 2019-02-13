/**
 * 登陆页面
 */
import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
// import { StackActions, NavigationActions } from 'react-navigation'

import { ToastShort } from "../../components/toast"
import { COLOR } from "../../constants/baseStyleDefinition"
import { doLogin } from './action'
import { checkLocalUser } from '../auth/action'

// import PropTypes from 'prop-types';
type State = {
  telNumber: string,
  password: string,
  showPassWd: boolean
};

export class SignIn extends Component<void> {
  // static propTypes = {
  //   prop: PropTypes
  // }

  state: State = {
    telNumber: "",
    password: "",
    showPassWd: false,
    loginStatus: "init"
  };

  static navigationOptions = {
    header: null
    // title:'登陆页面'
  }

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
      if (Platform.OS === "android") {
        NativeModules.MyMtaModule.MtaEvent("login_submit", "");
      }
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
        // global.loginStatus = "success";
        // this.props.checkLocalUser();
        // const resetAction = StackActions.reset({
        //   index: 0,
        //   actions: [NavigationActions.navigate({
        //     routeName: 'App',
        //   })]
        // });
        // this.props.navigation.dispatch(resetAction);
        this.props.navigation.navigate('App');
        ToastShort("登录成功");
      } else {
        if (nextProps.loginStatus === "failed") {
          this.setState({ loginStatus: "init" });
          global.loginStatus = "failed";
        }
      }
    }
  }

  signIn() {
    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Svg width={186} height={82} preserveAspectRatio="none">
            <Path
              fillRule="evenodd"
              d="M172.258 136L72.348 34.43H0V0h89.574l98.187 101.57h44.787V82.633H267V136h-94.742zM233 34h-45.55L165 58l-26-24 33.339-34H267v53h-34V34zM97.096 77L122 101.904 88.904 136H0v-33.953l72.795-.746L97.096 77z"
            />
          </Svg>
        </View>
        <View style={styles.form}>
          <View style={styles.TextFuild}>
            <View style={styles.prent}>
              <Icon style={styles.icon} name="smartphone" size={20} color="#900" />
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor={COLOR.blackRank2}
              maxLength={11}
              placeholder="请输入手机号"
              value={this.state.telNumber}
              onChangeText={text => {
                this.setState({ telNumber: text });
              }}
            />
          </View>
          <View style={styles.TextFuild}>
            <View style={styles.prent}>
              <Icon style={styles.icon} name="lock" size={20} color="#900" />
            </View>
            <TextInput
              underlineColorAndroid="transparent"
              style={styles.input}
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
          </View>
          <View style={styles.FlatButton}>
            <TouchableOpacity onPress={this.doLoginBind}>
              {/* <View><Icon size={20} name="loading" /></View> */}
              <Text>登 陆</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  form: {
    marginHorizontal: 15
  },
  logo: {
    marginBottom: 25
  },
  TextFuild: {
    display: 'flex',
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    flexDirection: 'row',
    borderColor: '#e4e4e4',
    borderWidth: 1,
    alignItems: 'center'
    // justifyContent: 'center',
  },
  prent: {

  },
  input: {
    flex: 1,
    marginVertical: 6,
    paddingVertical: 10
    // paddingHorizontal: 10
  },
  FlatButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ccc'
  }
});

const mapStateToProps = state => {
  return {
    status: state.SignInPageReducer.status,
    isSuccess: state.SignInPageReducer.isSuccess,
    auth: state.SignInPageReducer.auth,
    signInFont: state.SignInPageReducer.signInFont,
    signInStatus: state.SignInPageReducer.signInStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkLocalUser: () => {
      checkLocalUser(dispatch);
    },
    doLogin: (telNumber, password) => {
      doLogin(dispatch, telNumber, password);
    },
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
