/**
 * 车辆详情页
 * @params guixiang.yi
 * @params
 *
 * */

import * as Http from "../../../utils/httpUtils";
import * as Urls from "../../../constants/urls";
import * as ActionTypes from "../../../constants/actionTypes";

const getCarDetailData = (dispatch, receptionId, token) => {
  dispatch({
    type: ActionTypes.GET_CAR_DETAIL_INIT
  });
  let url = Urls.GET_CAR_DETAIL + receptionId;
  Http.getRequest(dispatch, url, token)
    .then(data => {
      if (data.code === "200") {
        dispatch({
          type: ActionTypes.GET_CAR_DETAIL_SUCCESS,
          carDetalData: data.object
        });
      } else {
        dispatch({
          type: ActionTypes.GET_CAR_DETAIL_FAILED
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.GET_CAR_DETAIL_FAILED
      });
    });
};

const remaProblemsData = (dispatch, carId, token) => {
  dispatch({
    type: ActionTypes.GET_CAR_REMAINS_INIT
  });
  let url = Urls.GET_CAR_REMAINS + carId;
  Http.getRequestNoTips(dispatch, url, token)
    .then(data => {
      if (data.code === "200") {
        dispatch({
          type: ActionTypes.GET_CAR_REMAINS_SUCCESS,
          remainsData: data.object
        });
      } else {
        dispatch({
          type: ActionTypes.GET_CAR_REMAINS_FAILED
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.GET_CAR_REMAINS_FAILED
      });
    });
};
/**
 * 详情页：拿接车ID去获取checkID
 *
 * */
const getDetailCheckId = (dispatch, pickId, token) => {
  dispatch({
    type: ActionTypes.GET_CHECK_ID_DETAIL_INIT
  });
  let checkUrl = Urls.GET_CAR_CHECKID + pickId;
  Http.getRequest(dispatch, checkUrl, token)
    .then(data => {
      if (data.code === "200") {
        dispatch({
          type: ActionTypes.GET_CHECK_ID_DETAIL_SUCCESS,
          DetailCheckId: data.object
        });
      } else {
        dispatch({
          type: ActionTypes.GET_CHECK_ID_DETAIL_FAILED
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.GET_CHECK_ID_DETAIL_FAILED
      });
    });
};

module.exports = {
  getCarDetailData,
  remaProblemsData,
  getDetailCheckId
};
