import * as ActionTypes from "../../constants/actionTypes";

const initialState = {
  exitStatus: "init",
  userReception: {
    checkCount: 0,
    receptionCount: 0,
    pushCount: 0,
    workCount: 0
  },
  userReportStatus: "init"
};

export default function PersonCenterReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.USER_REPORT_INIT:
      return Object.assign({}, state, {
        userReportStatus: "init",
        userReception: {
          checkCount: 0,
          receptionCount: 0,
          pushCount: 0,
          workCount: 0
        }
      });
    case ActionTypes.USER_REPORT_SUCCESS:
      return Object.assign({}, state, {
        userReportStatus: "success",
        userReception: action.userReception
      });
    case ActionTypes.USER_REPORT_FAILED:
      return Object.assign({}, state, {
        userReportStatus: "failed",
        userReception: {
          checkCount: 0,
          receptionCount: 0,
          pushCount: 0,
          workCount: 0
        }
      });
    case ActionTypes.USER_EXIT_INIT:
      return Object.assign({}, state, {
        exitStatus: "init"
      });
    case ActionTypes.USER_EXIT_SUCCESS:
      return Object.assign({}, state, {
        exitStatus: "success"
      });
    case ActionTypes.USER_EXIT_FAILED:
      return Object.assign({}, state, {
        exitStatus: "failed"
      });
    default:
      return state;
  }
}
