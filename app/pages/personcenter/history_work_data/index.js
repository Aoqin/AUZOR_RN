import React,{PureComponent} from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Platform,
  Image
} from "react-native";
import SegmentedControlTab from "../../../components/segmentedControlTab";
import StupidTouchableOpacity from "../../../components/stupidTouchableOpacity";
import Pager from "../../../components/pager";
import Header from "../../../components/header";
import { COLOR } from "../../../constants/baseStyleDefinition";
import { ToastShort } from "../../../utils/rootToast";
import { pixeled } from "../../../utils/pixel";

import Sugar from "sugar-date";
import { connect } from "react-redux";
import { DoShowData } from "../../personcenter/action";

let { width } = Dimensions.get("window");
const isandroid = Platform.OS === "android" ? true : false;
export default class UserWorkStat extends PureComponentÍÍÍ {
  constructor(props) {
    super(props);
    this.state = {
      userReception: {
        checkCount: 0,
        receptionCount: 0,
        pushCount: 0,
        workCount: 0
      },
      finds: {},
      finish: {},
      dateTypeSelected: 0,
      dataSelected: 0,
      dayTime: "",
      weekStart: "",
      weekEnd: "",
      monthStart: "",
      monthEnd: ""
    };
  }

  handleSelect(event) {
    let entry = event.nativeEvent;
    if (entry == null) {
      this.setState({ ...this.state, selectedEntry: null });
    } else {
      this.setState({ ...this.state, selectedEntry: JSON.stringify(entry) });
    }
  }

  /*选择按日，按天，按周来统计*/
  setSelectedOption(selectedOption) {
    let tempState = {};
    if (selectedOption === 0) {
      tempState = {
        dateTypeSelected: 0,
        dataSelected: 0,
        dayTime: this.state.dayTime
      };
      this.props.ChangeShowData(
        tempState.dayTime,
        tempState.dayTime,
        this.props.auth.token
      );
    }
    if (selectedOption === 1) {
      tempState = {
        dateTypeSelected: 1,
        dataSelected: 0,
        weekStart: this.state.weekStart,
        weekEnd: this.state.weekEnd
      };
      this.props.ChangeShowData(
        tempState.weekStart,
        tempState.weekEnd,
        this.props.auth.token
      );
    }
    if (selectedOption === 2) {
      tempState = {
        dateTypeSelected: 2,
        dataSelected: 0,
        monthStart: this.state.monthStart,
        monthEnd: this.state.monthEnd
      };
      this.props.ChangeShowData(
        tempState.monthStart,
        tempState.monthEnd,
        this.props.auth.token
      );
    }
    this.setState(tempState);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userReportStatus !== this.props.userReportStatus) {
      if (nextProps.userReportStatus === "success") {
        this.setState({
          userReception: nextProps.userReception
        });
      } else if (nextProps.userReportStatus === "failed") {
        ToastShort("工作历史数据获取失败！");
      }
    }
  }

  /*上一页，下一页*/
  pagerClick(pageAdd) {
    let tempTime = this.state.dayTime;
    let weekStartTime = this.state.weekStart;
    let weekEndTime = this.state.weekEnd;
    let monthStartTime = this.state.monthStart;
    let monthEndTime = this.state.monthEnd;
    if (this.state.dateTypeSelected === 0) {
      if (pageAdd < 0) {
        let tempTimeDay = Sugar.Date.addDays(Sugar.Date.create(tempTime), -1);
        let temp_day = Sugar.Date.format(tempTimeDay, "%Y-%m-%d");
        this.setState({
          dayTime: temp_day
        });
        this.props.ChangeShowData(temp_day, temp_day, this.props.auth.token);
      }
      if (pageAdd > 0) {
        if (Sugar.Date.isToday(Sugar.Date.create(this.state.dayTime))) {
          ToastShort("没有更多数据了");
        } else {
          let tempTimeDay = Sugar.Date.addDays(Sugar.Date.create(tempTime), 1);
          let temp_day = Sugar.Date.format(tempTimeDay, "%Y-%m-%d");
          this.setState({
            dayTime: temp_day
          });
          this.props.ChangeShowData(temp_day, temp_day, this.props.auth.token);
        }
      }
    }

    if (this.state.dateTypeSelected === 1) {
      if (pageAdd < 0) {
        let tempTimeWeekStart = Sugar.Date.addDays(
          Sugar.Date.create(weekStartTime),
          -7
        );
        let tempTimeWeekEnd = Sugar.Date.addDays(
          Sugar.Date.create(weekEndTime),
          -7
        );
        let week_start = Sugar.Date.format(tempTimeWeekStart, "%Y-%m-%d");
        let week_end = Sugar.Date.format(tempTimeWeekEnd, "%Y-%m-%d");
        this.setState({
          weekStart: week_start,
          weekEnd: week_end
        });
        this.props.ChangeShowData(week_start, week_end, this.props.auth.token);
      }
      if (pageAdd > 0) {
        if (Sugar.Date.isFuture(Sugar.Date.create(this.state.end))) {
          ToastShort("没有更多数据了");
        } else {
          let tempTimeWeekStart = Sugar.Date.addDays(
            Sugar.Date.create(weekStartTime),
            7
          );
          let tempTimeWeekEnd = Sugar.Date.addDays(
            Sugar.Date.create(weekEndTime),
            7
          );
          let week_start = Sugar.Date.format(tempTimeWeekStart, "%Y-%m-%d");
          let week_end = Sugar.Date.format(tempTimeWeekEnd, "%Y-%m-%d");
          this.setState({
            weekStart: week_start,
            weekEnd: week_end
          });
          this.props.ChangeShowData(
            week_start,
            week_end,
            this.props.auth.token
          );
        }
      }
    }

    if (this.state.dateTypeSelected === 2) {
      let tempTimeMonth = Sugar.Date.set(
        Sugar.Date.create(monthStartTime),
        { date: 1 },
        true
      );
      let tempTimeMonthEnd = Sugar.Date.endOfMonth(
        Sugar.Date.create(monthEndTime)
      );

      if (pageAdd < 0) {
        let tempTime2 = Sugar.Date.addMonths(
          Sugar.Date.create(tempTimeMonth),
          -1
        );
        let tempTime2end = Sugar.Date.endOfMonth(
          Sugar.Date.addMonths(
            Sugar.Date.create(Sugar.Date.create(monthEndTime)),
            -1
          )
        );
        let month_start = Sugar.Date.format(tempTime2, "%Y-%m-%d");
        let month_end = Sugar.Date.format(tempTime2end, "%Y-%m-%d");
        this.setState({
          monthStart: month_start,
          monthEnd: month_end
        });
        this.props.ChangeShowData(
          month_start,
          month_end,
          this.props.auth.token
        );
      }
      if (pageAdd > 0) {
        if (Sugar.Date.isFuture(Sugar.Date.create(this.state.end))) {
          ToastShort("没有更多数据了");
        } else {
          let tempTime2 = Sugar.Date.addMonths(
            Sugar.Date.create(tempTimeMonth),
            1
          );
          let tempTime2end = Sugar.Date.endOfMonth(
            Sugar.Date.addMonths(
              Sugar.Date.create(Sugar.Date.create(monthEndTime)),
              1
            )
          );
          let month_start = Sugar.Date.format(tempTime2, "%Y-%m-%d");
          let month_end = Sugar.Date.format(tempTime2end, "%Y-%m-%d");
          this.setState({
            monthStart: month_start,
            monthEnd: month_end
          });
          this.props.ChangeShowData(
            month_start,
            month_end,
            this.props.auth.token
          );
        }
      }
    }
  }

  componentDidMount() {
    let today = Sugar.Date.format(new Date(), "%Y-%m-%d");
    let tempTimeWeekStart = Sugar.Date.addDays(
      Sugar.Date.beginningOfWeek(new Date()),
      1
    );
    let tempTimeWeekEnd = Sugar.Date.addDays(
      Sugar.Date.endOfWeek(new Date()),
      1
    );
    this.setState({
      dayTime: today,
      weekStart: Sugar.Date.format(tempTimeWeekStart, "%Y-%m-%d"),
      weekEnd: Sugar.Date.format(tempTimeWeekEnd, "%Y-%m-%d"),
      monthStart: Sugar.Date.format(
        Sugar.Date.set(Sugar.Date.create(today), { date: 1 }, true),
        "%Y-%m-%d"
      ),
      monthEnd: Sugar.Date.format(
        Sugar.Date.endOfMonth(Sugar.Date.create(today)),
        "%Y-%m-%d"
      )
    });
    this.props.ChangeShowData(today, today, this.props.auth.token);
  }

  backPersonCenter() {
    let today = Sugar.Date.format(new Date(), "%Y-%m-%d");
    this.props.ChangeShowData(today, today, this.props.auth.token);
    this.props.navigation.goBack();
  }

  render() {
    const options = ["按日", "按周", "按月"];
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: COLOR.blackRank5
        }}
      >
        <Header
          title={"历史数据"}
          leftArea={
            <StupidTouchableOpacity
              accessibilityLabel="btn-historyReturn"
              onPress={this.backPersonCenter.bind(this)}
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
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View
            accessibilityLabel="time_tab"
            style={{ backgroundColor: COLOR.white }}
          >
            <SegmentedControlTab
              tabsContainerStyle={{
                marginHorizontal: 7,
                marginTop: 15,
                height: 35
              }}
              values={options}
              onTabPress={this.setSelectedOption.bind(this)}
              selectedIndex={this.state.dateTypeSelected}
              tabStyle={{ borderColor: COLOR.defaultBorderColor }}
              activeTabStyle={{ backgroundColor: COLOR.default }}
              tabTextStyle={{ color: COLOR.blackRank2 }}
            />
            <Pager
              style={{ flex: 0, alignSelf: "center", marginVertical: 7 }}
              accessibilityLabel="btn-historyNextPre"
              onPageNextClick={() => this.pagerClick(+1)}
              onPagePreClick={() => this.pagerClick(-1)}
              text={
                this.state.dateTypeSelected === 0
                  ? this.state.dayTime
                  : this.state.dateTypeSelected === 1
                    ? this.state.weekStart + " 至 " + this.state.weekEnd
                    : this.state.monthStart + " 至 " + this.state.monthEnd
              }
            />
          </View>

          <View style={{ height: 490 }}>
            <View
              accessibilityLabel="data_aggregation"
              style={{
                height: 32,
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 4,
                borderTopColor: COLOR.blackRank1,
                borderTopWidth: pixeled(1),
                backgroundColor: COLOR.blackRank5
              }}
              key="appraiseTitle"
            >
              <Text
                style={{
                  width: 80,
                  color: COLOR.blackRank5,
                  fontSize: 12,
                  marginTop: 10
                }}
              >
                任务统计
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                marginLeft: 10,
                marginRight: 10,
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 80,
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: COLOR.white,
                  alignItems: "center",
                  marginRight: 5
                }}
              >
                <Text style={styles.personDataNumStyle}>
                  {this.state.userReception.receptionCount}
                </Text>
                <Text style={styles.personDesStyle}>接 车</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 80,
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: COLOR.white,
                  alignItems: "center",
                  marginLeft: 5
                }}
              >
                <Text style={styles.personDataNumStyle}>
                  {this.state.userReception.checkCount}
                </Text>
                <Text style={styles.personDesStyle}>录入报告</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
                marginLeft: 10,
                marginRight: 10,
                alignItems: "center"
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 80,
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: COLOR.white,
                  alignItems: "center",
                  marginRight: 5
                }}
              >
                <Text style={styles.personDataNumStyle}>
                  {this.state.userReception.pushCount}
                </Text>
                <Text style={styles.personDesStyle}>推送报告</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  height: 80,
                  alignSelf: "center",
                  justifyContent: "center",
                  backgroundColor: COLOR.white,
                  alignItems: "center",
                  marginLeft: 5
                }}
              >
                <Text style={styles.personDataNumStyle}>
                  {this.state.userReception.workCount}
                </Text>
                <Text style={styles.personDesStyle}>确认施工</Text>
              </View>
            </View>
          </View>
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
    backgroundColor: COLOR.blackRank5,
    flexDirection: "column"
  },
  chart: {
    flex: 1
  },
  dataItemStyle: {
    flexDirection: "column",
    width: width / 4,
    justifyContent: "center",
    alignItems: "center"
  },
  dataNumStyle: {
    color: COLOR.default,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 8
  },
  desStyle: {
    color: COLOR.blackRank2,
    fontSize: 12,
    marginTop: 8,
    marginBottom: 8
  },
  numStyle: {
    color: COLOR.blackRank0,
    fontWeight: "bold",
    fontSize: 16
  },
  userItemStyle: {
    flexDirection: "column",
    width: (width - 20) / 5,
    justifyContent: "center",
    alignItems: "center"
  },
  businessTotalIconStyle: {
    width: 20,
    height: 20,
    marginTop: 8
  },
  userBgColorCommon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  },
  personDataNumStyle: {
    fontSize: 16,
    color: COLOR.blackRank0
  },
  personDesStyle: {
    fontSize: 16
  }
});

/* react-redux store
================================================================ */

const mapStateToProps = state => {
  return {
    auth: state.splashReducer.auth,
    userReception: state.PersonCenterReducer.userReception,
    userReportStatus: state.PersonCenterReducer.userReportStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    ChangeShowData: (startTime, endTime, token) => {
      DoShowData(dispatch, startTime, endTime, token);
    }
  };
};

/* Export
================================================================ */

module.exports = connect(mapStateToProps, mapDispatchToProps)(UserWorkStat);
