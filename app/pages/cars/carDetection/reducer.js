/**
 *检测记录reducer
 * @params guxiang.yi
 * @params
 */
import * as ActionTypes from "../../../constants/actionTypes";

const initialState = {
  detectionStatus: "init",
  pageLoading: false,
  detectionData: []
};

export default function CarDetectionReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_CAR_DETECTION_INIT:
      return Object.assign({}, state, {
        detectionStatus: "init",
        pageLoading: true,
        detectionData: []
      });
    case ActionTypes.GET_CAR_DETECTION_SUCCESS:
      return Object.assign({}, state, {
        detectionStatus: "success",
        pageLoading: false,
        detectionData: action.detectionData
      });
    case ActionTypes.GET_CAR_DETECTION_FAILED:
      return Object.assign({}, state, {
        detectionStatus: "failed",
        pageLoading: false,
        detectionData: []
      });
    default:
      return state;
  }
}
