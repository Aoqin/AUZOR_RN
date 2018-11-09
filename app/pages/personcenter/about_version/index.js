
import React, { PureComponent } from "react";
import { View, Text, Image, Platform } from "react-native";

import StyleSheet from "../../../utils/styleSheet";
import Header from "../../../components/header";
import StupidTouchableOpacity from "../../../components/stupidTouchableOpacity";
import { COLOR } from "../../../constants/baseStyleDefinition";
import { connect } from "react-redux";
const isandroid = Platform.OS === "android" ? true : false;
class AboutVersion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: COLOR.blackRank5 }}>
        <Header
          title="关于车况大师"
          leftArea={
            <StupidTouchableOpacity
              accessibilityLabel="btn-aboutVersionReturn"
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

        <StupidTouchableOpacity>
          <View>
            <Image
              source={require("../../../assets/login/Signin_logo_icon.png")}
              style={{
                width: 117,
                height: 111,
                alignSelf: "center",
                marginBottom: 20,
                marginTop: 20
              }}
            />
          </View>
        </StupidTouchableOpacity>

        <View>
          <Text style={styles.aboutContentTitle}>
            版本号:{global.versionNumber}(Build{global.buildVersion})
          </Text>
          <Text style={styles.aboutDescriptionTitle}>产品介绍</Text>
          <Text style={styles.aboutDescriptionContent}>
            车况大师™是国内首创的车辆标准化检测方案，借助软件工具，辅以全套检测设备、员工培训、专人运营等配套服务，帮助维保企业将方案落地
          </Text>
          <Text style={styles.aboutDescriptionTitle}>功能描述</Text>
          <Text style={styles.aboutDescriptionContent}>
            1、更新车牌扫描识别
            {"\n"}2、修复拍照不能打开闪光灯等已知bug
            {/*{"\n"}3、支持自定义基于重点检测里程的门店专项检测部位*/}
            {/*{"\n"}4、老车进店遗留问题提醒*/}
            {/*{"\n"}5、车主端报告改版*/}
            {/*{"\n"}6、接车时新增自定义车型*/}
          </Text>
        </View>
      </View>
    );
  }
}

/* StyleSheet
================================================================ */

const styles = StyleSheet.create({
  backBtn: {
    marginTop: 5
  },
  logoImgFont: {
    alignSelf: "center",
    justifyContent: "center"
  },
  aboutContentTitle: {
    marginBottom: 20,
    paddingLeft: 10,
    fontWeight: "bold",
    alignSelf: "center"
  },
  aboutDescription: {
    backgroundColor: COLOR.white,
    paddingLeft: 10
  },
  aboutDescriptionTitle: {
    fontSize: 14,
    marginTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingTop: 6,
    color: COLOR.blackRank1,
    backgroundColor: COLOR.blackRank5
  },
  aboutDescriptionContent: {
    fontSize: 12,
    paddingLeft: 8,
    backgroundColor: COLOR.white,
    paddingTop: 8,
    paddingBottom: 8,
    marginBottom: 10,
    paddingRight: 10,
    color: COLOR.blackRank2
  }
});

/* react-redux store
================================================================ */

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

/* Export
================================================================ */

module.exports = connect(mapStateToProps, mapDispatchToProps)(AboutVersion);
