import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
class RadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectIndex: this.props.selectIndex ? this.props.selectIndex : "",
      data: this.props.data ? this.props.data : []
    };
  }

  /**
   * propTypes是React内部提供的校验器,如果通过props传过的数据与之不匹配,则会抛出异常。
   *
   */
  static propTypes = {
    checkedImage: PropTypes.element,
    unCheckedImage: PropTypes.element,
    onPress: PropTypes.func.isRequired,
    selectIndex: PropTypes.string,
    data: PropTypes.array
  };
  /**
   * 如果没有通过props传过来数据,则默认的是这样
   * @type
   */
  onPress = (index, item) => {
    let array = this.state.data;
    for (let i = 0; i < array.length; i++) {
      item = array[i];
      item.choose = false;
      if (i === index) {
        item.choose = true;
      }
    }
    this.setState({ selectIndex: index });
    this.props.onPress ? this.props.onPress(index, item) : () => {};
  };

  render() {
    let newArray = this.state.data;
    return (
      <View style={[this.props.style]}>
        {newArray.map((item, index) =>
          this.renderRadioButton(
            newArray,
            item,
            this.onPress,
            index,
            this.state.selectIndex
          )
        )}
      </View>
    );
  }
  renderRadioButton(array, item, onPress, index, sexIndex) {
    let image = "";
    let selectImage = require("../assets/images/car/Selecte_icon.png");
    let defaultImage = require("../assets/images/radio.png");
    if (item.choose === true) {
      image = this.props.checkedImage ? this.props.checkedImage : selectImage;
    } else {
      image = this.props.unCheckedImage
        ? this.props.unCheckedImage
        : defaultImage;
    }
    if (sexIndex === index && sexIndex !== "") {
      image = selectImage;
    }

    return (
      <TouchableOpacity
        key={index}
        accessibilityLabel={`radio-board${index}`}
        onPress={() => {
          onPress(index, item);
        }}
        style={this.props.style}
      >
        <View style={[styles.container, this.props.conTainStyle]}>
          <Image
            style={[{ width: 20, height: 20 }, this.props.imageStyle]}
            source={image}
          />
          <Text
            style={[{ marginLeft: 15, lineHeight: 20 }, this.props.textStyle]}
          >
            {item.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

/* StyleSheet
================================================================ */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginRight: 6
  }
});

/* Export
    ================================================================ */
module.exports = RadioButton;
