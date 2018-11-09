/**
 *接车列表详情页reducer
 * @params guixiang.yi
 * @params
 *
 */
import * as ActionTypes from "../../../constants/actionTypes";

const initialState = {
  remainsStatus: "init",
  pageLoading: true,
  remainsData: [
    {
      partName: "",
      id: "",
      resultStatus: ""
    }
  ]
};

export default function CarDetailReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_CAR_REMAINS_INIT:
      return Object.assign({}, state, {
        remainsStatus: "init",
        remainsData: [
          {
            partName: "",
            id: "",
            resultStatus: ""
          }
        ]
      });
    case ActionTypes.GET_CAR_REMAINS_SUCCESS:
      return Object.assign({}, state, {
        remainsStatus: "success",
        remainsData: action.remainsData
      });
    case ActionTypes.GET_CAR_REMAINS_FAILED:
      return Object.assign({}, state, {
        remainsStatus: "failed",
        remainsData: [
          {
            partName: "",
            id: "",
            resultStatus: ""
          }
        ]
      });
    case ActionTypes.GET_CAR_DETAIL_INIT:
      return Object.assign({}, state, {
        detailStatus: "int",
        carDetalData: {},
        pageLoading: true,
        isNoDataTip: false
      });
    case ActionTypes.GET_CAR_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        detailStatus: "success",
        carDetalData: action.carDetalData,
        pageLoading: false,
        isNoDataTip: false
      });
    case ActionTypes.GET_CAR_DETAIL_FAILED:
      return Object.assign({}, state, {
        detailStatus: "failed",
        carDetalData: {},
        pageLoading: false,
        isNoDataTip: true
      });
    case ActionTypes.GET_CHECK_ID_DETAIL_INIT:
      return Object.assign({}, state, {
        detailCheckStatus: "init"
      });
    case ActionTypes.GET_CHECK_ID_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        detailCheckStatus: "success",
        DetailCheckId: action.DetailCheckId
      });
    case ActionTypes.GET_CHECK_ID_DETAIL_FAILED:
      return Object.assign({}, state, {
        detailCheckStatus: "failed"
      });
    default:
      return state;
  }
}
