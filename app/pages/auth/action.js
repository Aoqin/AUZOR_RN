/**
 * splash action
 * @flow
 */
import * as ActionTypes from "../../constants/actionTypes";
import RealmStorage from "../../utils/realmStorage";
import * as Http from "../../utils/httpUtils";
import * as Urls from "../../constants/urls";

const realmStorage = RealmStorage.getInstance();
/**
 * 查找本地账号缓存信息
 * @param {*} dispatch 
 */
const checkLocalUser = async (dispatch) => {
  console.log('checkLocalUser');
  try {
    //#region 
    await realmStorage.remove("loginAuth");
    //end

    const data = await realmStorage.load("loginAuth");
    const user = data[0];
    if (user) {
      let auth = { ...user };
      dispatch({
        type: ActionTypes.LOAD_LOCAL_USER_SUCCESS,
        auth: auth
      });
    } else {
      dispatch({
        type: ActionTypes.LOAD_LOCAL_USER_FAILED
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.LOAD_LOCAL_USER_FAILED
    });
  }
};

/**
 * 
 * @param {*} dispatch 
 */
const loadLocalRemoteConfig = async (dispatch) => {
  try {
    const data = await realmStorage.load("remoteConfig");
    getJson(dispatch);
    if (storage) {
      let remoteConfig = JSON.parse(storage.config);
      dispatch({
        type: ActionTypes.CHECK_APP_UPDATE,
        remoteConfig: remoteConfig
      });
    }
  } catch (error) {

  }
};

/**
 * 获取版本信息
 * @param {*} dispatch 
 */
const getJson = async (dispatch) => {
  let url = Urls.GET_JSON;
  dispatch({
    type: ActionTypes.GET_JSON_INIT,
    data: {}
  });
  try {
    const data = await Http.getJsonData(dispatch, url);
    if (data) {
      dispatch({
        type: ActionTypes.GET_JSON_SUCCESS,
        data: data
      });
    } else {
      dispatch({
        type: ActionTypes.GET_JSON_FAILED,
        data: {}
      });
    }
  } catch (error) {
    dispatch({
      type: ActionTypes.GET_JSON_FAILED,
      data: {}
    });
  }
};

module.exports = {
  checkLocalUser,
  loadLocalRemoteConfig,
  getJson
};
