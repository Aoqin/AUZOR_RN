/**
 * pickup action
 *  * 个人中心： 修改密码
 * @params: password              新密码
 * @params: confirmPassword       确认新密码
 * @flow
 */

import * as Http from "../../../utils/httpUtils";
import * as Urls from "../../../constants/urls";
import * as ActionTypes from "../../../constants/actionTypes";

const DoResetPassword = (dispatch, password, token) => {
  dispatch({
    type: ActionTypes.RESET_PASSWORD_INIT
  });
  let url = Urls.RESET_PASSWORD;
  Http.postRequest(dispatch, url, { newPassword: password }, token)
    .then(data => {
      if (data.code === "200") {
        dispatch({
          type: ActionTypes.RESET_PASSWORD_SUCCESS
        });
      } else {
        dispatch({
          type: ActionTypes.RESET_PASSWORD_FAILED
        });
      }
    })
    .catch(e => {
      dispatch({
        type: ActionTypes.RESET_PASSWORD_FAILED
      });
    });
};

module.exports = {
  DoResetPassword
};
