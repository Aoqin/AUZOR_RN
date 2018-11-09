/**
 *检测详情reducer
 * @params guixiang.yi
 * @params
 *
 */
import * as ActionTypes from "../../../constants/actionTypes";

const initialState = {};

export default function DetectionDetailReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_CAR_DETAIL_INIT:
      return Object.assign({}, state, {
        detailStatus: "int",
        carDetalData: {},
        pageLoading: true
      });
    case ActionTypes.GET_CAR_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        detailStatus: "success",
        carDetalData: action.carDetalData,
        pageLoading: false
      });
    case ActionTypes.GET_CAR_DETAIL_FAILED:
      return Object.assign({}, state, {
        detailStatus: "failed",
        carDetalData: {},
        pageLoading: false
      });
    case ActionTypes.GET_CAR_DETECTION_DETAIL_INIT:
      return Object.assign({}, state, {
        detectionStatus: "failed",
        detectionData: [],
        detectionLoading: true
      });
    case ActionTypes.GET_CAR_DETECTION_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        detectionStatus: "success",
        detectionData: action.detectionData,
        detectionLoading: false
      });
    case ActionTypes.GET_CAR_DETECTION_DETAIL_FAILED:
      return Object.assign({}, state, {
        detectionStatus: "failed",
        detectionData: [],
        detectionLoading: false
      });
    case ActionTypes.GET_CONSTRUCTION_MORE_INIT:
      return Object.assign({}, state, {
        expandStatus: "failed",
        expandLoading: true,
        expandData: {}
      });
    case ActionTypes.GET_CONSTRUCTION_MORE_SUCCESS:
      return Object.assign({}, state, {
        expandStatus: "success",
        expandLoading: false,
        expandData: action.expandData,
        getPartId: action.partId
      });
    case ActionTypes.GET_CONSTRUCTION_MORE_FAILED:
      return Object.assign({}, state, {
        expandStatus: "failed",
        expandData: {},
        expandLoading: false,
        getPartId: action.partId
      });
    case ActionTypes.GET_CAR_DETECTION_CHECK_INIT:
      return Object.assign({}, state, {
        deteCheckStatus: "init"
      });
    case ActionTypes.GET_CAR_DETECTION_CHECK_SUCCESS:
      return Object.assign({}, state, {
        deteCheckStatus: "success",
        detecheckId: action.detecheckId
      });
    case ActionTypes.GET_CAR_DETECTION_CHECK_FAILED:
      return Object.assign({}, state, {
        deteCheckStatus: "failed"
      });
    case ActionTypes.GET_CAR_DETECTION_MANUAL_INIT:
      return Object.assign({}, state, {
        detectManualStatus: "failed",
        detectManualData: ""
      });
    case ActionTypes.GET_CAR_DETECTION_MANUAL_SUCCESS:
      return Object.assign({}, state, {
        detectManualStatus: "success",
        detectManualData: action.detectManualData
      });
    case ActionTypes.GET_CAR_DETECTION_MANUAL_FAILED:
      return Object.assign({}, state, {
        detectManualStatus: "failed",
        detectManualData: ""
      });
    case ActionTypes.GET_SENT_REPORT_STATIST_INIT:
      return Object.assign({}, state, {
        statistStatus: "failed",
        statistDate: ""
      });
    case ActionTypes.GET_SENT_REPORT_STATIST_SUCCESS:
      return Object.assign({}, state, {
        statistStatus: "success",
        statistDate: action.statistDate
      });
    case ActionTypes.GET_SENT_REPORT_STATIST_FAILED:
      return Object.assign({}, state, {
        statistStatus: "failed",
        statistDate: ""
      });
    default:
      return state;
  }
}
