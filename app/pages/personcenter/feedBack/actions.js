/**
 *  action
 *  * 个人中心： 反馈信息
 * @flow
 */

import * as Http from "../../../utils/httpUtils";
import * as Urls from "../../../constants/urls";
import * as ActionTypes from "../../../constants/actionTypes";

const uploadImgs = (dispatch, params, token) => {
  dispatch({
    type: ActionTypes.FEEDBACK_IMG_INIT
  });
  dispatch({
    type: ActionTypes.FEEDBACK_SUBMIT_INIT
  });
  let ary = params.fileName.split("/");
  let strBase64 = {
    base64Str: params.base64Str,
    fileName: ary[ary.length - 1]
  };
  Http.uploadImageReport(dispatch, Urls.FORM_UPLOADER_IMAGE, strBase64, token)
    .then(data => {
      if (data.code === "200" && data.object) {
        dispatch({
          type: ActionTypes.FEEDBACK_IMG_SUCCESS,
          imgUrl: data.object
        });
      } else {
        dispatch({
          type: ActionTypes.FEEDBACK_IMG_FAILED
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.FEEDBACK_IMG_FAILED
      });
    });
};
const submitFeedBack = (dispatch, data, token) => {
  dispatch({
    type: ActionTypes.FEEDBACK_SUBMIT_INIT
  });
  let url = Urls.FEEDBACK_SUBMIT;
  Http.postRequest(dispatch, url, data, token)
    .then(data => {
      if (data.code === "200") {
        dispatch({
          type: ActionTypes.FEEDBACK_SUBMIT_SUCCESS
        });
      } else {
        dispatch({
          type: ActionTypes.FEEDBACK_SUBMIT_FAILED
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.FEEDBACK_SUBMIT_FAILED
      });
    });
};

module.exports = {
  uploadImgs,
  submitFeedBack
};
