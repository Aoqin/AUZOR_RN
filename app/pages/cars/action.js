/**
 * 车辆列表页： 车辆数据
 * @params  guixiang.yi
 * @params
 *
 * */

import * as Http from "../../utils/httpUtils";
import * as Urls from "../../constants/urls";
import * as ActionTypes from "../../constants/actionTypes";

const getCarList = (dispatch, params, token) => {
  dispatch({
    type: ActionTypes.GET_CAR_LIST_INIT
  });
  Http.postRequest(dispatch, Urls.SEARCH_CARLIST_CAR_URL, params, token)
    .then(data => {
      if (data.code === "200" && data.object) {
        dispatch({
          type: ActionTypes.GET_CAR_LIST_SUCCESS,
          carData: data.object.records,
          pageNum: data.object.current,
          totalPage: data.object.pages,
          hasMore: data.object.current < data.object.total / 10
        });
      } else {
        dispatch({
          type: ActionTypes.GET_CAR_LIST_FAILED
        });
      }
    })
    .catch(error => {
      dispatch({
        type: ActionTypes.GET_CAR_LIST_FAILED,
        res_error: error
      });
    });
};

module.exports = {
  getCarList
};
