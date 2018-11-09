/**
 * 检测详情页
 * @params  guixiang.yi
 * @params
 */


// Depdencies
import React, { PureComponent } from "react";
import { View, Text, Image, ScrollView, Platform } from "react-native";
import { connect } from "react-redux";
import * as wechat from "react-native-wechat";
import StyleSheet from "../../../utils/styleSheet";
import { COLOR } from "../../../constants/baseStyleDefinition";
import Loading from "../../../components/loading";
import LoadingExpand from "../../../components/loadingExpand";
import ImageViewer from "../../../components/imageViewer";
import Header from "../../../components/header";
import { width, height, pixeled } from "../../../utils/pixel";
import StupidTouchableOpacity from "../../../components/stupidTouchableOpacity";
import { ToastShort } from "../../../components/toast";
import {
  getCarDetailData,
  getDetectionDetailData,
  getExpandData,
  getDeteCheckId,
  getDetectionManual,
  getClickStatist
} from "./action";
const isandroid = Platform.OS === "android" ? true : false;
class DetectionDetailPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      carDetalData: {},
      detectionData: {},
      showAppoint: false,
      isGoodListShow: false
    };
    this.moreData = [];
    this.showArray = [];
    this.showBaseInfoMore = this.showBaseInfoMore.bind(this);
    this.showGoodList = this.showGoodList.bind(this);
  }
  componentDidMount() {
    wechat.registerApp("wx77f96c41c5d7e0e2");
    this.props.getCarDetail(
      this.props.navigation.state.params.receptionId,
      this.props.auth.token
    );
    this.props.getDetectionListData(
      this.props.navigation.state.params.receptionId,
      this.props.auth.token
    );
    this.props.getDeteCheckId(
      this.props.navigation.state.params.receptionId,
      this.props.auth.token
    );
  }
  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    let MoreconstructData = {};
    if (nextProps.detailStatus !== this.props.detailStatus) {
      if (nextProps.detailStatus === "success") {
        this.setState({
          carDetalData: nextProps.carDetalData,
          specName: nextProps.carDetalData.specName,
          mileage: nextProps.carDetalData.mileage
            ? nextProps.carDetalData.mileage
            : "",
          typeCode: nextProps.carDetalData.modelId
        });

        this.props.getDetectionManual(
          nextProps.carDetalData.modelId,
          this.props.auth.token
        );
      }
    } else if (nextProps.detectionStatus !== this.props.detectionStatus) {
      if (nextProps.detectionStatus === "success") {
        this.setState({
          detectionData: nextProps.detectionData,
          urgentList: nextProps.detectionData.urgentList,
          attentionList: nextProps.detectionData.attentionList,
          normalList: nextProps.detectionData.normalList
        });
      }
    } else if (nextProps.deteCheckStatus !== this.props.deteCheckStatus) {
      if (nextProps.deteCheckStatus === "success") {
        this.setState({
          checkId: nextProps.detecheckId
        });
      }
    } else if (nextProps.expandStatus !== this.props.expandStatus) {
      if (nextProps.expandStatus === "success") {
        if (nextProps.getPartId) {
          let expandData = Object.assign({}, nextProps.expandData);
          MoreconstructData = {
            expandData: expandData,
            getPartId: nextProps.getPartId,
            expandLoading: nextProps.expandLoading
          };
          this.moreData.push(MoreconstructData);
        }
      }
    } else if (nextProps.detectManualStatus !== this.props.detectManualStatus) {
      if (nextProps.detectManualStatus === "success") {
        this.setState({
          detectManualData: nextProps.detectManualData
        });
      }
    }
  }

  goBack() {
    this.props.navigation.goBack();
  }
  goBooklet() {
    this.props.navigation.navigate("Booklet", {
      typeCode: this.state.typeCode,
      specName: this.state.specName,
      mileage: this.state.mileage
    });
  }
  goNotBooklet() {
    ToastShort("该车没有保养手册");
  }
  showGoodList() {
    this.setState({
      isGoodListShow: !this.state.isGoodListShow
    });
  }
  //渲染标题数据
  renderTitle(moduleData, type) {
    let isDanger = type === "danger" ? true : false;
    let isWarning = type === "warning" ? true : false;
    let isGood = type === "good" ? true : false;
    return (
      <View style={styles.moduleWrap}>
        {isDanger ? (
          <View style={styles.moduleTitleWrap}>
            <View style={styles.moduleTitleText}>
              <Image
                style={styles.dangerIcon}
                source={require("../../../assets/images/urgent-icon.png")}
              />
              <Text style={[styles.titleText, styles.titleDangerText]}>
                急需处理
              </Text>
              <Text style={[styles.titleText, styles.titleDangerText]}>
                ({moduleData.length})
              </Text>
            </View>
          </View>
        ) : isWarning ? (
          <View style={styles.moduleTitleWrap}>
            <View style={styles.moduleTitleText}>
              <Image
                style={styles.attionIcon}
                source={require("../../../assets/images/close-icon.png")}
              />
              <Text style={[styles.titleText, styles.titleWarningText]}>
                密切关注
              </Text>
              <Text style={[styles.titleText, styles.titleWarningText]}>
                ({moduleData.length})
              </Text>
            </View>
          </View>
        ) : isGood ? (
          <StupidTouchableOpacity
            style={styles.moduleTitleWrap}
            accessibilityLabel="expand-goodChildren"
            onPress={this.showGoodList.bind(this)}
          >
            <View style={styles.moduleTitleText}>
              <Image
                style={styles.attionIcon}
                source={require("../../../assets/images/condition-icon.png")}
              />
              <Text style={[styles.titleText, styles.titleGoodText]}>
                状况良好
              </Text>
              <Text style={[styles.titleText, styles.titleGoodText]}>
                ({moduleData.length})
              </Text>
            </View>
            <View style={styles.upDownWrap}>
              {moduleData.showChild ? (
                <Image
                  style={styles.upArrow}
                  source={require("../../../assets/images/up-icon.png")}
                />
              ) : (
                <Image
                  style={styles.upArrow}
                  source={require("../../../assets/images/down-icon.png")}
                />
              )}
            </View>
          </StupidTouchableOpacity>
        ) : null}
        {isDanger || isWarning
          ? moduleData.map((item, index) => {
              const isLastDate = index + 1 === moduleData.length ? true : false;
              const isMileage =
                typeof item.adviceMil !== "undefined" && item.adviceMil
                  ? true
                  : false;
              return (
                <View
                  style={styles.moduleItemContair}
                  key={index + item.partId}
                >
                  <StupidTouchableOpacity
                    style={[
                      styles.moduleItemWrap,
                      isLastDate && !item.showChild && styles.moduleBotRadius,
                      isMileage && styles.mileageModuleH
                    ]}
                    accessibilityLabel={`expand-detectionTitle${index}${type}`}
                    onPress={this.showBaseInfoMore.bind(
                      this,
                      item,
                      index,
                      moduleData,
                      type
                    )}
                  >
                    <View style={styles.moduleItem}>
                      <Text style={styles.modulePartName}>{item.partName}</Text>
                      <View style={styles.monthWrap}>
                        {isMileage ? (
                          <Text style={styles.moduleAdviceMil}>
                            {item.adviceMil}公里
                          </Text>
                        ) : null}
                        {isMileage &&
                        typeof item.month !== "undefined" &&
                        item.month !== "0" &&
                        item.month !== null ? (
                          <Text style={styles.moduleAdviceMil}>
                            或{item.month}月/次
                          </Text>
                        ) : null}
                      </View>
                    </View>
                    <View style={styles.upDownWrap}>
                      {item.showChild ? (
                        <Image
                          style={styles.upArrow}
                          source={require("../../../assets/images/up-icon.png")}
                        />
                      ) : (
                        <Image
                          style={styles.upArrow}
                          source={require("../../../assets/images/down-icon.png")}
                        />
                      )}
                    </View>
                  </StupidTouchableOpacity>
                  {item.showChild ? this.renderChild(item, isLastDate) : null}
                </View>
              );
            })
          : isGood && this.state.isGoodListShow
            ? moduleData.map((item, index) => {
                const isLastDate =
                  index + 1 === moduleData.length ? true : false;
                const isMileage =
                  typeof item.adviceMil !== "undefined" && item.adviceMil
                    ? true
                    : false;
                return (
                  <View
                    style={styles.moduleItemContair}
                    key={index + item.partId}
                  >
                    <StupidTouchableOpacity
                      style={[
                        styles.moduleItemWrap,
                        isLastDate && styles.moduleBotRadius,
                        isMileage && styles.mileageModuleH
                      ]}
                      accessibilityLabel={`expand-detectionTitle${index}${type}`}
                      onPress={this.showBaseInfoMore.bind(
                        this,
                        item,
                        index,
                        moduleData,
                        type
                      )}
                    >
                      <View style={styles.moduleItem}>
                        <Text style={styles.modulePartName}>
                          {item.partName}
                        </Text>
                        {isMileage ? (
                          <Text style={styles.moduleAdviceMil}>
                            {item.adviceMil}
                          </Text>
                        ) : null}
                      </View>
                      <View style={styles.upDownWrap}>
                        {item.showChild ? (
                          <Image
                            style={styles.upArrow}
                            source={require("../../../assets/images/up-icon.png")}
                          />
                        ) : (
                          <Image
                            style={styles.upArrow}
                            source={require("../../../assets/images/down-icon.png")}
                          />
                        )}
                      </View>
                    </StupidTouchableOpacity>
                    {item.showChild ? this.renderChild(item, isLastDate) : null}
                  </View>
                );
              })
            : null}
      </View>
    );
  }
  //点击展开更多基础信息
  showBaseInfoMore(item, index, moduleData, type) {
    let isIn = false;
    let curModuleData = JSON.parse(JSON.stringify(moduleData));
    let urgentList = JSON.parse(JSON.stringify(this.state.urgentList));
    let attentionList = JSON.parse(JSON.stringify(this.state.attentionList));
    let normalList = JSON.parse(JSON.stringify(this.state.normalList));
    for (let k = 0; k < this.moreData.length; k++) {
      if (this.moreData[k].getPartId === item.partId) {
        isIn = true;
        break;
      }
    }
    if (!isIn) {
      this.props.getExpandInfoFun(
        item.partId,
        this.state.checkId,
        this.props.auth.token
      );
    }
    for (let j = 0; j < curModuleData.length; j++) {
      if (j === index && !curModuleData[j].showChild) {
        curModuleData[j].showChild = true;
      } else {
        curModuleData[j].showChild = false;
      }
    }
    if (type === "danger") {
      for (let k = 0; k < attentionList.length; k++) {
        attentionList[k].showChild = false;
      }
      for (let q = 0; q < normalList.length; q++) {
        normalList[q].showChild = false;
      }
      this.setState({
        urgentList: curModuleData,
        attentionList: attentionList,
        normalList: normalList
      });
    } else if (type === "warning") {
      for (let l = 0; l < urgentList.length; l++) {
        urgentList[l].showChild = false;
      }
      for (let m = 0; m < normalList.length; m++) {
        normalList[m].showChild = false;
      }
      this.setState({
        attentionList: curModuleData,
        urgentList: urgentList,
        normalList: normalList
      });
    } else if (type === "good") {
      for (let j = 0; j < urgentList.length; j++) {
        urgentList[j].showChild = false;
      }
      for (let h = 0; h < attentionList.length; h++) {
        attentionList[h].showChild = false;
      }
      this.setState({
        normalList: curModuleData,
        attentionList: attentionList,
        urgentList: urgentList
      });
    }
  }
  returnParams() {
    this.props.navigation.goBack();
  }
  sendToWxUser() {
    this.props.getClickStatist(
      this.props.navigation.state.params.receptionId,
      this.props.auth.token
    );
    wechat
      .isWXAppInstalled()
      .then(isInstalled => {
        if (isInstalled) {
          //直接查看报告的
          let sendData = {
            type: "news",
            title:
              "您的爱车" +
              this.props.navigation.state.params.license +
              "最新车况报告已送达~",
            thumbImage:
              "http://vcmnew.oss-cn-hangzhou.aliyuncs.com/images/51c2d4c4facd4445beffe4a3d97d02fd.png", //分享时左侧的图片
            description:
              "想要维保不被坑？点击查看报告对车况了如指掌是最关键的哦~",
            webpageUrl:
              "http://site.chekuangdashi.com/wxrecord/index.html?curReceptionId=" +
              this.props.navigation.state.params.receptionId
          };
          // let sendData = {
          //   type: "imageUrl",
          //   title: "您的爱车" + this.state.license + "最新车况报告已送达~",
          //   description:
          //     "想要维保不被坑？点击查看报告对车况了如指掌是最关键的哦~",
          //   imageUrl: this.state.twoCodeImage
          // };
          wechat
            .shareToSession(sendData)
            .then(sendResultData => {})
            .catch(error => {
              ToastShort("发送失败" + error);
              // console.info("发送失败" + error);
            });
        } else {
          ToastShort("没有安装微信软件，请您安装微信之后再试");
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
  renderChild(info, isLastTitle) {
    let expandChildData = {};
    for (let m = 0; m < this.moreData.length; m++) {
      if (info.partId === this.moreData[m].getPartId) {
        expandChildData = this.moreData[m].expandData;
      }
    }
    return (
      <View
        style={[styles.titleExpandWrap, isLastTitle && styles.moduleBotRadius]}
      >
        {expandChildData ? (
          <View style={styles.titleExpandCont}>
            <View style={styles.subListWrap}>
              {expandChildData.subList
                ? expandChildData.subList.map((subItem, subIndex) => {
                    return (
                      <View
                        style={styles.partModuItem}
                        key={"subPart" + subIndex}
                      >
                        <View style={styles.partModuItemTit}>
                          <Text style={styles.partModuItemText}>
                            {subItem.subPartName}
                          </Text>
                        </View>
                        <View style={styles.partInerList}>
                          {subItem.value
                            ? subItem.value.map((valueItem, ValueIndex) => {
                                return (
                                  <View
                                    style={styles.partInerItem}
                                    key={ValueIndex + "valueSublist"}
                                  >
                                    <View
                                      style={[
                                        styles.partInerTitName,
                                        styles.partInerName
                                      ]}
                                    >
                                      <View
                                        style={[
                                          styles.circleRadius,
                                          valueItem.color === "1" &&
                                            styles.goodRadius,
                                          valueItem.color === "2" &&
                                            styles.warningRadius,
                                          valueItem.color === "3" &&
                                            styles.dangerRadius
                                        ]}
                                      />
                                      <Text
                                        style={styles.partInerTit}
                                        numberOfLines={2}
                                      >
                                        {valueItem.title + "："}
                                      </Text>
                                    </View>
                                    <View
                                      style={[
                                        styles.partInerTitName,
                                        styles.partInerCont
                                      ]}
                                    >
                                      <Text
                                        style={[
                                          valueItem.color === "1" &&
                                            styles.partGood,
                                          valueItem.color === "2" &&
                                            styles.partWarning,
                                          valueItem.color === "3" &&
                                            styles.partDanger
                                        ]}
                                        numberOfLines={2}
                                      >
                                        {valueItem.content}
                                      </Text>
                                    </View>
                                  </View>
                                );
                              })
                            : null}
                        </View>
                      </View>
                    );
                  })
                : null}
            </View>
            {expandChildData.partImage ? (
              <View style={styles.partImageWrap}>
                {expandChildData.partImage.map((ImageItem, partIndex) => {
                  return (
                    <View
                      style={styles.ImageItem}
                      key={"ImageItem" + partIndex}
                    >
                      <Image
                        source={{ uri: ImageItem }}
                        style={styles.ImageItemPic}
                      />
                    </View>
                  );
                })}
              </View>
            ) : null}

            {expandChildData.resultDesc ? (
              <View style={styles.partComment}>
                <Text style={styles.partCommentText}>
                  {expandChildData.resultDesc}
                </Text>
              </View>
            ) : null}

            {expandChildData.comment ? (
              <View style={styles.partComment}>
                <Text style={styles.partCommentText}>
                  {expandChildData.comment}
                </Text>
              </View>
            ) : null}
            {expandChildData.partResultImage &&
            expandChildData.partResultImage.length > 0 ? (
              <View style={styles.smallListWrap}>
                {expandChildData.partResultImage.map(
                  (smallItem, smallIndex) => {
                    return (
                      <View
                        style={styles.rowImagesItem}
                        key={"smallPic" + smallIndex}
                      >
                        <ImageViewer
                          style={styles.smallItemPic}
                          source={{ uri: smallItem }}
                          accessibilityLabel={`btn-viewBigPic${smallIndex}`}
                          allowed_edit={false}
                        />
                      </View>
                    );
                  }
                )}
              </View>
            ) : null}
          </View>
        ) : (
          <View style={styles.noExpandTip}>
            <Text style={{ color: COLOR.blackRank1 }}>没有展开的数据</Text>
          </View>
        )}
        {this.props.expandLoading ? (
          <LoadingExpand
            containerStyle={{ backgroundColor: COLOR.bgGrayColor2 }}
            isVisible={this.props.expandLoading}
            text="数据加载中..."
          />
        ) : null}
      </View>
    );
  }
  render() {
    const {
      carDetalData,
      detectionData,
      urgentList,
      attentionList,
      normalList
    } = this.state;
    const isManual = this.state.detectManualData
      ? this.state.detectManualData.upkeep
      : false;
    return (
      <View style={styles.container}>
        <Header
          title={"检测" + this.props.navigation.state.params.license + "状况"}
          leftArea={
            <StupidTouchableOpacity
              accessibilityLabel="btn-detectionDetalReturn"
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
              <View style={styles.detailTitle}>
                <View style={styles.detailDescTextCont}>
                  <Text style={styles.detailLicense}>
                    {carDetalData.license}
                  </Text>
                </View>
                <StupidTouchableOpacity
                  key="shareButton"
                  accessibilityLabel="btn-sendReport"
                  style={styles.shareTitWrap}
                  onPress={this.sendToWxUser.bind(this)}
                >
                  <Image
                    style={{ width: 16, height: 18 }}
                    source={require("../../../assets/images/share_ios_icon.png")}
                  />
                  <Text style={styles.shareTitText}>发送报告</Text>
                </StupidTouchableOpacity>
              </View>
              <Text style={styles.detailCarInfo} numberOfLines={1}>
                {carDetalData.brandName
                  ? carDetalData.brandName + carDetalData.specName
                  : carDetalData.specName}
              </Text>
              <View style={styles.bookletWrap}>
                <Text style={styles.detailMileage}>
                  当前里程：
                  {carDetalData.mileage
                    ? carDetalData.mileage + "KM"
                    : "未录入里程数"}
                </Text>
                <StupidTouchableOpacity
                  style={[
                    styles.bookletBtn,
                    !isManual && styles.disbleBookletBtn
                  ]}
                  accessibilityLabel="link-gobooklet"
                  onPress={
                    isManual
                      ? this.goBooklet.bind(this)
                      : this.goNotBooklet.bind(this)
                  }
                >
                  <Text
                    style={[
                      styles.bookletText,
                      !isManual && styles.disbleBookletText
                    ]}
                  >
                    保养手册
                  </Text>
                </StupidTouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}
        <View style={styles.detectionWrap}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
            removeClippedSubviews={true}
            bounces={false}
            style={styles.constructionScrol}
            ref={c => {
              this.personalViewscroll = c;
            }}
          >
            {detectionData && urgentList && urgentList.length > 0
              ? this.renderTitle(urgentList, "danger")
              : null}

            {detectionData && attentionList && attentionList.length > 0
              ? this.renderTitle(attentionList, "warning")
              : null}

            {detectionData && normalList && normalList.length > 0
              ? this.renderTitle(normalList, "good")
              : null}

            {!this.props.pageLoading && this.props.detectionLoading ? (
              <LoadingExpand
                isVisible={this.props.detectionLoading}
                containerStyle={{ backgroundColor: COLOR.blackRank5 }}
                text="数据加载中..."
              />
            ) : null}
          </ScrollView>
          <View style={styles.constructionFooter}>
            <StupidTouchableOpacity
              accessibilityLabel="btn-detectionDetailReturnSure"
              onPress={this.returnParams.bind(this)}
              key="returnBtn"
              style={styles.sureConstruction}
              activeOpacity={0.8}
            >
              <Text style={{ color: COLOR.primaryFontColor, fontSize: 16 }}>
                返回
              </Text>
            </StupidTouchableOpacity>
          </View>
        </View>

        <Loading isVisible={this.props.pageLoading} text="加载中..." />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLOR.blackRank5
  },
  headerConst: {
    backgroundColor: COLOR.default
  },
  headerTitle: {
    color: COLOR.white
  },
  detailDescInner: {
    flexDirection: "row",
    borderRadius: COLOR.moduleBoderRadius,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: COLOR.whiteBgColor
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
    marginRight: 6
  },
  detailTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  shareTitWrap: {
    flexDirection: "row",
    marginRight: 10,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  shareTitText: {
    fontSize: 14,
    color: COLOR.default,
    marginLeft: 3
  },
  detailDescTextCont: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 3
  },
  detailLicense: {
    color: COLOR.blackRank0,
    fontSize: 16,
    marginRight: 10
  },
  detailCarInfo: {
    color: COLOR.blackRank1,
    fontSize: 14
  },
  detailMileage: {
    color: COLOR.blackRank1,
    fontSize: 12,
    marginTop: 3
  },
  detailVinWrap: {
    flexDirection: "row"
  },
  detailVinText: {
    color: COLOR.grayFontColor,
    fontSize: 12
  },
  bookletWrap: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingRight: 10,
    marginTop: 6
  },
  bookletBtn: {
    paddingHorizontal: 4,
    height: 20,
    marginLeft: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLOR.primaryBgColor,
    paddingBottom: 1,
    borderRadius: COLOR.tagBorderRadius,
    borderWidth: pixeled(1)
  },
  disbleBookletBtn: {
    borderColor: COLOR.borderColor3
  },
  bookletText: {
    color: COLOR.default,
    fontSize: 14
  },
  disbleBookletText: {
    color: COLOR.blackRank2
  },
  detectionWrap: {
    flex: 1,
    marginHorizontal: 10
  },
  moduleWrap: {
    width: width - 10 * 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10
  },
  moduleTitleWrap: {
    width: width - 10 * 2,
    height: 35,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopLeftRadius: COLOR.moduleBoderRadius,
    borderTopRightRadius: COLOR.moduleBoderRadius,
    backgroundColor: COLOR.whiteBgColor
  },
  moduleTitleText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  dangerIcon: {
    width: 16,
    height: 16,
    marginRight: 5
  },
  attionIcon: {
    width: 18,
    height: 18,
    marginRight: 5
  },
  moduleItemWrap: {
    width: width - 10 * 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 45,
    paddingHorizontal: 15,
    borderTopWidth: pixeled(1),
    borderTopColor: COLOR.underlineColor,
    backgroundColor: COLOR.whiteBgColor
  },
  mileageModuleH: {
    paddingTop: 15,
    paddingBottom: 10,
    height: "auto"
  },
  titleText: {
    fontSize: 14
  },
  titleDangerText: {
    color: COLOR.dangerTextColor
  },
  titleWarningText: {
    color: COLOR.warningTextColor
  },
  titleGoodText: {
    color: COLOR.goodTextColor
  },
  moduleItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  modulePartName: {
    fontSize: 14,
    color: COLOR.blackRank0
  },
  moduleAdviceMil: {
    fontSize: 14,
    color: COLOR.blackRank2
  },
  moduleBotRadius: {
    borderBottomLeftRadius: COLOR.moduleBoderRadius,
    borderBottomRightRadius: COLOR.moduleBoderRadius
  },
  upDownWrap: {
    width: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  upArrow: {
    width: 21,
    height: 16
  },
  titleExpandWrap: {
    width: width - 10 * 2,
    flexDirection: "column",
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: COLOR.bgGrayColor2
  },
  titleExpandCont: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  partInerList: {
    width: width - 10 * 2 - 6 * 2,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  subListWrap: {},
  partModuItem: {
    marginVertical: 2
  },
  partModuItemTit: {
    flexDirection: "column",
    paddingHorizontal: 9
  },
  partModuItemText: {
    fontSize: 12,
    color: COLOR.blackRank0
  },
  partInerItem: {
    width: (width - 10 * 4 - 5 * 2) / 2,
    marginVertical: 3,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: 3
  },
  partInerTitName: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  partInerTit: {
    fontSize: 12,
    color: COLOR.blackRank1
  },
  partInerName: {
    width: 60
  },
  partInerCont: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    overflow: "hidden"
  },
  partImageWrap: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 6
  },
  ImageItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  ImageItemPic: {
    width: width - 10 * 2 - 30 * 2,
    height: height / 3
  },
  partComment: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 3
  },
  partCommentText: {
    fontSize: 12,
    lineHeight: 18,
    color: COLOR.blackRank0
  },
  smallListWrap: {
    width: width - 10 * 2 - 15 * 2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    paddingBottom: 10,
    paddingTop: 8
  },
  smallListContair: {
    width: width * 6
  },
  rowImagesItem: {
    width: (width - 10 * 2 - 15 * 2 - 5 * 4) / 4,
    height: 70,
    marginRight: 5,
    marginBottom: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  smallItemPic: {
    width: 70,
    height: 70
  },
  circleRadius: {
    flexDirection: "column",
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 3,
    overflow: "hidden"
  },
  goodRadius: {
    backgroundColor: COLOR.hintColorGood
  },
  warningRadius: {
    backgroundColor: COLOR.hintColorWarning
  },
  dangerRadius: {
    backgroundColor: COLOR.hintColorDanger
  },
  partGood: {
    fontSize: 12,
    color: COLOR.hintColorGood
  },
  partWarning: {
    fontSize: 12,
    color: COLOR.hintColorWarning
  },
  partDanger: {
    fontSize: 12,
    color: COLOR.hintColorDanger
  },
  baseNote: {
    fontSize: 12,
    color: COLOR.blackRank2
  },
  constructionFooter: {
    flexDirection: "column",
    padding: 10,
    alignItems: "center",
    backgroundColor: COLOR.blackRank5
  },
  sureConstruction: {
    width: width - 10 * 2,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: COLOR.borderRadius5,
    backgroundColor: COLOR.primaryColor
  },
  showSelectModel: {
    flex: 1,
    flexDirection: "column"
  },
  sureSelectMode: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.modalDefaultShadow
  },
  surSelectIner: {
    width: width / 3 * 2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    maxHeight: height / 5 * 1,
    minHeight: 100
  },
  sureSelectContent: {
    width: width / 3 * 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 25,
    paddingHorizontal: 25,
    borderTopLeftRadius: COLOR.borderRadius5,
    borderTopRightRadius: COLOR.borderRadius5,
    backgroundColor: COLOR.whiteBgColor
  },
  sureText: {
    fontSize: 18,
    color: COLOR.blackRank0
  },
  sureBtnWrap: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  cancleSureBtn: {
    flex: 1,
    height: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: COLOR.borderRadius5,
    backgroundColor: COLOR.bgNavColor
  },
  confirmSureBtn: {
    flex: 1,
    height: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: COLOR.borderRadius5,
    backgroundColor: COLOR.primaryColor
  },
  showPicModel: {
    flex: 1,
    flexDirection: "column"
  },
  picModelWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.modalDefaultShadow
  },
  picModelCon: {
    flex: 1,
    maxHeight: height / 5 * 3,
    minHeight: 350
  },
  bigPicWrap: {
    width: width - 30,
    height: height / 5 * 3,
    justifyContent: "center",
    alignItems: "center"
  },
  bigPic: {
    width: width - 30,
    maxHeight: height / 5 * 3,
    minHeight: 350
  },
  endHead: {
    fontSize: 18,
    marginTop: 0,
    marginBottom: 10,
    color: COLOR.blackRank0
  },
  closeWrap: {
    position: "absolute",
    top: -30,
    right: 0,
    height: 30
  },
  closeIcon: {
    width: 30,
    height: 30
  },
  noExpandTip: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  monthWrap: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  }
});
/* react-redux store

================================================================ */

const mapStateToProps = state => {
  return {
    detailStatus: state.DetectionDetailReducer.detailStatus,
    carDetalData: state.DetectionDetailReducer.carDetalData,
    auth: state.splashReducer.auth,
    pageLoading: state.DetectionDetailReducer.pageLoading
      ? state.DetectionDetailReducer.pageLoading
      : false,
    detectionStatus: state.DetectionDetailReducer.detectionStatus,
    detectionData: state.DetectionDetailReducer.detectionData,
    detectionLoading: state.DetectionDetailReducer.detectionLoading
      ? state.DetectionDetailReducer.detectionLoading
      : false,
    navState: state.nav,
    expandStatus: state.DetectionDetailReducer.expandStatus,
    getPartId: state.DetectionDetailReducer.getPartId,
    expandData: state.DetectionDetailReducer.expandData,
    expandLoading: state.DetectionDetailReducer.expandLoading
      ? state.DetectionDetailReducer.expandLoading
      : false,
    deteCheckStatus: state.DetectionDetailReducer.deteCheckStatus,
    detecheckId: state.DetectionDetailReducer.detecheckId,
    detectManualStatus: state.DetectionDetailReducer.detectManualStatus,
    detectManualData: state.DetectionDetailReducer.detectManualData,
    statistStatus: state.ConstructionReducer.statistStatus,
    statistDate: state.ConstructionReducer.statistDate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCarDetail: (receptionId, token) => {
      getCarDetailData(dispatch, receptionId, token);
    },
    getDetectionListData: (checkId, token) => {
      getDetectionDetailData(dispatch, checkId, token);
    },
    getDeteCheckId: (pickId, token) => {
      getDeteCheckId(dispatch, pickId, token);
    },
    getExpandInfoFun: (partId, checkId, token) => {
      getExpandData(dispatch, partId, checkId, token);
    },
    getDetectionManual: (code, token) => {
      getDetectionManual(dispatch, code, token);
    },
    getClickStatist: (receptionId, token) => {
      getClickStatist(dispatch, receptionId, token);
    },
    dispatch: dispatch
  };
};

/* Export
================================================================ */

export default connect(mapStateToProps, mapDispatchToProps)(
  DetectionDetailPage
);
