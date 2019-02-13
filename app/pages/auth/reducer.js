import * as ActionTypes from "../../constants/actionTypes";

type State = {
  auth: Object,
  isLogin: string,
  need_update_state: number, // 状态值： 0-不用更新 1-可选更新 2-必须更新
  loading: boolean,
  remoteConfig: Object,
  versionState: Object
};

function AuthLoadingReducer(
  state: State = {
    auth: { id: null, name: null },
    need_update_state: 0,
    isLogin: "init",
    loading: false,
    remoteConfig: {},
    versionState: {},
    getJsonState: "init",
    jsonData: []
  },
  action: Object
) {
  switch (action.type) {
    case ActionTypes.LOAD_LOCAL_USER_SUCCESS:
      return Object.assign({}, state, {
        auth: action.auth,
        isLogin: "success"
      });
    case ActionTypes.LOAD_LOCAL_USER_FAILED:
      return Object.assign({}, state, {
        isLogin: "failed",
        auth: { id: null, name: null }
      });
    case ActionTypes.GET_JSON_INIT:
      return Object.assign({}, state, {
        getJsonState: "init",
        jsonData: {}
      });
    case ActionTypes.GET_JSON_SUCCESS:
      console.log('GET_JSON_SUCCESS');
      console.log(action.data);
      return Object.assign({}, state, {
        getJsonState: "success",
        jsonData: action.data
      });
    case ActionTypes.GET_JSON_FAILED:
      return Object.assign({}, state, {
        getJsonState: "failed",
        jsonData: {}
      });
    case ActionTypes.CHECK_APP_UPDATE:
      return Object.assign({}, state, {
        remoteConfig: action.remoteConfig
      });
    default:
      return state;
  }
}

export default AuthLoadingReducer;
