/**
 * 检测记录-action
 * @params  guixiang.yi
 * @params
 */

import * as Http from "../../../utils/httpUtils";
import * as Urls from "../../../constants/urls";
import * as ActionTypes from "../../../constants/actionTypes";
/*检测记录详情页的车辆基本信息*/
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
/*确认施工页的基础信息*/
const getDetectionDetailData = (dispatch, checkId, token) => {
  dispatch({
    type: ActionTypes.GET_CAR_DETECTION_DETAIL_INIT
  });
  let url = Urls.GET_DETECTION_DETAIL_URL + checkId;
  Http.getRequest(dispatch, url, token)
    .then(data => {
      if (data.code === "200") {
        dispatch({
          type: ActionTypes.GET_CAR_DETECTION_DETAIL_SUCCESS,
          detectionData: data.object
        });
      } else {
        dispatch({
          type: ActionTypes.GET_CAR_DETECTION_DETAIL_FAILED
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.GET_CAR_DETECTION_DETAIL_FAILED
      });
    });
};

/*确认施工页的点击展开信息*/
const getExpandData = (dispatch, partId, checkId, token) => {
  dispatch({
    type: ActionTypes.GET_CONSTRUCTION_MORE_INIT
  });
  let url = Urls.GET_BASIC_MORE_URL + partId + "/byChecksId/" + checkId;
  Http.getRequest(dispatch, url, token)
    .then(data => {
      if (data.code === "200") {
        dispatch({
          type: ActionTypes.GET_CONSTRUCTION_MORE_SUCCESS,
          expandData: data.object,
          partId: partId
        });
      } else {
        dispatch({
          type: ActionTypes.GET_CONSTRUCTION_MORE_FAILED,
          partId: ""
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.GET_CONSTRUCTION_MORE_FAILED,
        partId: ""
      });
    });
};
/**
 * 录入报告：拿接车ID去获取checkID
 *
 * */
const getDeteCheckId = (dispatch, pickId, token) => {
  dispatch({
    type: ActionTypes.GET_CAR_DETECTION_CHECK_INIT
  });
  let checkUrl = Urls.GET_REPORT_CHECKID + pickId;
  Http.getRequest(dispatch, checkUrl, token)
    .then(data => {
      if (data.code === "200") {
        dispatch({
          type: ActionTypes.GET_CAR_DETECTION_CHECK_SUCCESS,
          detecheckId: data.object
        });
      } else {
        dispatch({
          type: ActionTypes.GET_CAR_DETECTION_CHECK_FAILED
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.GET_CAR_DETECTION_CHECK_FAILED
      });
    });
};

/*获取是否有保养手册*/
const getDetectionManual = (dispatch, code, token) => {
  dispatch({
    type: ActionTypes.GET_CAR_DETECTION_MANUAL_INIT
  });
  let url = Urls.GET_MANUAL_INFO_URL + code;
  Http.getRequestNoTips(dispatch, url, token)
    .then(data => {
      if (data.code === "200" || data.code === "204") {
        dispatch({
          type: ActionTypes.GET_CAR_DETECTION_MANUAL_SUCCESS,
          detectManualData: data.object
        });
      } else {
        dispatch({
          type: ActionTypes.GET_CAR_DETECTION_MANUAL_FAILED
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.GET_CAR_DETECTION_MANUAL_FAILED
      });
    });
};
/*统计代码*/
const getClickStatist = (dispatch, receptionId, token) => {
  dispatch({
    type: ActionTypes.GET_SENT_REPORT_STATIST_INIT
  });
  let url = Urls.GET_SENT_REPORT_STATIST_URL + receptionId;
  Http.getRequestNoTips(dispatch, url, token)
    .then(data => {
      if (data.code === "200" || data.code === "204") {
        dispatch({
          type: ActionTypes.GET_SENT_REPORT_STATIST_SUCCESS,
          statistDate: data.object
        });
      } else {
        dispatch({
          type: ActionTypes.GET_SENT_REPORT_STATIST_FAILED
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.GET_SENT_REPORT_STATIST_FAILED
      });
    });
};

module.exports = {
  getCarDetailData,
  getDeteCheckId,
  getDetectionDetailData,
  getExpandData,
  getDetectionManual,
  getClickStatist
};
