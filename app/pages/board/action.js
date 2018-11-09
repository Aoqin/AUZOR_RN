/**
 *  action
 * @flow
 */

import * as Http from "../../utils/httpUtils";
import * as Urls from "../../constants/urls";
import * as ActionTypes from "../../constants/actionTypes";
import { Platform } from "react-native";
/**
 * 车间看板
 *
 *
 * */
const Init = (dispatch, num, key, token) => {
  dispatch({
    type: ActionTypes.GET_BOARD_INIT
  });
  let url = "";
  if (key) {
    url = Urls.GET_BOARD_DATA + num + "&key=" + key;
  } else {
    url = Urls.GET_BOARD_DATA + num;
  }
  Http.getRequest(dispatch, url, token)
    .then(data => {
      if (data.code === "200") {
        let arr = data.object;
        if (Platform.OS === "ios") {
          NSNullFomart(arr);
        }
        dispatch({
          type: ActionTypes.GET_BOARD_SUCCESS,
          carBrandData: arr.records,
          pages: arr.pages,
          num: arr.current,
          hasMore: arr.current < arr.total / 10
        });
      } else {
        dispatch({
          type: ActionTypes.GET_BOARD_FAILED
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.GET_BOARD_FAILED,
        res_error: error
      });
    });
};
const endSubmit = (dispatch, endData, token) => {
  dispatch({
    type: ActionTypes.END_BOARD_INIT
  });
  let url = "";
  url =
    Urls.END_BOARD_Task + endData.receptionId + "/comments/" + endData.comments;
  Http.putRequest(dispatch, url, {}, token)
    .then(data => {
      if (data.code === "200") {
        dispatch({
          type: ActionTypes.END_BOARD_SUCCESS,
          updateData: data.object
        });
      } else {
        dispatch({
          type: ActionTypes.END_BOARD_FAILED
        });
      }
    })
    .catch(e => {
      // console.log(e);
    });
};

function NSNullFomart(any) {
  if (any) {
    for (let attr in any) {
      if (any[attr]) {
        if (typeof any[attr] === "object") {
          NSNullFomart(any[attr]);
        }
      } else {
        any[attr] = "";
      }
    }
  }
}

module.exports = {
  Init,
  endSubmit
};
