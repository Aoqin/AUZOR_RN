/**
 * personCenter action
 *  * 个人中心： 今日数据
 * @params startTime ：开始时间
 * @params endTime ：结束时间
 * @flow
 */

import * as Http from "../../utils/httpUtils";
import * as Urls from "../../constants/urls";
import * as ActionTypes from "../../constants/actionTypes";
import RealmStorage from "../../utils/realmStorage";

const DoShowData = (dispatch, startTime, endTime, token) => {
  dispatch({
    type: ActionTypes.USER_REPORT_INIT
  });
  let url = Urls.USER_REPORT + startTime + "/byEndDate/" + endTime;
  Http.getRequest(dispatch, url, token)
    .then(data => {
      if (data.code === "200") {
        dispatch({
          type: ActionTypes.USER_REPORT_SUCCESS,
          userReception: data.object
        });
      } else {
        dispatch({
          type: ActionTypes.USER_REPORT_FAILED
        });
      }
    })
    .catch(e => {
      dispatch({
        type: ActionTypes.USER_REPORT_FAILED
      });
    });
};

/**
 * 个人中心： 退出登录,并且清除本地存储（RealmStorage）
 *
 * */

const exitLogin = (dispatch, token) => {
  dispatch({
    type: ActionTypes.USER_EXIT_INIT
  });
  let url = Urls.USER_EXIT;
  Http.getRequest(dispatch, url, token)
    .then(data => {
      if (data.code === "200") {
        RealmStorage.getInstance().close();
        dispatch({
          type: ActionTypes.USER_EXIT_SUCCESS
        });
      } else {
        dispatch({
          type: ActionTypes.USER_EXIT_FAILED
        });
      }
    })
    .catch(e => {
      dispatch({
        type: ActionTypes.USER_EXIT_FAILED
      });
    });
};

module.exports = {
  DoShowData,
  exitLogin
};
