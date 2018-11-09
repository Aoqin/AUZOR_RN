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
import { ToastShort } from "../../components/toast";
import RealmStorage from "../../utils/realmStorage";
let realmStorage = RealmStorage.getInstance();

const doLogin = (dispatch, tel, password) => {
  dispatch({
    type: ActionTypes.LOGIN_INIT,
    loginStatus: true,
    loginFont: "正在登录中..."
  });
  realmStorage.remove("loginAuth");
  Http.postRequest(dispatch, Urls.LOGIN, { tel, password }, "")
    .then(data => {
      if (data.code === "200") {
        let userInfo = {
          dateAdded: data.object.dateAdded ? data.object.dateAdded : "",
          dateModifyed: data.object.dateModifyed
            ? data.object.dateModifyed
            : "",
          id: data.object.id ? data.object.id : "",
          mobile: data.object.mobile ? data.object.mobile : "",
          name: data.object.name ? data.object.name : "",
          sex: data.object.sex ? data.object.sex : "",
          status: data.object.status ? data.object.status : "",
          token: data.object.token ? data.object.token : "",
          storeName: data.object.storeName ? data.object.storeName : "",
          storeId: data.object.storeId ? data.object.storeId : ""
        };
        realmStorage
          .save("loginAuth", userInfo)
          .then(saved => {
            if (saved) {
              dispatch({
                type: ActionTypes.LOGIN_SUCCESS,
                isSuccess: true,
                auth: userInfo,
                loginStatus: true
              });
            }
          })
          .catch(error => {
            console.log(error);
            dispatch({
              type: ActionTypes.LOGIN_FAILED,
              isSuccess: false,
              loginStatus: false,
              loginFont: "登录"
            });
          });
        return true;
      } else if (data.code === "409") {
        ToastShort("手机号或密码不正确");
      } else if (data.code === "401") {
        ToastShort("该用户已被禁用");
      } else if (data.code === "205") {
        ToastShort("该用户还没有加入门店");
      } else {
        // ToastShort("登录失败");
      }
      dispatch({
        type: ActionTypes.LOGIN_FAILED,
        isSuccess: false,
        loginStatus: false,
        loginFont: "登录"
      });
    })
    .catch(error => {
      if (typeof error === "string") {
        ToastShort(error);
      }
      dispatch({
        type: ActionTypes.LOGIN_FAILED,
        isSuccess: false,
        loginStatus: false,
        loginFont: "登 录"
      });
    });
};

// export default doLogin;
module.exports = {
  doLogin
};
