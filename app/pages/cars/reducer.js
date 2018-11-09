/**
 * 车辆列表页reducer
 * @params  guixiang.yi
 * @params
 *
 * */
import * as ActionTypes from "../../constants/actionTypes";

const initialState = {
  status: "init",
  pageLoading: true,
  pageNum: 1,
  carData: [],
  hasMore: true
};

export default function CarReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_CAR_LIST_INIT:
      return Object.assign({}, state, {
        status: "init",
        pageLoading: true
      });
    case ActionTypes.GET_CAR_LIST_SUCCESS:
      if (action.pageNum === 1) {
        return Object.assign({}, state, {
          carData: action.carData,
          pageLoading: false,
          status: "success",
          pageNum: action.pageNum,
          hasMore: action.hasMore
        });
      } else {
        return Object.assign({}, state, {
          carData: [...state.carData, ...action.carData],
          pageLoading: false,
          status: "success",
          pageNum: action.pageNum,
          hasMore: action.hasMore
        });
      }
    case ActionTypes.GET_CAR_LIST_FAILED:
      return Object.assign({}, state, {
        pageLoading: false,
        status: "failed"
      });
    default:
      return state;
  }
}
