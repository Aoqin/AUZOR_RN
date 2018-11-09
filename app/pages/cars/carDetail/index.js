/**
 *接车列表详情页
 * @params guixiang.yi
 * @params
 *
 */
import React, { PureComponent } from "react";
import { Image, Linking, ScrollView, Text, View, Platform , StyleSheet} from "react-native";
import { connect } from "react-redux";
import { COLOR } from "../../../constants/baseStyleDefinition";
import Header from "../../../components/header";
import Loading from "../../../components/loading";
import StupidTouchableOpacity from "../../../components/stupidTouchableOpacity";
import * as NavAction from "../../../store/commonStore/nav/action";
import { width, pixeled } from "../../../utils/pixel";

import { remaProblemsData, getCarDetailData, getDetailCheckId } from "./action";

const isandroid = Platform.OS === "android" ? true : false;
class CarDetailPage extends PureComponent {
  constructor(props) {
    super(props);
    this.goToConstruction = this.goToConstruction.bind(this);
    this.constructionData = {};
    this.state = {
      carDetalData: {}
    };
  }
  componentDidMount() {
    this.props.getCarDetail(
      this.props.navigation.state.params.receptionId,
      this.props.auth.token
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.detailStatus !== this.props.detailStatus) {
      if (nextProps.detailStatus === "success") {
        this.setState({
          carDetalData: nextProps.carDetalData,
          isNoDataTip: nextProps.isNoDataTip
        });
        this.props.getDetailCheckId(
          this.props.navigation.state.params.receptionId,
          this.props.auth.token
        );
        this.props.remaProblemsFun(
          this.props.navigation.state.params.receptionId,
          this.props.auth.token
        );
      } else {
        this.setState({
          isNoDataTip: nextProps.isNoDataTip
        });
      }
    } else if (nextProps.remainsStatus !== this.props.remainsStatus) {
      if (nextProps.remainsStatus === "success") {
        this.setState({
          remainsData: nextProps.remainsData
        });
      }
    } else if (nextProps.detailCheckStatus !== this.props.detailCheckStatus) {
      if (nextProps.detailCheckStatus === "success") {
        this.setState({
          checkId: nextProps.DetailCheckId
        });
      }
    }
  }
  openTel(telNumber) {
    let url = "tel:" + telNumber;
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          // console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  /*返回上级*/
  goBack() {
    if (
      this.props.navState &&
      this.props.navState.routes[this.props.navState.index - 1].routeName ===
        "Main"
    ) {
      this.toMain();
    } else {
      this.props.navigation.goBack();
    }
  }
  /*进入维保记录*/
  goToDetail(car) {
    this.props.navigation.navigate("Opportunity", {
      carId: car.id,
      license: this.props.navigation.state.params.license
    });
  }
  /*检测记录*/
  goToCarDetection(car) {
    this.props.navigation.navigate("CarDetection", {
      carId: car.id,
      license: this.props.navigation.state.params.license,
      receptionId: this.props.navigation.state.params.receptionId
    });
  }
  /*进入遗留问题详情页*/
  onGoOpportunityCheckDetail(id) {
    // console.info("进入遗留问题");
    // InteractionManager.runAfterInteractions(() => {
    //   this.props.navigation.navigate("OpportunityCheckDetail", {
    //     id: id
    //   });
    // });
  }
  renderRemain(remainsData) {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.remainList}
      >
        {remainsData.map((item, index) => {
          return (
            <StupidTouchableOpacity
              accessibilityLabel="link-opportunityDetail"
              onPress={this.onGoOpportunityCheckDetail.bind(this, item.id)}
              key={"remainWrap" + index}
              activeOpacity={0.8}
            >
              <View style={styles.remainListIner} key={"confirm" + index}>
                <View style={styles.remainTitleWrap}>
                  <Text style={styles.remainTitle}>{item.partName}</Text>
                </View>
                {item.resultStatus === "3" ? (
                  <View style={styles.urgentItem}>
                    <Image
                      style={styles.urgentItemIcon}
                      source={require("../../../assets/images/car/construction_danger.png")}
                    />
                    <Text style={styles.urgentText}>急需处理</Text>
                  </View>
                ) : (
                  <View style={styles.urgentItem}>
                    <Image
                      style={styles.urgentItemIcon}
                      source={require("../../../assets/images/car/construction_warning.png")}
                    />
                    <Text style={styles.attentionText}>密切关注</Text>
                  </View>
                )}
                {/**
                <Image
                  style={styles.operateRight}
                  source={require("../../../assets/images/icon-next.png")}
                />
                **/}
              </View>
            </StupidTouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  /*点去确认去施工页面 */
  goToConstruction(carInfo) {
    NavAction.subscriptionPageResult(
      this.props.dispatch,
      "Construction",
      data => {
        if (data.refreshType === true) {
          this.props.getCarDetail(
            this.props.navigation.state.params.receptionId,
            this.props.auth.token
          );
        }
      }
    );
    this.props.navigation.navigate("Construction", {
      receptionId: this.props.navigation.state.params.receptionId,
      checkId: this.state.checkId,
      license: this.props.navigation.state.params.license,
      token: this.props.auth.token
    });
  }

  render() {
    const { carDetalData, remainsData, isNoDataTip } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: COLOR.blackRank5 }}>
        <Header
          style={{ backgroundColor: COLOR.whiteBgColor }}
          title={this.props.navigation.state.params.license + "车辆信息"}
          leftArea={
            <StupidTouchableOpacity
              accessibilityLabel="btn-carDetailReturn"
              onPress={this.goBack.bind(this)}
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
        {carDetalData ? (
          <View style={styles.detailDescWrap}>
            <View style={styles.detailBaseInfo}>
              <View style={styles.detailDescInner}>
                <View style={styles.detailCarLogCont}>
                  {carDetalData.brandIcon ? (
                    <Image
                      style={styles.detailCarLog}
                      source={{ uri: carDetalData.brandIcon }}
                    />
                  ) : (
                    <Image
                      style={styles.carLogDefalutPic}
                      source={require("../../../assets/images/receivecar/default-icon.png")}
                    />
                  )}
                </View>

                <View style={styles.detailDescTextWrap}>
                  <View style={styles.detailDescTextCont}>
                    <Text style={styles.detailLicense} numberOfLines={1}>
                      {carDetalData.license}
                    </Text>
                    <Text style={styles.detailCarInfo} numberOfLines={1}>
                      {carDetalData.brandName
                        ? carDetalData.brandName
                        : carDetalData.specName}
                    </Text>
                  </View>

                  <Text style={styles.detailMileage}>
                    当前里程：
                    {carDetalData.mileage
                      ? carDetalData.mileage + "KM"
                      : "未录入里程数"}
                  </Text>
                  <View style={styles.detailVinWrap}>
                    <Text style={styles.detailVinText}>
                      VIN码:{" "}
                      {carDetalData.vin ? carDetalData.vin : "未录入VIN码"}
                    </Text>
                  </View>
                </View>
              </View>

              {carDetalData.name !== "" || carDetalData.mobile !== "" ? (
                <StupidTouchableOpacity activeOpacity={1}>
                  <View
                    style={styles.carUserName}
                    accessibilityLabel="customerTel"
                  >
                    <View style={styles.carUserNameWrap}>
                      <Text style={styles.userNameText}>
                        {carDetalData.name ? carDetalData.name : "未录入车主名"}
                      </Text>
                    </View>
                    {carDetalData.mobile ? (
                      <StupidTouchableOpacity
                        key="userTel"
                        accessibilityLabel="btn-carCarTel"
                        activeOpacity={1}
                        style={styles.userMobileWrap}
                        onPress={this.openTel.bind(this, carDetalData.mobile)}
                      >
                        <Text style={styles.userMobileText}>
                          {carDetalData.mobile}
                        </Text>
                        <Image
                          style={styles.userTelepPic}
                          source={require("../../../assets/images/taskIcon/car_customer_phone.png")}
                        />
                      </StupidTouchableOpacity>
                    ) : null}
                  </View>
                </StupidTouchableOpacity>
              ) : null}
            </View>

            {remainsData && remainsData.length > 0 ? (
              <View style={styles.remainBugWrap}>
                <View style={styles.remainWrap} key="operation">
                  <Image
                    style={styles.remainPic}
                    source={require("../../../assets/images/car/carinfo_question_icon.png")}
                  />
                  <Text style={styles.operateLeftFont}>
                    遗留问题 ({remainsData ? remainsData.length : null})
                  </Text>
                  <StupidTouchableOpacity
                    style={styles.remainsBtnWrap}
                    accessibilityLabel="link-carConstruction"
                    onPress={this.goToConstruction.bind(this, carDetalData)}
                    key="confirm"
                    activeOpacity={0.8}
                  >
                    <View
                      accessibilityLabel="goConfirmBtn"
                      style={styles.remainBtnSure}
                    >
                      <Text style={styles.remainBtnText}>去确认</Text>
                    </View>
                  </StupidTouchableOpacity>
                </View>
                {this.renderRemain(remainsData)}
              </View>
            ) : null}

            <View style={styles.linkJumpWrap}>
              <StupidTouchableOpacity
                onPress={this.goToDetail.bind(this, carDetalData)}
                accessibilityLabel="link-carOpportunity"
                key="oppo"
                activeOpacity={0.8}
              >
                <View
                  style={[styles.operate]}
                  accessibilityLabel="carCheckDetail"
                >
                  <Image
                    style={styles.remainRepairPic}
                    source={require("../../../assets/images/car/carinfo_repair_icon.png")}
                  />
                  <Text style={styles.operateLeftFont}>维保记录</Text>
                  <Image
                    style={styles.operateRight}
                    source={require("../../../assets/images/icon-next.png")}
                  />
                </View>
              </StupidTouchableOpacity>

              <StupidTouchableOpacity
                onPress={this.goToCarDetection.bind(this, carDetalData)}
                accessibilityLabel="link-carDetection"
                key="checkDetail"
                activeOpacity={0.8}
              >
                <View
                  accessibilityLabel="carDetection"
                  style={[styles.operate, styles.operateBorder]}
                >
                  <Image
                    style={styles.remainTestPic}
                    source={require("../../../assets/images/car/carinfo_testing_icon.png")}
                  />
                  <Text style={styles.operateLeftFont}>检测记录</Text>
                  <Image
                    style={styles.operateRight}
                    source={require("../../../assets/images/icon-next.png")}
                  />
                </View>
              </StupidTouchableOpacity>
            </View>
            <Loading isVisible={this.props.pageLoading} text="加载中..." />
          </View>
        ) : isNoDataTip ? (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 50
            }}
          >
            <View
              style={{
                width: 200,
                height: 100,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text style={{ fontSize: 18, lineHeight: 30 }}>
                您还没有添加车辆信息哦，请您添加车辆信息！
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  operate: {
    height: 45,
    flexDirection: "row"
  },
  operateBorder: {
    borderTopWidth: pixeled(1),
    borderColor: COLOR.defaultBorderColor
  },
  operateLeftFont: {
    flex: 1,
    paddingLeft: 10,
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 14,
    color: COLOR.threeFontColor,
    fontWeight: "bold"
  },
  operateRight: {
    alignSelf: "center",
    marginRight: 10,
    alignItems: "center"
  },
  detailDescWrap: {
    flex: 1,
    marginHorizontal: 10
  },
  detailBaseInfo: {
    flexDirection: "column",
    borderRadius: COLOR.moduleBoderRadius,
    marginTop: 5,
    backgroundColor: COLOR.whiteBgColor
  },
  detailDescInner: {
    flexDirection: "row",
    borderBottomColor: COLOR.defaultBorderColor,
    borderBottomWidth: pixeled(1)
  },
  detailCarLogCont: {
    width: 60,
    height: 60,
    margin: 15,
    borderRadius: COLOR.logBorderRadius,
    alignSelf: "center",
    overflow: "hidden",
    backgroundColor: COLOR.greyBgColor,
    justifyContent: "center"
  },
  detailCarLog: {
    width: 46,
    height: 46,
    alignSelf: "center",
    justifyContent: "center"
  },
  carLogDefalutPic: {
    width: 46,
    height: 46,
    alignSelf: "center"
  },
  detailDescTextWrap: {
    flexDirection: "column",
    flex: 1,
    marginRight: 10,
    backgroundColor: COLOR.whiteBgColor
  },
  detailDescTextCont: {
    flexDirection: "row",
    width: width - 60 - 15 * 2 - 10 * 2,
    marginTop: 10,
    height: 24,
    overflow: "hidden"
  },
  detailLicense: {
    color: COLOR.blackRank0,
    fontSize: 15,
    marginRight: 10
  },
  detailCarInfo: {
    color: COLOR.grayFontColor,
    backgroundColor: COLOR.greyBgColor,
    fontSize: 13,
    textAlign: "center",
    paddingLeft: 5,
    paddingRight: 5
  },
  detailMileage: {
    color: COLOR.grayFontColor,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5
  },
  detailVinWrap: {
    flexDirection: "row"
  },
  detailVinText: {
    color: COLOR.grayFontColor,
    fontSize: 12
  },
  carUserName: {
    flexDirection: "row",
    height: 40,
    paddingLeft: 15
  },
  carUserNameWrap: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-start"
  },
  userMobileWrap: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginRight: 15
  },
  userNameText: {
    alignSelf: "center",
    alignItems: "center"
  },
  userMobileText: {
    alignSelf: "center",
    marginRight: 5
  },
  userTelepPic: {
    width: 27,
    height: 27,
    alignSelf: "center"
  },
  remainBugWrap: {
    marginTop: 8,
    borderRadius: COLOR.moduleBoderRadius,
    backgroundColor: COLOR.whiteBgColor
  },
  remainWrap: {
    height: 45,
    flexDirection: "row",
    borderBottomWidth: pixeled(1),
    borderBottomColor: COLOR.defaultBorderColor
  },
  remainList: {
    maxHeight: 160,
    paddingLeft: 50
  },
  remainListIner: {
    flexDirection: "row",
    borderBottomWidth: pixeled(1),
    borderBottomColor: COLOR.defaultBorderColor,
    height: 40
  },
  remainTitleWrap: {
    flex: 1,
    alignSelf: "center"
  },
  remainTitle: {},
  linkJumpWrap: {
    marginTop: 8,
    borderRadius: COLOR.moduleBoderRadius,
    backgroundColor: COLOR.whiteBgColor
  },
  urgentItem: {
    marginRight: 10,
    flexDirection: "row",
    alignSelf: "center"
  },
  urgentItemIcon: {
    height: 15,
    width: 15,
    marginTop: 1
  },
  urgentText: {
    fontSize: 12,
    marginLeft: 4,
    color: COLOR.dangerColor
  },
  attentionText: {
    color: COLOR.tipsColor,
    fontSize: 12,
    marginLeft: 4
  },

  remainPic: {
    width: 29,
    height: 29,
    alignSelf: "center",
    marginLeft: 15
  },
  remainsBtnWrap: {
    alignSelf: "center",
    marginRight: 10,
    alignItems: "center"
  },
  remainBtnSure: {
    width: 56,
    height: 28,
    backgroundColor: COLOR.primaryColor,
    borderRadius: COLOR.tagBorderRadius4,
    justifyContent: "center"
  },
  remainBtnText: {
    color: COLOR.primaryFontColor,
    alignSelf: "center"
  },
  remainRepairPic: {
    width: 29,
    height: 29,
    alignSelf: "center",
    marginLeft: 15
  },
  remainTestPic: {
    width: 29,
    height: 29,
    alignSelf: "center",
    marginLeft: 15
  }
});

/* react-redux store

================================================================ */

const mapStateToProps = state => {
  return {
    detailStatus: state.CarDetailReducer.detailStatus,
    carDetalData: state.CarDetailReducer.carDetalData,
    isNoDataTip: state.CarDetailReducer.isNoDataTip,
    auth: state.splashReducer.auth,
    remainsData: state.CarDetailReducer.remainsData,
    remainsStatus: state.CarDetailReducer.remainsStatus,
    pageLoading: state.CarDetailReducer.pageLoading,
    detailCheckStatus: state.CarDetailReducer.detailCheckStatus,
    DetailCheckId: state.CarDetailReducer.DetailCheckId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCarDetail: (receptionId, token) => {
      getCarDetailData(dispatch, receptionId, token);
    },
    remaProblemsFun: (cardId, token) => {
      remaProblemsData(dispatch, cardId, token);
    },
    getDetailCheckId: (pickId, token) => {
      getDetailCheckId(dispatch, pickId, token);
    },
    dispatch: dispatch
  };
};

/* Export
================================================================ */

export default connect(mapStateToProps, mapDispatchToProps)(CarDetailPage);
