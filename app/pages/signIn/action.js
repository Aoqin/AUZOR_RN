/**
 * login action
 *  * 用户登录
 * @params: number         手机号码
 * @params: password       密码
 *
 * 登录成功之后存储用户相关的信息到本地存储
 * @flow
 */

import * as ActionTypes from "../../constants/actionTypes";
import * as Http from "../../utils/httpUtils";
import * as Urls from "../../constants/urls";

import RealmStorage from "../../utils/realmStorage";
let realmStorage = RealmStorage.getInstance();

const doLogin = async (dispatch, tel, password) => {
  dispatch({
    type: ActionTypes.SIGNIN_INIT,
    loginStatus: true,
    loginFont: "正在登录中..."
  });
  realmStorage.remove("loginAuth");
  try {
    const result = await Http.postRequest(dispatch, Urls.LOGIN, { tel, password }, "");
    console.log(result);
    if (result.code === "200") {
      let userInfo = {
        dateAdded: result.object.dateAdded ? result.object.dateAdded : "",
        dateModifyed: result.object.dateModifyed
          ? result.object.dateModifyed
          : "",
        id: result.object.id ? result.object.id : "",
        mobile: result.object.mobile ? result.object.mobile : "",
        name: result.object.name ? result.object.name : "",
        sex: result.object.sex ? result.object.sex : "",
        status: result.object.status ? result.object.status : "",
        token: result.object.token ? result.object.token : "",
        storeName: result.object.storeName ? result.object.storeName : "",
        storeId: result.object.storeId ? result.object.storeId : ""
      };
      const saved = await realmStorage.save("loginAuth", userInfo);
      console.log(saved);
      if (saved) {
        dispatch({
          type: ActionTypes.SIGNIN_SUCCESS,
          isSuccess: true,
          auth: userInfo,
          loginStatus: true
        });
      }
    } else {
      dispatch({
        type: ActionTypes.SIGNIN_FAILED,
        isSuccess: false,
        loginStatus: false,
        loginFont: "登 录"
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.SIGNIN_FAILED,
      isSuccess: false,
      loginStatus: false,
      loginFont: "登 录"
    });
  }
};

// export default doLogin;
module.exports = {
  doLogin
};
