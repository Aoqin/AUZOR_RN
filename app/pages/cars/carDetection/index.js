/**
 *检测记录
 * @params guxiang.yi
 * @params
 */
import React, { PureComponent } from "react";
import { FlatList, Image, View, Text, Platform } from "react-native";
import { connect } from "react-redux";

import StyleSheet from "../../../utils/styleSheet";
import { COLOR } from "../../../constants/baseStyleDefinition";
import Header from "../../../components/header";
import Loading from "../../../components/loading";
import StupidTouchableOpacity from "../../../components/stupidTouchableOpacity";
// import { pixeled } from "../../../utils/pixel";
const isandroid = Platform.OS === "android" ? true : false;
import { getCarDetection } from "./action";

class CarDetectionPage extends PureComponent {
  // 构造
  constructor(props) {
    super(props);
    this.state = {
      detectionData: []
    };
    this.renderItem = this.renderItem.bind(this);
    this.getReportClick = this.getReportClick.bind(this);
  }
  componentDidMount() {
    this.props.getCarDetection(
      this.props.navigation.state.params.carId,
      this.props.auth.token
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.detectionStatus !== this.props.detectionStatus) {
      if (nextProps.detectionStatus === "success") {
        this.setState({
          detectionData: nextProps.detectionData
        });
      }
    }
  }
  renderItem({ item, index }) {
    return (
      <View
        accessibilityLabel="detectionItem"
        style={styles.detectionItemModule}
      >
        <StupidTouchableOpacity
          onPress={() => this.getReportClick(item)}
          accessibilityLabel={`link-carDetection${index}`}
          style={styles.detectionItem}
        >
          <View style={styles.detectionItemIner}>
            <View style={styles.detectionItemStatus}>
              <View style={{ flex: 1 }}>
                <Text style={styles.detectionItemTitle}>
                  {item.license ? item.license : ""}
                </Text>
              </View>
              <View style={styles.dayShow}>
                <Text style={styles.timeText}>
                  {item.dateAdded ? item.dateAdded : ""}
                </Text>
              </View>
            </View>
            <View style={styles.userNameSplit}>
              <View style={styles.userNameCont}>
                <Image
                  style={styles.userPic}
                  source={require("../../../assets/images/-technician.png")}
                />
                <Text style={styles.userText} numberOfLines={1}>
                  {item.carOwnerName ? item.carOwnerName : "游客"}
                </Text>
              </View>
              <View style={styles.rowFlex1}>
                <View style={styles.urgentPicWrap}>
                  <Image
                    source={require("../../../assets/images/emergency.png")}
                    style={styles.urgentPic}
                  />
                </View>
                <Text style={styles.urgentText}>
                  {item.urgentTotal ? item.urgentTotal + "" : "0"}项
                </Text>
              </View>
              <View style={styles.rowFlex1}>
                <View style={styles.attenTionWrap}>
                  <Image
                    source={require("../../../assets/images/attention.png")}
                    style={styles.attentionPic}
                  />
                </View>
                <Text style={styles.attentionText}>
                  {item.nextTotal ? item.nextTotal + "" : "0"}项
                </Text>
              </View>
              <View style={styles.rowFlex1}>
                <View style={styles.goodWrap}>
                  <Image
                    source={require("../../../assets/images/well.png")}
                    style={styles.goodPic}
                  />
                </View>
                <Text style={styles.goodText}>
                  {item.goodTotal ? item.goodTotal + "" : "0"}项
                </Text>
              </View>
            </View>
          </View>
        </StupidTouchableOpacity>
      </View>
    );
  }
  /*跳转到相应检测详情页*/
  getReportClick(item) {
    this.props.navigation.navigate("DetectionDetail", {
      receptionId: item.receptionId,
      license: item.license
    });
  }
  /*返回上级*/
  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    const { detectionData } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: COLOR.blackRank5 }}>
        <Header
          title={this.props.navigation.state.params.license + "检测记录"}
          leftArea={
            <StupidTouchableOpacity
              accessibilityLabel="btn-carDetectionReturn"
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
        <View style={styles.detectionWrap}>
          {detectionData && detectionData.length > 0 ? (
            <FlatList
              data={detectionData}
              showsVerticalScrollIndicator={false}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={(item, index) => item.id + "" + index}
            />
          ) : (
            <View style={{ alignSelf: "center", flex: 1 }}>
              <Image
                style={{ width: 229, height: 211, marginTop: 100 }}
                source={require("../../../assets/images/black-page-tip.png")}
              />
              <Text
                style={{
                  justifyContent: "center",
                  color: COLOR.secondaryGrayFontColor,
                  marginTop: 20,
                  alignSelf: "center"
                }}
              >
                暂无检测记录
              </Text>
            </View>
          )}

          <Loading isVisible={this.props.pageLoading} text="加载中..." />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detectionWrap: {
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 10
  },
  detectionItemModule: {
    flexDirection: "row",
    flex: 1,
    marginTop: 5,
    borderRadius: COLOR.moduleBoderRadius,
    backgroundColor: COLOR.whiteBgColor
  },
  detectionItem: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 12
  },
  detectionItemIner: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  detectionItemTitle: {
    color: COLOR.defaultFontColor,
    fontWeight: "bold",
    fontSize: 15
  },
  detectionItemStatus: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5
  },
  dayShow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  userNameSplit: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingRight: 15
  },
  userNameCont: {
    flex: 1,
    flexDirection: "row"
  },
  userPic: {
    height: 14,
    width: 13
  },
  userText: {
    color: COLOR.grayFontColor,
    fontSize: 11,
    marginLeft: 4
  },
  urgentPicWrap: {
    marginLeft: 20,
    borderRadius: COLOR.moduleBoderRadius,
    height: 12,
    width: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.dangerColor
  },
  urgentPic: {
    height: 10,
    width: 8,
    tintColor: COLOR.white
  },
  urgentText: {
    color: COLOR.grayFontColor,
    fontSize: 11,
    marginLeft: 4,
    lineHeight: 12
  },
  attenTionWrap: {
    marginLeft: 15,
    borderRadius: COLOR.moduleBoderRadius,
    height: 12,
    width: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.tipsBgColor
  },
  attenTionPic: {
    height: 10,
    width: 2,
    tintColor: COLOR.white
  },
  attentionText: {
    color: COLOR.grayFontColor,
    fontSize: 11,
    marginLeft: 4,
    lineHeight: 12
  },
  rowFlex1: {
    flex: 1,
    flexDirection: "row"
  },
  goodWrap: {
    marginLeft: 15,
    borderRadius: COLOR.moduleBoderRadius,
    height: 12,
    width: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.hintBgGood
  },
  goodPic: {
    height: 7,
    width: 10,
    tintColor: COLOR.white
  },
  goodText: {
    color: COLOR.grayFontColor,
    fontSize: 11,
    marginLeft: 4,
    lineHeight: 12
  },
  timeText: {
    color: COLOR.grayFontColor,
    fontSize: 11,
    marginLeft: 4,
    lineHeight: 12
  }
});

/* react-redux store

================================================================ */

const mapStateToProps = state => {
  return {
    auth: state.splashReducer.auth,
    pageLoading: state.CarDetectionReducer.pageLoading,
    detectionData: state.CarDetectionReducer.detectionData,
    detectionStatus: state.CarDetectionReducer.detectionStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCarDetection: (license, token) => {
      getCarDetection(dispatch, license, token);
    },
    dispatch: dispatch
  };
};

/* Export
================================================================ */

export default connect(mapStateToProps, mapDispatchToProps)(CarDetectionPage);
