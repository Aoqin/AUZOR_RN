
import React, { PureComponent } from "react";
import * as Animatable from "react-native-animatable";
import { connect } from "react-redux";

import {
  View,
  Text,
  FlatList,
  Image,
  Easing,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet
} from "react-native";

import { COLOR } from "../../constants/baseStyleDefinition";
import CommonButton from "../../components/commonButton";
import RadioButton from "../../components/radioButton";
import StupidTouchableOpacity from "../../components/stupidTouchableOpacity";
import SearchBar from "../../components/searchBar";
import Loading from "../../components/loading";
import { width, height, pixeled } from "../../utils/pixel";
import { Init, endSubmit } from "./action";
import { ToastShort } from "../../components/toast";
import * as NavAction from "../../store/commonStore/nav/action";

class BoardPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      carBrandData: [],
      modalVisible: false,
      endData: {},
      comments: "",
      select: 0,
      indexId: 0,
      selectIndex: "",
      refusalArray: [
        {
          title: "报告录错"
        },
        {
          title: "车主有事离开"
        },
        {
          title: "熟悉软件试一下"
        },
        {
          title: "其他"
        }
      ]
    };
    this.showArr = [];
    this.tasks = [];
    this.showOperate = this.showOperate.bind(this);
  }

  static navigationOptions = {
    headerTitle: <LogoTitle />,
  }

  componentDidMount() {
    const num = 1;
    this.props.Init(num, "", this.props.auth.token);
    NavAction.subscriptionPageResult(
      this.props.dispatch,
      "ReceiveCar",
      data => {
        if (data.refreshType === true) {
          this.props.Init(1, this.state.searchText, this.props.auth.token);
        }
      }
    );
    NavAction.subscriptionPageResult(
      this.props.dispatch,
      "Construction",
      data => {
        if (data.refreshType === true) {
          this.props.Init(1, this.state.searchText, this.props.auth.token);
        }
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status !== this.props.status) {
      if (nextProps.status === "success") {
        this.setState({
          carBrandData: nextProps.carBrandData
        });
      }
    } else if (nextProps.tipShow !== this.props.tipShow) {
      if (nextProps.tipShow === "endSuccess") {
        ToastShort("终止任务成功");
        this.props.Init(1, this.state.searchText, this.props.auth.token);
      } else if (nextProps.tipShow === "endFailed") {
        ToastShort("终止任务失败");
      }
    }
  }

  searchChange(text) {
    let that = this;
    this.setState(
      {
        searchText: text
      },
      () => {
        if (typeof that.timer !== "undefined") {
          clearTimeout(that.timer);
        }
        that.timer = setTimeout(() => {
          this.props.Init(1, text, this.props.auth.token);
        }, 500);
      }
    );
  }

  searchSubmit(event) {
    this.searchChange.call(this, event.nativeEvent.text);
  }

  showOperate(index) {
    let showArr = [...this.showArr];
    let i = showArr.indexOf(index);
    if (i < 0) {
      showArr.push(index);
      this.tasks[index].transitionTo({ width: 260 }, 300);
    } else {
      showArr.splice(i, 1);
      this.tasks[index].transitionTo(
        { width: 0 },
        260,
        Easing.bezier(0.64, 0.05, 0.89, -0.81)
      );
    }
    this.showArr = [...showArr];
    this.setState({ indexId: index });
  }

  toReceivecar(value) {
    if (value.receptionStatus !== -1) {
      this.props.navigation.navigate("ReceiveCar", {
        license: value.license,
        receptionId: value.receptionId
      });
    }
  }

  toVcform(value) {
    if (value.checkStatus === 1 || value.checkStatus === 2) {
      this.props.navigation.navigate("VcForm", {
        license: value.license,
        receptionId: value.receptionId,
        workStatus: value.workStatus
      });
    }
  }

  toConstruction(value) {
    if (value.workStatus === 1 || value.workStatus === 2) {
      this.props.navigation.navigate("Construction", {
        license: value.license,
        receptionId: value.receptionId,
        checkId: value.checkId
      });
    }
  }
  loadMoreData() {
    if (this.props.hasMore && this.props.status === "success") {
      let num = this.props.num + 1;
      this.props.Init(num, this.state.searchText, this.props.auth.token);
    } else if (this.props.num >= this.props.pages) {
      ToastShort("没有更多了哦");
    }
  }
  onRefresh() {
    let num = 1;
    this.props.Init(num, this.state.searchText, this.props.auth.token);
  }
  onChangeTextAutoInfo(type, value) {
    this.setState({
      comments: value
    });
  }
  endClick(value) {
    let endData = { receptionId: value.receptionId, comments: "" };
    if (value.receptionStatus !== -1) {
      this.setState({
        modalVisible: true,
        endData: endData
      });
    } else {
      ToastShort("该任务已结束");
    }
  }

  endSubmit() {
    let endData = Object.assign({}, this.state.endData);
    if (this.state.select === 0) {
      endData.comments = "报告录错";
    } else if (this.state.select === 1) {
      endData.comments = "车主有事离开一下";
    } else if (this.state.select === 2) {
      endData.comments = "熟悉软件试一下";
    } else if (this.state.select === 3) {
      endData.comments = "其他:" + this.state.comments;
    }
    let refusalArray = JSON.parse(JSON.stringify(this.state.refusalArray));
    for (let i = 0; i < refusalArray.length; i++) {
      refusalArray[i].choose = false;
    }
    this.setState({
      modalVisible: false,
      endData: endData,
      select: 0,
      comments: "",
      selectIndex: "",
      refusalArray: refusalArray
    });

    this.props.endSubmit(endData, this.props.auth.token);
    this.showOperate(this.state.indexId);
  }

  _renderItem({ item, index }) {
    //状态0：未开始，1：已开始，2：已完成，-1：已终止
    //checkStatus:录入报告，workStatus：施工，receptionStatus：接车
    return (
      <View style={styles.itemWrap} key={item.license + "view" + index}>
        <View style={styles.itemTitle}>
          {item.brandIcon ? (
            <Image style={styles.carLogPic} source={{ uri: item.brandIcon }} />
          ) : (
            <Image
              style={styles.carLogDefalutPic}
              source={require("../../assets/images/receivecar/default-icon.png")}
            />
          )}
          <View style={{ flex: 1, marginLeft: 6 }}>
            <Text style={styles.licenseStyle}>{item.license}</Text>
            <Text style={styles.brandFont} numberOfLines={2}>
              {item.carSpec}
            </Text>
          </View>
          <View style={styles.timeWrap}>
            <Text style={styles.brandFont}>{item.startTime}</Text>
          </View>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityLabel="link-receivecar"
            style={styles.itemButton}
            key={"reception" + index}
            onPress={this.toReceivecar.bind(this, {
              license: item.license,
              receptionStatus: item.receptionStatus,
              receptionId: item.receptionId
            })}
          >
            <Image
              style={styles.itemImages}
              resizeMode="contain"
              source={
                item.receptionStatus === 1
                  ? require("../../assets/images/board/receivercarUnfinish.png")
                  : item.receptionStatus === 2
                    ? require("../../assets/images/board/receivercarFinish.png")
                    : require("../../assets/images/board/receivercarDisable.png")
              }
            />
          </TouchableOpacity>
          <Image
            style={{ marginLeft: 5, marginRight: 5, width: 30 }}
            resizeMode="contain"
            source={
              item.receptionStatus === 2
                ? require("../../assets/images/board/processing.png")
                : require("../../assets/images/board/processing-W.png")
            }
          />
          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityLabel="link-vcform"
            key={"Vcform" + index}
            style={styles.itemButton}
            onPress={this.toVcform.bind(this, {
              checkStatus: item.checkStatus,
              workStatus: item.workStatus,
              license: item.license,
              receptionId: item.receptionId
            })}
          >
            <Image
              style={styles.itemImages}
              resizeMode="contain"
              source={
                item.checkStatus === 1
                  ? require("../../assets/images/board/vcFormUnfinish.png")
                  : item.checkStatus === 2
                    ? require("../../assets/images/board/vcFormFinish.png")
                    : require("../../assets/images/board/vcFormDisable.png")
              }
            />
          </TouchableOpacity>
          <Image
            style={{ marginLeft: 5, marginRight: 5, width: 30 }}
            resizeMode="contain"
            source={
              item.checkStatus === 2
                ? require("../../assets/images/board/processing.png")
                : require("../../assets/images/board/processing-W.png")
            }
          />
          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityLabel="link-construction"
            key={"work" + index}
            style={styles.itemButton}
            onPress={this.toConstruction.bind(this, {
              workStatus: item.workStatus,
              license: item.license,
              receptionId: item.receptionId,
              checkId: item.checkId
            })}
          >
            <Image
              style={styles.itemImages}
              resizeMode="contain"
              source={
                item.workStatus === 1
                  ? require("../../assets/images/board/constructionUnfinish.png")
                  : item.workStatus === 2
                    ? require("../../assets/images/board/constructionFinish.png")
                    : require("../../assets/images/board/constructionDisable.png")
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.jumpsWrap}>
          <Animatable.View
            ref={task => {
              this.tasks[index] = task;
            }}
            style={styles.animateStyle}
          >
            {item.workStatus !== 2 ? (
              <TouchableOpacity
                activeOpacity={0.8}
                accessibilityLabel="btn-end"
                key={"end" + index}
                onPress={this.endClick.bind(this, {
                  receptionId: item.receptionId,
                  receptionStatus: item.receptionStatus
                })}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: 15,
                    alignItems: "center"
                  }}
                >
                  <Image
                    style={{ width: 22 }}
                    resizeMode="contain"
                    source={require("../../assets/images/board/termination.png")}
                  />
                  <Text style={styles.operateFont}>终止</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              activeOpacity={0.8}
              accessibilityLabel="link-carsDetail"
              key={"carDetail" + index}
              onPress={() =>
                this.props.navigation.navigate("CarsDetail", {
                  receptionId: item.receptionId,
                  license: item.license
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  marginRight: 10,
                  alignItems: "center"
                }}
              >
                <Image
                  style={{ width: 22 }}
                  resizeMode="contain"
                  source={require("../../assets/images/board/Details.png")}
                />
                <Text style={styles.operateFont}>车辆详情</Text>
              </View>
            </TouchableOpacity>
          </Animatable.View>

          {item.receptionStatus === -1 ? (
            <View
              activeOpacity={0.8}
              key={"budian" + index}
              style={styles.clickMore}
            >
              <Text style={{ color: COLOR.redColor, fontSize: 16 }}>
                已终止
              </Text>
            </View>
          ) : (
            <StupidTouchableOpacity
              activeOpacity={0.8}
              accessibilityLabel="btn-boardMore"
              key={"dian" + index}
              onPress={this.showOperate.bind(this, index)}
              style={styles.clickMore}
            >
              <Image
                style={{ width: 30 }}
                resizeMode="contain"
                source={require("../../assets/images/board/More.png")}
              />
            </StupidTouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={{ backgroundColor: COLOR.white, flexDirection: "row" }}>
          <SearchBar
            lightTheme
            clearIcon={this.state.searchText !== "" ? true : false}
            containerStyle={{
              backgroundColor: COLOR.default,
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
        </View> */}
        {this.state.carBrandData.length === 0 ? (
          <View style={styles.emptyImageCon}>
            <Image
              style={styles.emptyImage}
              source={require("../../assets/images/home-Empty@2x.png.png")}
            />
            <Text style={styles.emptyText}>车间空空如也，新建一个吧 ~ </Text>
          </View>
        ) : (
          <FlatList
            data={this.state.carBrandData}
            keyExtractor={(item, index) => item + index}
            refreshing={false}
            renderItem={this._renderItem.bind(this)}
            onEndReached={this.loadMoreData.bind(this)}
            style={styles.mainListWrap}
            onEndReachedThreshold={1}
            onRefresh={this.onRefresh.bind(this)}
          />
        )}
        <Loading isVisible={this.props.loadingShow} text={"加载中"} />
        <Modal
          style={styles.endModel}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <View style={styles.endViewCon}>
            <View style={styles.endView}>
              <StupidTouchableOpacity
                accessibilityLabel="btn-endCancle"
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Image
                  style={styles.closeIcon}
                  resizeMode="contain"
                  source={require("../../assets/images/board/cancel.png")}
                />
              </StupidTouchableOpacity>
              <View style={styles.endHeadCon}>
                <Text style={styles.endHead}>请选择终止原因</Text>
              </View>
              <View style={styles.endItemCon}>
                <RadioButton
                  style={styles.radiosWrap} //整个组件的样式----这样可以垂直和水平
                  conTainStyle={styles.radiosContent} //图片和文字的容器样式
                  imageStyle={{ width: 20, height: 20 }} //图片样式
                  textStyle={{ color: COLOR.blackRank0 }} //文字样式
                  selectIndex={this.state.selectIndex} //空字符串,表示不选中,数组索引表示默认选中
                  data={this.state.refusalArray} //数据源
                  onPress={(index, item) => {
                    this.setState({
                      select: index
                    });
                  }}
                />
                <View style={styles.noteWrap}>
                  {typeof this.state.select !== "undefined" &&
                  this.state.select === 3 ? (
                    <TextInput
                      style={styles.endInput}
                      accessibilityLabel="txt-endRecivecar"
                      multiline={true}
                      underlineColorAndroid="transparent"
                      textAlignVertical="top"
                      defaultValue={this.state.comments}
                      placeholder="请您输入终止任务的原因！"
                      placeholderTextColor={COLOR.disableBgColor}
                      onChangeText={text => {
                        this.onChangeTextAutoInfo("comments", text);
                      }}
                    />
                  ) : null}
                </View>
              </View>
              <View style={styles.btnCon}>
                <CommonButton
                  theme={"blue"}
                  type="radius"
                  buttonRadius={4}
                  buttonSize="big"
                  caption="提交"
                  fontSize={14}
                  style={styles.endButton}
                  accessibilityLabel="btn-endRecivecar"
                  pressClick={this.endSubmit.bind(this)}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

/* StyleSheet
================================================================ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.blackRank5
  },
  itemImages: {
    width: "100%"
  },
  mainListWrap: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 5
  },
  itemWrap: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 5,
    paddingBottom: 6,
    borderRadius: 10,
    backgroundColor: COLOR.white
  },
  itemTitle: {
    flexDirection: "row",
    borderBottomWidth: pixeled(1),
    borderBottomColor: COLOR.blackRank4
  },
  brandFont: {
    fontSize: 12,
    color: COLOR.blackRank2,
    marginBottom: 5
  },
  licenseStyle: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLOR.blackRank0,
    marginTop: 3
  },
  timeWrap: {
    marginLeft: 10,
    marginRight: 15,
    justifyContent: "center"
  },
  buttonWrap: {
    display: "flex",
    width: width - 5 * 2 - 10 * 2,
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  itemButton: {
    flex: 1
  },
  jumpsWrap: {
    width: width - 5 * 2 - 10 * 2,
    flexDirection: "row",
    height: 25,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  finishLink: {
    flexDirection: "row",
    marginRight: 15,
    alignItems: "center"
  },
  operateIcon: {
    width: 30,
    marginLeft: 6,
    marginRight: 6
  },
  operateFont: {
    color: COLOR.blackRank2,
    fontSize: 15
  },
  animateStyle: {
    flexDirection: "row",
    width: 0,
    marginRight: 0,
    position: "absolute",
    right: 90,
    height: 42,
    justifyContent: "flex-end",
    overflow: "hidden",
    alignItems: "center"
  },
  clickMore: {
    alignItems: "center",
    width: 80,
    height: 42,
    position: "absolute",
    right: 0,
    justifyContent: "center"
  },
  endModel: {
    flex: 1,
    flexDirection: "column"
  },
  endViewCon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  endView: {
    flex: 1,
    maxHeight: height / 5 * 3,
    minHeight: 350,
    backgroundColor: COLOR.whiteBgColor,
    borderRadius: 5
  },
  endHeadCon: {
    justifyContent: "center",
    alignItems: "center"
  },
  endHead: {
    fontSize: 18,
    marginTop: 0,
    marginBottom: 10,
    color: COLOR.blackRank0
  },
  closeIcon: {
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 10
  },
  endItemCon: {
    borderTopWidth: pixeled(1),
    borderColor: COLOR.bottomBorder
  },
  endItem: {
    marginLeft: 45,
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center"
  },
  endItemText: {
    fontSize: 18,
    color: COLOR.blackRank0,
    paddingLeft: 15,
    paddingRight: 122
  },
  endInput: {
    width: width - 30 * 2 - 45 - 25,
    height: 50,
    borderWidth: pixeled(1),
    borderColor: COLOR.textAreaBorderColor,
    borderRadius: COLOR.tagBorderRadius4,
    marginBottom: 10,
    padding: 5,
    fontSize: 13
  },
  btnCon: {
    height: 70
  },
  endButton: {
    paddingHorizontal: 10,
    height: 60,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15
  },
  emptyImageCon: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  emptyImage: {
    width: 208,
    height: 205,
    marginBottom: 24
  },
  emptyText: {
    fontSize: 15,
    color: COLOR.blackRank2
  },
  radiosWrap: {
    width: width - 30 * 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  radiosContent: {
    marginLeft: 45,
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center"
  },
  noteWrap: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 45,
    marginTop: 10,
    height: 60
  },
  carLogPic: {
    width: 38,
    height: 38,
    marginVertical: 6,
    marginLeft: 6,
    alignSelf: "center"
  },
  carLogDefalutPic: {
    width: 38,
    height: 38,
    marginVertical: 6,
    marginLeft: 6,
    alignSelf: "center"
  }
});

/* react-redux store
================================================================ */

const mapStateToProps = state => {
  return {
    auth: state.loginPageReducer.auth,
    carBrandData: state.BoardReducer.carBrandData,
    status: state.BoardReducer.status,
    pages: state.BoardReducer.pages,
    hasMore: state.BoardReducer.hasMore,
    num: state.BoardReducer.num,
    loadingShow: state.BoardReducer.loadingShow,
    tipShow: state.BoardReducer.tipShow,
    updateData: state.BoardReducer.updateData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    Init: (num, key, token) => {
      Init(dispatch, num, key, token);
    },
    endSubmit: (endData, token) => {
      endSubmit(dispatch, endData, token);
    },
    dispatch: dispatch
  };
};

/* Export
================================================================ */

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);
