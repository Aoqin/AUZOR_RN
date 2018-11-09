import * as ActionTypes from "../../constants/actionTypes";

type State = {
  auth: Object,
  isSuccess: boolean,
  loginFont: string,
  loginStatus: string
};

function loginPageReducer(
  state: State = {
    isSuccess: false
  },
  action
) {
  switch (action.type) {
    case ActionTypes.LOGIN_INIT:
      return Object.assign({}, state, {
        isSuccess: false,
        loginFont: action.loginFont,
        loginStatus: "init"
      });
    case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isSuccess: true,
        auth: action.auth,
        loginFont: action.loginFont,
        loginStatus: "success"
      });
    case ActionTypes.LOGIN_FAILED:
      return Object.assign({}, state, {
        isSuccess: false,
        loginFont: action.loginFont,
        loginStatus: "failed"
      });
    default:
      return state;
  }
}

export default loginPageReducer;
