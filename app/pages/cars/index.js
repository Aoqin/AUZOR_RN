/**
 * 车辆列表页
 * @params  guixiang.yi
 * @params
 *
 * */

import React,{PureComponent} from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import Sugar from "sugar-date";
import { connect } from "react-redux";
import { COLOR } from "../../constants/baseStyleDefinition";
import Loading from "../../components/loading";
import Header from "../../components/header";
import SearchBar from "../../components/searchBar";
import StupidTouchableOpacity from "../../components/stupidTouchableOpacity";
import * as NavAction from "../../store/commonStore/nav/action";
import { ToastShort } from "../../components/toast";
import { getCarList } from "./action";
import { width } from "../../utils/pixel";

class CarsPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      carSections: [],
      pageTitle: "车辆列表"
    };
    this.goToCarDetail = this.goToCarDetail.bind(this);
  }

  componentDidMount() {
    let params = {
      pageNum: 1
    };
    this.props.getCarListFunc(params, this.props.auth.token);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.status !== this.props.status) {
      if (nextProps.status === "success") {
        this.setState({
          carSections: this.calculateSections(nextProps.carData)
        });
      }
    }
  }
  calculateSections(carData) {
    if (typeof carData === "undefined") {
      return [];
    }
    let todayData = [],
      yesterdayData = [],
      earlierData = [];
    carData.map((item, i) => {
      if (Sugar.Date.isToday(Sugar.Date.create(item.dateAdded))) {
        todayData.push(item);
      } else if (Sugar.Date.isYesterday(Sugar.Date.create(item.dateAdded))) {
        yesterdayData.push(item);
      } else {
        earlierData.push(item);
      }
    });
    let sections = [];
    if (todayData.length > 0) {
      sections.push({
        key: "today",
        text: "今天",
        count: todayData.length,
        data: todayData
      });
    }
    if (yesterdayData.length > 0) {
      sections.push({
        key: "yesterday",
        text: "昨天",
        count: yesterdayData.length,
        data: yesterdayData
      });
    }
    if (earlierData.length > 0) {
      sections.push({
        key: "earlier",
        text: "更早",
        count: earlierData.length,
        data: earlierData
      });
    }
    return sections;
  }
  handleTime(type, time) {
    if (type === "更早") {
      let curTime = time.split(" ");
      return curTime[0];
    } else {
      let curTime = time.split(" ");
      return curTime[1];
    }
  }
  renderCarItem({ item }) {
    return (
      <View style={styles.carModuleAll} key={"carListModule" + item.key}>
        <View style={styles.carModuleDate}>
          <Text style={styles.carModuleTitle}>{item.text}</Text>
        </View>
        <View style={styles.carModuleList}>
          {item.data
            ? item.data.map((litem, carIndex) => {
                return (
                  <StupidTouchableOpacity
                    activeOpacity={0.8}
                    accessibilityLabel={`link-carDetail${carIndex}`}
                    onPress={this.goToCarDetail.bind(this, litem)}
                    key={"carList" + litem.id + carIndex}
                  >
                    <View style={styles.carsModuleItem}>
                      <View style={styles.carsModuleItemIner}>
                        <View style={styles.carLogo}>
                          {litem.carLogo ? (
                            <Image
                              style={styles.carLogPic}
                              source={{ uri: litem.carLogo }}
                            />
                          ) : (
                            <Image
                              style={styles.carLogDefalutPic}
                              source={require("../../assets/images/receivecar/default-icon.png")}
                            />
                          )}
                        </View>
                        <View style={styles.carDesc}>
                          <View style={styles.carDescText}>
                            <Text style={styles.carLicense}>
                              {litem.license}
                            </Text>
                            <Text style={styles.carRemark}>
                              {litem.brandName}
                              {litem.specName}
                            </Text>
                          </View>
                          {typeof litem.remainsTotal !== "undefined" &&
                          litem.remainsTotal !== null &&
                          litem.remainsTotal !== "0" ? (
                            <View style={styles.bugWrap}>
                              <Text style={styles.bugText}>
                                {litem.remainsTotal}个遗留问题
                              </Text>
                            </View>
                          ) : null}
                        </View>
                        {litem.dateAdded ? (
                          <View style={styles.dataWrap}>
                            <Text style={styles.carTime}>
                              {this.handleTime(item.text, litem.dateAdded)}
                            </Text>
                          </View>
                        ) : null}
                      </View>
                      <View style={styles.carArrow}>
                        <Image
                          style={styles.nextDetail}
                          source={require("../../assets/images/icon-next.png")}
                        />
                      </View>
                    </View>
                  </StupidTouchableOpacity>
                );
              })
            : null}
        </View>
      </View>
    );
  }

  loadMore() {
    if (this.props.hasMore && this.props.status === "success") {
      let params = {
        pageNum: this.props.pageNum + 1,
        keyword: this.state.searchText
      };
      this.props.getCarListFunc(params, this.props.auth.token);
    } else if (
      !this.props.hasMore &&
      this.props.pageNum >= this.props.totalPage
    ) {
      ToastShort("没有更多了哦");
    }
  }
  onRefresh() {
    let params = {
      pageNum: 1,
      keyword: this.state.searchText
    };
    this.props.getCarListFunc(params, this.props.auth.token);
  }
  goToCarDetail(item) {
    let params = {
      pageNum: 1
    };
    NavAction.subscriptionPageResult(
      this.props.dispatch,
      "Construction",
      data => {
        if (data.refreshType === true) {
          this.props.getCarListFunc(params, this.props.auth.token);
        }
      }
    );
    this.props.navigation.navigate("CarsDetail", {
      receptionId: item.receptionId,
      license: item.license
    });
  }
  searchChange(text) {
    let that = this;
    let params = {};
    params = {
      pageNum: 1,
      keyword: text
    };
    this.setState(
      {
        searchText: text
      },
      () => {
        if (typeof that.timer !== "undefined") {
          clearTimeout(that.timer);
        }
        that.timer = setTimeout(() => {
          params = {
            pageNum: 1,
            keyword: text
          };
          this.props.getCarListFunc(params, this.props.auth.token);
        }, 500);
      }
    );
  }

  RefreshData() {
    let params = {
      pageNum: 1,
      keyword: this.state.searchText
    };
    this.props.getCarListFunc(params, this.props.auth.token);
  }

  searchSubmit(event) {
    this.searchChange.call(this, event.nativeEvent.text);
  }
  render() {
    const { pageTitle, carSections } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: COLOR.blackRank5 }}>
        <Header title={pageTitle} />
        <View
          style={{
            backgroundColor: COLOR.blackRank5,
            flexDirection: "row"
          }}
        >
          <SearchBar
            lightTheme
            clearIcon={this.state.searchText !== "" ? true : false}
            containerStyle={{
              backgroundColor: COLOR.blackRank5,
              borderWidth: 0,
              flex: 1,
              height: 60
            }}
            inputStyle={{
              padding: 0,
              backgroundColor: COLOR.white,
              height: 35,
              justifyContent: "center",
              paddingLeft: 5
            }}
            textAlign={"center"}
            // searchRadius={5}
            value={this.state.searchText ? this.state.searchText : ""}
            onChangeText={this.searchChange.bind(this)}
            onSubmitEditing={this.searchSubmit.bind(this)}
            placeholder="搜索车牌号/品牌"
            placeholderTextColor={COLOR.blackRank2}
            textInputRef="search"
            returnKeyType="search"
            clearTextFunc={this.searchChange.bind(this, "")}
          />
        </View>
        <View style={styles.carListScrol}>
          {carSections && carSections.length > 0 ? (
            <FlatList
              data={carSections}
              refreshing={false}
              keyExtractor={(item, index) => item + index}
              renderItem={this.renderCarItem.bind(this)}
              onRefresh={this.onRefresh.bind(this)}
              onEndReached={() => this.loadMore()}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View style={styles.noResult}>
              <Text style={styles.noResultText}>
                暂无车辆信息，赶紧去接一个车试试吧！
              </Text>
            </View>
          )}
          <Loading isVisible={this.props.pageLoading} text={"加载中"} />
        </View>
      </View>
    );
  }
}

/* StyleSheet
================================================================ */

const styles = StyleSheet.create({
  carListScrol: {
    flex: 1,
    paddingBottom: 40
  },
  carModuleAll: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginHorizontal: 10
  },
  carModuleDate: {
    flex: 1,
    paddingTop: 5
  },
  carModuleTitle: {
    fontSize: 14,
    height: 20,
    lineHeight: 20,
    fontWeight: "bold",
    color: COLOR.blackRank0
  },
  carModuleList: {
    width: width - 10 * 2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  carsModuleItem: {
    width: width - 10 * 2,
    flexDirection: "column",
    backgroundColor: COLOR.white,
    borderRadius: COLOR.moduleBoderRadius,
    marginVertical: 4,
    paddingVertical: 10
  },
  carsModuleItemIner: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  carLogo: {
    width: 46,
    height: 46,
    borderRadius: COLOR.borderRadius23,
    marginHorizontal: 10,
    backgroundColor: COLOR.greyBgColor,
    justifyContent: "center",
    alignItems: "center"
  },
  carLogPic: {
    width: 30,
    height: 30,
    alignSelf: "center"
  },
  carLogDefalutPic: {
    width: 35,
    height: 35,
    alignSelf: "center"
  },
  carDesc: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  carDescText: {
    flex: 1,
    paddingBottom: 5
  },
  carLicense: {
    fontSize: 14,
    color: COLOR.blackRank0
  },
  carRemark: {
    fontSize: 12,
    color: COLOR.secondaryGrayFontColor
  },
  carArrow: {
    flex: 1,
    height: 14,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 10,
    marginTop: -14
  },
  nextDetail: {
    width: 8,
    height: 14
  },
  bugWrap: {
    paddingRight: 5,
    paddingLeft: 5,
    height: 14,
    paddingBottom: 2,
    borderRadius: COLOR.tagBorderRadius,
    backgroundColor: COLOR.hintBackgroundColor
  },
  bugText: {
    fontSize: 11,
    color: COLOR.bugColor
  },
  dataWrap: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginRight: 5
  },
  carTime: {
    marginTop: 3,
    marginBottom: 3,
    paddingRight: 5,
    fontSize: 12,
    color: COLOR.secondaryGrayFontColor
  },
  noResult: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  noResultText: {
    fontSize: 14,
    color: COLOR.blackRank2
  }
});

/* react-redux store
================================================================ */

const mapStateToProps = state => {
  return {
    auth: state.splashReducer.auth,
    carData: state.CarReducer.carData,
    pageLoading: state.CarReducer.pageLoading,
    pageNum: state.CarReducer.pageNum,
    totalPage: state.CarReducer.totalPage,
    status: state.CarReducer.status,
    hasMore: state.CarReducer.hasMore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCarListFunc: (params, token) => {
      getCarList(dispatch, params, token);
    },
    dispatch: dispatch
  };
};

/* Export
================================================================ */

module.exports = connect(mapStateToProps, mapDispatchToProps)(CarsPage);
