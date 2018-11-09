
import React,{PureComponent} from "react";
import {
  View,
  ScrollView,
  Modal,
  Text,
  TextInput,
  Image,
  Platform,
  NativeModules
} from "react-native";

import StyleSheet from "../../../utils/styleSheet";
import Header from "../../../components/header";
import StupidTouchableOpacity from "../../../components/stupidTouchableOpacity";
import CommonButton from "../../../components/commonButton";
import { COLOR } from "../../../constants/baseStyleDefinition";
import { ToastShort } from "../../../utils/rootToast";
import { height, pixeled } from "../../../utils/pixel";

import ImagePicker from "react-native-image-crop-picker";

import { connect } from "react-redux";
import { uploadImgs, submitFeedBack } from "./actions";
import PreviewImage from "../../../components/previewImage";
import * as RNFS from "react-native-fs";
import Camera from "react-native-camera";
import CircleProgressBtn from "../../../components/circleProgressBtn";

const isandroid = Platform.OS === "android" ? true : false;

class FeedBack extends PureComponentß {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      isShow2: true,
      uploadImage: "../../../assets/images/addIcon.png",
      contents: "",
      telephone: "",
      modalVisible: false,
      images: {},
      isOpenCommentModal: false,
      takePhotoType: "",
      showCameraModel: false,
      torchMode: Camera.constants.TorchMode.off,
      isRecording: false,
      cameraSaving: false,
      showModal: false,
      PictureModalVisible: false,
      modified: false,
      curBase64Img: "",
      showVideoModal: false,
      uploadImgStatus: "init",
      imgUrl: "",
      imageUrlArray: []
    };
    this.tags = [];
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.uploadImgStatus !== this.props.uploadImgStatus) {
      if (nextProps.uploadImgStatus === "success") {
        let imageUrlArray = [...this.state.imageUrlArray];
        imageUrlArray.push(nextProps.imgUrl);
        this.setState({
          imageUrlArray: imageUrlArray
        });
      } else if (nextProps.uploadImgStatus === "failed") {
        ToastShort("上传图片失败，请重试");
      }
    }

    if (nextProps.submitStatus !== this.submitStatus) {
      if (nextProps.submitStatus === "success") {
        ToastShort("提交成功");
        this.props.navigation.goBack();
      }
    }
  }

  submit() {
    let contents = this.state.contents;
    let telephone = this.state.telephone;
    let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
    if (!contents) {
      ToastShort("反馈建议不能为空,请输入!");
      return;
    } else if (contents && contents.length > 200) {
      ToastShort("反馈建议不能过长!");
      return;
    }

    if (!telephone) {
      ToastShort("联系电话不能为空,请输入!");
      return;
    } else if (telephone && !reg.test(telephone)) {
      ToastShort("请输入正确的电话号码!");
      return;
    }
    let data = {};
    data.contents = contents;
    data.telephone = telephone;
    data.imageUrlArray = this.state.imageUrlArray;
    this.props.submitFeedBack(data, this.props.auth.token);
  }

  openPictureModal() {
    this.setState({
      PictureModalVisible: true
    });
  }

  closePictureModal() {
    this.setState({
      PictureModalVisible: false
    });
  }

  //停止录像11
  stopRecording() {
    if (this.state.isRecording) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false,
        showCameraModel: false,
        showVideoModal: true
      });
    }
  }
  toggleFlash() {
    if (this.state.torchMode === Camera.constants.TorchMode.off) {
      this.setState({
        torchMode: Camera.constants.TorchMode.on
      });
    } else {
      this.setState({
        torchMode: Camera.constants.TorchMode.off
      });
    }
  }

  /*选择图片，并且把选择好的图片存储在state.part里面*/
  takePhoto(type = "picker") {
    this.setState({
      PictureModalVisible: false,
      takePhotoType: "picker"
    });
    let options = {
      cropping: false,
      multiple: false,
      mediaType: "photo",
      includeBase64: true,
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 0.8
    };
    if (type === "camera") {
      NativeModules.UMNative.onEventWithParameters("choose_photo_type", {
        type: "camera"
      });
      this.setState({
        showCameraModel: true,
        cameraSaving: false,
        takePhotoType: "camera"
      });
    } else {
      NativeModules.UMNative.onEventWithParameters("choose_photo_type", {
        type: "picker"
      });
      ImagePicker.openPicker(options)
        .then(image => {
          if (image.size < 10) {
            console.log("User cancelled image picker");
          } else {
            this.setState({
              images: {
                url: image.path
              }
            });
            RNFS.readFile(image.path, "base64")
              .then(data => {
                let imgBase64 = data;
                this.setState({
                  curBase64Img: imgBase64
                });
              })
              .catch(err => {
                console.log(err);
              });
          }
          this.setState({
            showModal: true,
            modalVisible: false,
            modified: true
          });
        })
        .catch(e => console.log(e));
    }
  }

  takePicture2() {
    if (this.state.showVideoModal) {
      return;
    }
    this.camera
      .capture({
        jpegQuality: 80,
        quality: Camera.constants.CaptureQuality["720p"]
      })
      .then(image => {
        let imageData = {
          url: image.path
        };
        this.setState({
          images: imageData,
          showModal: true,
          showCameraModel: false,
          modified: true
        });
        RNFS.readFile(image.path, "base64")
          .then(data => {
            let imgBase64 = data;
            this.setState({
              curBase64Img: imgBase64
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          showCameraModel: false
        });
      });
  }

  noTakePicture() {
    this.setState({
      PictureModalVisible: false,
      showCameraModel: false
    });
  }

  backLastStep() {
    let tempState = {};
    tempState.showModal = false;
    if (this.state.takePhotoType === "camera") {
      tempState.showCameraModel = true;
    } else if (this.state.takePhotoType === "picker") {
      tempState.showCameraModel = false;
    }
    this.setState(tempState);
  }

  confirmImage(image_data) {
    this.setState({
      showModal: false,
      showCameraModel: false,
      images: image_data
    });
    let strBase64 = {
      base64Str: this.state.curBase64Img,
      fileName: image_data.uri //本地文件地址
    };
    this.props.upLoadImgs(strBase64, this.state.token);
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          title="反馈"
          leftArea={
            <StupidTouchableOpacity
              accessibilityLabel="btn-feedBackReturn"
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
        <ScrollView style={styles.itemCon}>
          <View style={styles.contentItem}>
            <Text style={styles.headXing}>*</Text>
            <Text style={styles.headText}>问题反馈</Text>
          </View>
          <View style={styles.contentItemInput}>
            <TextInput
              maxLength={200}
              style={styles.textAreaStyle}
              multiline={true}
              accessibilityLabel="txt-feedQuestion"
              androidnumberOfLines={5}
              underlineColorAndroid="transparent"
              defaultValue={this.state.contents}
              value={this.state.contents}
              placeholder="请详细描述你遇到的问题，以便我们及时为您解决..."
              onChangeText={text => {
                this.setState({ contents: text });
              }}
            />
          </View>
          <View style={styles.contentItem}>
            <Text style={styles.headText}>上传图片(提供问题截图)</Text>
          </View>
          <View style={styles.contentItemInput}>
            {this.state.imageUrlArray
              ? this.state.imageUrlArray.map((item, index) => {
                  return (
                    <View style={styles.uploadImageCon} key={"imgList" + index}>
                      <Image
                        style={styles.uploadImage}
                        source={{ uri: item }}
                      />
                    </View>
                  );
                })
              : null}
            <StupidTouchableOpacity
              accessibilityLabel="btn-addFeedImg"
              onPress={this.openPictureModal.bind(this)}
              style={styles.uploadImageCon}
            >
              <Image
                style={styles.uploadImage}
                source={require("../../../assets/images/add-img.png")}
              />
            </StupidTouchableOpacity>
          </View>
          <View style={styles.contentItem}>
            <Text style={styles.headXing}>*</Text>
            <Text style={styles.headText}>联系方式</Text>
          </View>
          <View style={styles.contentItemInput}>
            <TextInput
              style={styles.inputPhoneStyle}
              maxLength={11}
              keyboardType={"numeric"}
              accessibilityLabel="txt-feedTelephone"
              underlineColorAndroid="transparent"
              defaultValue={this.state.telephone}
              value={this.state.telephone}
              placeholder="请输入您的手机号，以便我们联系您"
              onChangeText={text => {
                this.setState({ telephone: text });
              }}
            />
          </View>
          <View style={styles.contentItem}>
            <Text style={styles.headText}>
              您也可以直接联系车况大师的<Text
                style={styles.headXing}
                accessibilityLabel="btn-feedShowModal"
                onPress={() => {
                  this.setState({ modalVisible: true });
                }}
              >
                【产品团队】
              </Text>
              ，反馈产品建议。
            </Text>
          </View>
          <View style={styles.contentBtn}>
            <CommonButton
              theme="blue"
              type="radius"
              buttonRadius={5}
              accessibilityLabel="btn-feedSubmit"
              fontSize={18}
              caption="提交"
              style={styles.btn}
              pressClick={this.submit.bind(this)}
            />
          </View>
        </ScrollView>

        <Modal
          style={styles.endModel}
          transparent={true}
          visible={this.state.modalVisible}
          accessibilityLabel="btn-feedCloseWenModal"
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}
        >
          <StupidTouchableOpacity
            style={styles.endViewCon}
            accessibilityLabel="btn-feedCloseWenxinbg"
            onPress={() => {
              this.setState({ modalVisible: false });
            }}
          >
            <View style={styles.endView}>
              <Image
                style={{
                  width: 100,
                  height: 100,
                  marginVertical: 6,
                  marginLeft: 6
                }}
                source={require("../../../assets/images/zhangyunchengweixin.png")}
              />
            </View>
          </StupidTouchableOpacity>
        </Modal>
        <View style={styles.picModalWrap}>
          <Modal
            style={{ flex: 1 }}
            transparent={true}
            accessibilityLabel="btn-feedClosePhotoModal"
            onRequestClose={() => {
              this.setState({ PictureModalVisible: false });
            }}
            visible={this.state.PictureModalVisible}
          >
            <View style={styles.picOrPhoCon}>
              <View style={styles.picOrPhoItem}>
                <StupidTouchableOpacity
                  style={styles.picOrPho}
                  accessibilityLabel="btn-feedUploadPic"
                  onPress={this.takePhoto.bind(this, "picker")}
                >
                  <Image
                    style={styles.icon}
                    source={require("../../../assets/images/fadeBack/photo.png")}
                  />
                  <Text style={styles.picOrPhoText}>相册</Text>
                </StupidTouchableOpacity>
                <StupidTouchableOpacity
                  style={styles.picOrPho}
                  accessibilityLabel="btn-feedCameraPic"
                  onPress={this.takePhoto.bind(this, "camera")}
                >
                  <Image
                    style={styles.icon}
                    source={require("../../../assets/images/fadeBack/Photography.png")}
                  />
                  <Text style={styles.picOrPhoText}>拍照</Text>
                </StupidTouchableOpacity>
              </View>
              <View style={styles.picOrPhoItemClose}>
                <StupidTouchableOpacity
                  style={styles.picOrPho}
                  accessibilityLabel="btn-feedClosePictureIcon"
                  onPress={this.closePictureModal.bind(this)}
                >
                  <Image
                    source={require("../../../assets/images/fadeBack/cancel.png")}
                  />
                </StupidTouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            style={{ flex: 1 }}
            accessibilityLabel="btn-feedCloseCameraModel"
            onRequestClose={() => {
              this.setState({ showCameraModel: false });
            }}
            visible={this.state.showCameraModel}
          >
            <Camera
              ref={cam => {
                this.camera = cam;
              }}
              style={styles.cameraWrap}
              captureTarget={Camera.constants.CaptureTarget.disk}
              aspect={Camera.constants.Aspect.fit}
              flashMode={Camera.constants.FlashMode.off}
              onFocusChanged={event => {}}
              defaultTouchToFocus
              torchMode={this.state.torchMode}
              captureQuality={Camera.constants.CaptureQuality["720p"]}
              type={Camera.constants.Type.back}
              accessibilityLabel="btn-feedCameraPicture"
            >
              {this.state.cameraSaving ? (
                <Text
                  style={{ color: "#fff", fontSize: 16, marginBottom: 150 }}
                >
                  正在保存...
                </Text>
              ) : null}

              <Text style={{ color: COLOR.primaryFontColor }}>点击拍照</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center"
                }}
              >
                <StupidTouchableOpacity
                  style={{ flex: 1 }}
                  accessibilityLabel="btn-feedNoTakePicture"
                  onPress={this.noTakePicture.bind(this)}
                >
                  <View>
                    <Image
                      style={{ width: 11, height: 18, marginLeft: 20 }}
                      source={require("../../../assets/images/-back.png")}
                    />
                  </View>
                </StupidTouchableOpacity>
                <StupidTouchableOpacity
                  style={{ flex: 1 }}
                  delayLongPress={500}
                  activeOpacity={1}
                  accessibilityLabel="btn-feedPicProcess"
                  onPress={this.takePicture2.bind(this)}
                  onPressOut={this.stopRecording.bind(this)}
                >
                  <View style={{ marginBottom: 30 }}>
                    <CircleProgressBtn
                      complete={this.stopRecording.bind(this)}
                      startTimer={this.state.isRecording}
                      delay={0}
                      time={10000}
                    />
                  </View>
                </StupidTouchableOpacity>
                <StupidTouchableOpacity
                  accessibilityLabel="btn-feedToggleFlash"
                  onPress={this.toggleFlash.bind(this)}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Image
                    source={
                      this.state.torchMode === Camera.constants.TorchMode.on
                        ? require("../../../assets/images/flash_camera_btn.png")
                        : require("../../../assets/images/flash_camera_off_btn.png")
                    }
                    style={{ height: 30, width: 24 }}
                  />
                </StupidTouchableOpacity>
              </View>
            </Camera>
          </Modal>
          {this.state.showModal ? (
            <PreviewImage
              isShow={this.state.showModal}
              accessibilityLabel="btn-feedPreviewImage"
              setShow={() => {
                this.setState({ showModal: false });
              }}
              backLastStep={this.backLastStep.bind(this)}
              isAllowEdit={true}
              confirmImage={this.confirmImage.bind(this)}
              source={{ uri: this.state.images.url }}
              tags={this.tags}
            />
          ) : null}
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
    backgroundColor: COLOR.blackRank5
  },
  itemCon: {
    flex: 1,
    flexDirection: "column"
  },
  contentItem: {
    flexDirection: "row",
    padding: 10,
    alignItems: "flex-start",
    flexWrap: "wrap"
  },
  contentItemInput: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  headXing: {
    color: COLOR.redColor,
    fontSize: 16
  },
  headText: {
    color: COLOR.blackRank0,
    fontSize: 16
  },
  textAreaStyle: {
    flex: 1,
    borderWidth: pixeled(1),
    borderColor: COLOR.defaultBorder,
    borderRadius: 4,
    padding: 5,
    textAlignVertical: "top",
    height: 100
  },
  inputPhoneStyle: {
    flex: 1,
    borderWidth: pixeled(1),
    borderColor: COLOR.defaultBorder,
    borderRadius: 4,
    padding: 5
  },
  uploadImageCon: {
    borderWidth: pixeled(1),
    borderColor: COLOR.defaultBorder,
    width: 100,
    height: 100,
    margin: 2
  },
  uploadImage: {
    width: 100,
    height: 100
  },
  contentBtn: {
    flex: 1,
    padding: 10,
    marginTop: 10
  },
  btn: {
    height: 30
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
    backgroundColor: COLOR.whiteBgColor,
    borderRadius: 5,
    padding: 20
  },
  picModalWrap: {
    // backgroundColor: COLOR.modalDoubleShadow
  },
  cameraWrap: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: COLOR.blackBgColor
  },
  picOrPhoCon: {
    flex: 1,
    backgroundColor: COLOR.modalDefaultShadow,
    flexDirection: "column"
  },
  picOrPhoItem: {
    flexDirection: "row",
    height: height / 2,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  picOrPhoItemClose: {
    flexDirection: "row",
    height: height / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  picOrPho: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  picOrPhoText: {
    color: COLOR.whiteColor
  },
  icon: {
    width: 58
  }
});

/* react-redux store
================================================================ */

const mapStateToProps = state => {
  return {
    auth: state.splashReducer.auth,
    uploadImgStatus: state.FeedBackReducer.uploadImgStatus,
    imgUrl: state.FeedBackReducer.imgUrl,
    submitStatus: state.FeedBackReducer.submitStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    upLoadImgs: (params, token) => {
      uploadImgs(dispatch, params, token);
    },
    submitFeedBack: (data, token) => {
      submitFeedBack(dispatch, data, token);
    }
  };
};

/* Export
================================================================ */

module.exports = connect(mapStateToProps, mapDispatchToProps)(FeedBack);
