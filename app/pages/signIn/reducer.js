import * as ActionTypes from "../../constants/actionTypes";

type State = {
  auth: Object,
  isSuccess: boolean,
  signInFont: string,
  signInStatus: string
};

function SignInPageReducer(
  state: State = {
    isSuccess: false
  },
  action
) {
  switch (action.type) {
    case ActionTypes.SIGNIN_INIT:
      return Object.assign({}, state, {
        isSuccess: false,
        signInFont: action.signInFont,
        signInStatus: "init"
      });
    case ActionTypes.SIGNIN_SUCCESS:
      return Object.assign({}, state, {
        isSuccess: true,
        auth: action.auth,
        signInFont: action.signInFont,
        signInStatus: "success"
      });
    case ActionTypes.SIGNIN_FAILED:
      return Object.assign({}, state, {
        isSuccess: false,
        signInFont: action.signInFont,
        signInStatus: "failed"
      });
    default:
      return state;
  }
}

export default SignInPageReducer;
