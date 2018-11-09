/**
 * 检测记录
 * @params guxiang.yi
 * @params
 *
 * */

import * as Http from "../../../utils/httpUtils";
import * as Urls from "../../../constants/urls";
import * as ActionTypes from "../../../constants/actionTypes";

const getCarDetection = (dispatch, carId, token) => {
  dispatch({
    type: ActionTypes.GET_CAR_DETECTION_INIT
  });
  let url = Urls.GET_DETECTION_SHOW_URL + carId;
  Http.getRequest(dispatch, url, token)
    .then(data => {
      if (data.code === "200") {
        dispatch({
          type: ActionTypes.GET_CAR_DETECTION_SUCCESS,
          detectionData: data.object
        });
      } else {
        dispatch({
          type: ActionTypes.GET_CAR_DETECTION_FAILED
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.GET_CAR_DETECTION_FAILED
      });
    });
};
module.exports = {
  getCarDetection
};
