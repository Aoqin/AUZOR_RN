import * as ActionTypes from "../../../constants/actionTypes";

const initialState = {
  resetStatus: "init"
};

export default function ResetPasswordReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.RESET_PASSWORD_INIT:
      return Object.assign({}, state, {
        resetStatus: "init"
      });
    case ActionTypes.RESET_PASSWORD_SUCCESS:
      return Object.assign({}, state, {
        resetStatus: "success"
      });
    case ActionTypes.RESET_PASSWORD_FAILED:
      return Object.assign({}, state, {
        resetStatus: "failed"
      });
    default:
      return state;
  }
}
