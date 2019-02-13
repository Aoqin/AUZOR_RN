/**
 * 公共组件：搜索框
 * @flow
 */

"use strict";

/**
 * ==============================================================================
 * <SearchBar /> 组件
 * ------------------------------------------------------------------------------
 * @return {ReactElement}
 * @flow
 * ==============================================================================
 */

import PropTypes from "prop-types";

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Platform,
  Text,
  Image
} from "react-native";
import { COLOR } from "../constants/baseStyleDefinition";
import StupidTouchableOpacity from "./stupidTouchableOpacity";

const searchRadius = 3;
class SearchBar extends Component {
  props: {
    lightTheme?: PropTypes.bool,
    containerStyle?: PropTypes.any,
    inputWrapStyle?: PropTypes.any,
    inputStyle?: PropTypes.any,
    round?: PropTypes.bool,
    showLoadingIcon?: PropTypes.bool,
    loadingIcon?: PropTypes.object,
    clearIcon?: PropTypes.bool,
    clearTextFunc?: PropTypes.func,
    cancelBtnFunc?: PropTypes.func,
    cancelBtnFont?: PropTypes.string,
    cancelBtnStyle?: PropTypes.any
    // searchRadius?: PropTypes.number
  };

  static defaultProps = {
    placeholderTextColor: COLOR.defaultFont,
    lightTheme: false,
    round: false,
    icon: {},
    showLoadingIcon: false,
    loadingIcon: {},
    clearIcon: true,
    textAlign: "left"
    // searchRadius: 2
  };

  focus() {
    const ref = this.props.textInputRef;
    this.refs[ref].focus();
  }

  componentDidMount() {
    // this.refs[this.props.textInputRef].focus();
  }

  clearText() {
    this.props.clearText();
  }

  render() {
    const {
      containerStyle,
      inputStyle,
      lightTheme,
      inputWrapStyle,
      round,
      cancelBtnFont,
      showLoadingIcon,
      loadingIcon,
      clearIcon,
      clearTextFunc,
      cancelBtnFunc,
      cancelBtnStyle,
      /* inherited props */
      value,
      autoCapitalize,
      autoCorrect,
      autoFocus,
      blurOnSubmit,
      defaultValue,
      editable,
      keyboardType,
      maxLength,
      multiline,
      onBlur,
      onChange,
      onChangeText,
      onContentSizeChange,
      onEndEditing,
      onFocus,
      onLayout,
      onSelectionChange,
      onSubmitEditing,
      placeholder,
      placeholderTextColor,
      returnKeyType,
      secureTextEntry,
      selectTextOnFocus,
      selectionColor,
      inlineImageLeft,
      inlineImagePadding,
      numberOfLines,
      returnKeyLabel,
      clearButtonMode,
      clearTextOnFocus,
      dataDetectorTypes,
      enablesReturnKeyAutomatically,
      keyboardAppearance,
      onKeyPress,
      selectionState,
      isFocused,
      clear,
      textInputRef,
      containerRef,
      underlineColorAndroid,
      textAlign
    } = this.props;
    return (
      <View
        ref={containerRef}
        style={[
          styles.container,
          lightTheme && styles.containerLight,
          containerStyle && containerStyle
        ]}
      >
        <View
          style={[
            styles.inputWrap,
            containerStyle && containerStyle,
            inputWrapStyle && inputWrapStyle
          ]}
        >
          <View
            style={[
              styles.searchIcon,
              round && {
                borderBottomLeftRadius: Platform.OS === "ios" ? 15 : 20,
                borderTopLeftRadius: Platform.OS === "ios" ? 15 : 20
              },
              inputStyle && inputStyle,
              cancelBtnFont && { marginRight: 0 }
            ]}
          >
            <Image
              style={{ width: 20 }}
              source={require("../assets/images/search.png")}
            />
          </View>

          <TextInput
            accessibilityLabel="txt-inputSearch"
            ref={textInputRef}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            autoFocus={autoFocus}
            blurOnSubmit={blurOnSubmit}
            defaultValue={defaultValue}
            keyboardType={keyboardType}
            maxLength={maxLength}
            multiline={multiline}
            onBlur={onBlur}
            onChange={onChange}
            onChangeText={onChangeText}
            onContentSizeChange={onContentSizeChange}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
            onLayout={onLayout}
            onSelectionChange={onSelectionChange}
            onSubmitEditing={onSubmitEditing}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            textAlign={textAlign}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            selectTextOnFocus={selectTextOnFocus}
            inlineImageLeft={inlineImageLeft}
            inlineImagePadding={inlineImagePadding}
            numberOfLines={numberOfLines}
            returnKeyLabel={returnKeyLabel}
            clearButtonMode={clearButtonMode}
            clearTextOnFocus={clearTextOnFocus}
            dataDetectorTypes={dataDetectorTypes}
            enablesReturnKeyAutomatically={enablesReturnKeyAutomatically}
            keyboardAppearance={keyboardAppearance}
            onKeyPress={onKeyPress}
            selectionState={selectionState}
            editable={editable}
            isFocused={isFocused}
            clear={clear}
            selectionColor={selectionColor || COLOR.grayFontColor}
            value={value}
            underlineColorAndroid={
              underlineColorAndroid ? underlineColorAndroid : "transparent"
            }
            style={[
              styles.input,
              lightTheme && styles.inputLight,
              round && {
                borderBottomRightRadius: Platform.OS === "ios" ? 15 : 20,
                borderTopRightRadius: Platform.OS === "ios" ? 15 : 20
              },
              inputStyle && inputStyle,
              clearIcon && {
                borderBottomRightRadius: 0,
                borderTopRightRadius: 0
              }
            ]}
          />
          {clearIcon ? (
            <StupidTouchableOpacity
              style={[
                styles.clearIcon,
                cancelBtnFont && { marginRight: 0 },
                round && {
                  borderBottomRightRadius: Platform.OS === "ios" ? 15 : 20,
                  borderTopRightRadius: Platform.OS === "ios" ? 15 : 20
                },
                inputStyle && inputStyle
              ]}
              key="clear_icon"
              accessibilityLabel="btn-clearTxtIcon"
              activeOpacity={0.8}
              onPress={clearTextFunc}
            >
              <Image
                style={{ width: 20 }}
                source={require("../assets/images/clearIcon.png")}
              />
            </StupidTouchableOpacity>
          ) : null}
        </View>

        {cancelBtnFont ? (
          <StupidTouchableOpacity
            style={[
              containerStyle && containerStyle,
              {
                width: 50,
                justifyContent: "center",
                alignItems: "center"
              }
            ]}
            activeOpacity={0.8}
            accessibilityLabel="btn-clearTxt"
            key="clear_btn"
            onPress={cancelBtnFunc}
          >
            <Text style={[styles.cancelBtnFontStyle, cancelBtnStyle]}>
              {cancelBtnFont}
            </Text>
          </StupidTouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: COLOR.hintColorDanger
  },
  containerLight: {
    backgroundColor: COLOR.blackRank2,
    borderTopColor: "#e1e1e1",
    borderBottomColor: "#e1e1e1"
  },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    height: 40,
    backgroundColor: COLOR.blackRank2,
    paddingLeft: 10,
    marginRight: 10
  },
  searchIcon: {
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
    alignSelf: "center",
    backgroundColor: COLOR.white,
    justifyContent: "center"
  },
  loadingIcon: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 16,
    top: 13,
    ...Platform.select({
      android: {
        top: 17
      }
    })
  },
  input: {
    flex: 1,
    paddingLeft: 3,
    paddingRight: 5,
    overflow: "hidden",
    backgroundColor: COLOR.blackRank2,
    fontSize: 15,
    color: COLOR.defaultFont,
    borderBottomRightRadius: searchRadius,
    borderTopRightRadius: searchRadius,
    height: 30,
    ...Platform.select({
      ios: {
        height: 30
      },
      android: {
        borderWidth: 0
      }
    }),
    alignSelf: "center",
    textAlignVertical: "center"
  },
  inputLight: {
    backgroundColor: COLOR.blackRank2
  },
  clearIcon: {
    alignSelf: "center",
    backgroundColor: COLOR.white,
    height: 30,
    width: 30,
    borderBottomRightRadius: searchRadius,
    borderTopRightRadius: searchRadius,
    justifyContent: "center",
    marginRight: 0,
    ...Platform.select({
      ios: {
        height: 30
      },
      android: {}
    })
  },
  cancelBtnFontStyle: {
    color: COLOR.white
  }
});

/* Export
================================================================ */
module.exports = SearchBar;
