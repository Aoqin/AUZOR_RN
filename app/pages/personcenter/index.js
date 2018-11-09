
import React,{ PureComponent } from "react";
import { View, Text, ScrollView, RefreshControl, Image, StyleSheet } from "react-native";
import Sugar from "sugar-date";
import { connect } from "react-redux";
import { NavigationActions, StackActions } from "react-navigation";
import StupidTouchableOpacity from "../../components/stupidTouchableOpacity";
import CommonButton from "../../components/commonButton";
import { ToastShort } from "../../components/toast";
import { COLOR } from "../../constants/baseStyleDefinition";
import { width, pixeled } from "../../utils/pixel";

import { DoShowData, exitLogin } from "./action";

class PersonCenterPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userReception: props.userReception,
      onRefrsh: false
    };
  }

  componentDidMount() {
    let currentDay = Sugar.Date.format(new Date(), "%Y-%m-%d");
    this.props.DoShowData(currentDay, currentDay, this.props.auth.token);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userReportStatus !== this.props.userReportStatus) {
      this.setState({ onRefrsh: false });
      if (nextProps.userReportStatus === "success") {
        this.setState({
          userReception: nextProps.userReception
        });
      } else if (nextProps.userReportStatus === "failed") {
        ToastShort("今日工作数据获取失败！");
      }
    }

    if (nextProps.exitStatus !== this.props.exitStatus) {
      ToastShort("退出成功!");
      global.loginStatus = "init";
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "Login",
              params: {}
            })
          ]
        })
      );
    }
  }

  _onRefresh() {
    this.setState({ onRefrsh: true });
    let currentDay = Sugar.Date.format(new Date(), "%Y-%m-%d");
    this.props.DoShowData(currentDay, currentDay, this.props.auth.token);
  }

  toFeedBack() {
    this.props.navigation.navigate("FeedBack");
  }

  goToVersion() {
    this.props.navigation.navigate("AboutVersion");
  }

  resetPassword() {
    this.props.navigation.navigate("ResetPassword");
  }

  exitLoginBtn() {
    this.props.exitLogin(this.props.auth.token);
  }

  checkHistoryData() {
    this.props.navigation.navigate("UserWorkStat");
  }

  render() {
    let userInfoName =
      this.props.auth.name &&
      this.props.auth.name.slice(
        this.props.auth.name.length - 2,
        this.props.auth.name.length
      );
    return (
      <View style={{ flex: 1, backgroundColor: COLOR.greyBgColor }}>
        <View
          style={[
            styles.userInfo,
            {
              backgroundColor: "#3478f6",
              shadowColor: "rgba(230, 230, 230, 0.51)",
              shadowRadius: 22,
              shadowOpacity: 1
            }
          ]}
        >
          <View style={[styles.userInfoImg, { backgroundColor: COLOR.white }]}>
            <Text style={[styles.userInfoImgFont, { color: COLOR.default }]}>
              {userInfoName}
            </Text>
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: COLOR.white }}>{this.props.auth.name}</Text>
            <Text style={[styles.userInfoAddress, { color: COLOR.blackRank0 }]}>
              {this.props.auth.storeName}
            </Text>
          </View>
        </View>

        <ScrollView
          style={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.onRefrsh}
              onRefresh={this._onRefresh.bind(this)}
              tintColor="#ff0000"
              androidsize={20}
              colors={["#333"]}
              progressBackgroundColor="#ffffff"
            />
          }
        >
          <View style={{ flex: 1, width: width * 0.92, marginLeft: "4%" }}>
            <StupidTouchableOpacity
              style={styles.todayData}
              key="today"
              accessibilityLabel="btn-checkHistory_total"
              onPress={this.checkHistoryData.bind(this)}
            >
              <Text
                style={{
                  flex: 1,
                  color: COLOR.blackRank1,
                  fontSize: 16,
                  paddingLeft: 10
                }}
              >
                今日工作
              </Text>
              <Text
                style={[
                  {
                    marginRight: 0,
                    color: COLOR.default,
                    fontSize: 12,
                    fontWeight: "normal"
                  }
                ]}
              >
                查看更多
              </Text>
              <Image
                style={styles.icon}
                source={require("../../assets/images/taskFlowDetail/task_list_click_icon.png")}
              />
            </StupidTouchableOpacity>
            <View style={{ marginBottom: 10 }}>
              <View
                accessibilityLabel="today_day"
                style={{
                  flexDirection: "row",
                  height: 60,
                  backgroundColor: COLOR.white
                }}
              >
                <View style={styles.dataItemStyle}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.numStyle}>
                      {this.state.userReception.receptionCount}
                    </Text>
                  </View>
                  <Text style={styles.desStyle}>接车</Text>
                </View>
                <View style={styles.dataItemStyle}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.numStyle}>
                      {this.state.userReception.checkCount}
                    </Text>
                  </View>
                  <Text style={styles.desStyle}>录入报告</Text>
                </View>
                <View style={styles.dataItemStyle}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.numStyle}>
                      {this.state.userReception.pushCount}
                    </Text>
                  </View>
                  <Text style={styles.desStyle}>推送报告</Text>
                </View>
                <View style={styles.dataItemStyle}>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.numStyle}>
                      {this.state.userReception.workCount}
                    </Text>
                  </View>
                  <Text style={styles.desStyle}>确认施工</Text>
                </View>
              </View>
            </View>

            <StupidTouchableOpacity
              style={[styles.operate, { marginTop: 10 }]}
              accessibilityLabel="btn-resetPassModify"
              onPress={this.resetPassword.bind(this, "ResetPassword")}
              key="resetPassword"
            >
              <Image
                style={styles.icon}
                source={require("../../assets/images/mine_Password_icon.png")}
              />
              <Text
                style={[
                  styles.operateLeft,
                  styles.operateLeftFont,
                  { color: COLOR.blackRank2 }
                ]}
              >
                密码修改
              </Text>
              <Image
                style={styles.icon}
                source={require("../../assets/images/receivecar/further.png")}
              />
            </StupidTouchableOpacity>

            <StupidTouchableOpacity
              style={[styles.operate, { marginVertical: 5 }]}
              accessibilityLabel="link-feedBack"
              onPress={this.toFeedBack.bind(this, "feedBack")}
              key="feedBack"
            >
              <Image
                style={styles.icon}
                source={require("../../assets/images/mine_help_icon.png")}
              />
              <Text
                style={[
                  styles.operateLeft,
                  styles.operateLeftFont,
                  { color: COLOR.blackRank2 }
                ]}
              >
                反馈
              </Text>
              <Image
                style={styles.icon}
                source={require("../../assets/images/receivecar/further.png")}
              />
            </StupidTouchableOpacity>

            <StupidTouchableOpacity
              style={[
                styles.operate,
                {
                  borderWidth: 0,
                  marginBottom: 30
                }
              ]}
              accessibilityLabel="link-aboutVersion"
              onPress={this.goToVersion.bind(this, "AboutVersion")}
              key="Version"
            >
              <Image
                style={styles.icon}
                source={require("../../assets/images/mine_about_icon.png")}
              />
              <Text
                style={[
                  styles.operateLeft,
                  styles.operateLeftFont,
                  { color: COLOR.blackRank2 }
                ]}
              >
                关于车况大师
              </Text>
              <Image
                style={styles.icon}
                source={require("../../assets/images/receivecar/further.png")}
              />
            </StupidTouchableOpacity>

            <CommonButton
              buttonSize="medium"
              type="radius"
              caption="退出登录"
              fontSize={16}
              opacity={0.8}
              accessibilityLabel="btn-exitLogin"
              pressClick={this.exitLoginBtn.bind(this)}
              theme="white_border"
              style={{ borderWidth: 0 }}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

/* StyleSheet
================================================================ */

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  userInfoImg: {
    width: 60,
    height: 60,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: "4%",
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center"
  },
  userInfoImgFont: {
    alignSelf: "center"
  },
  userInfoName: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 5
  },
  userInfoAddress: {
    fontSize: 12,
    marginTop: 5,
    alignSelf: "center"
  },
  todayData: {
    borderColor: "#F5F5F5",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLOR.white,
    marginBottom: pixeled(2)
  },
  dataItemStyle: {
    flexDirection: "column",
    width: (width * 0.92 - 10) / 4,
    justifyContent: "center",
    alignItems: "center"
  },
  operate: {
    height: 50,
    backgroundColor: COLOR.white,
    flexDirection: "row",
    borderBottomWidth: pixeled(1),
    borderBottomColor: COLOR.underlineColor,
    alignItems: "center"
  },
  operateLeft: {
    flex: 8,
    paddingLeft: 10,
    alignSelf: "center"
  },
  operateLeftFont: {
    justifyContent: "center",
    fontSize: 14
  },
  operateRight: {
    alignSelf: "center",
    marginRight: 20,
    alignItems: "center"
  },
  desStyle: {
    color: COLOR.blackRank1,
    fontSize: 14
  },
  numStyle: {
    color: COLOR.default,
    fontSize: 20,
    fontWeight: "bold"
  },
  icon: {
    marginLeft: 10,
    marginRight: 10
  }
});

/* react-redux store
================================================================ */

const mapStateToProps = state => {
  return {
    auth: state.loginPageReducer.auth,
    userReception: state.PersonCenterReducer.userReception,
    userReportStatus: state.PersonCenterReducer.userReportStatus,
    exitStatus: state.PersonCenterReducer.exitStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    DoShowData: (startTime, endTime, token) => {
      DoShowData(dispatch, startTime, endTime, token);
    },
    exitLogin: token => {
      exitLogin(dispatch, token);
    }
  };
};

/* Export
================================================================ */

export default connect(mapStateToProps, mapDispatchToProps)(PersonCenterPage);
