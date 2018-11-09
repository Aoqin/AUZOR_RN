
import * as ActionType from "../../../constants/actionTypes";

//移除某两个页面之间的所有页面
const removePagesBetween = (dispatch, pathFrom, pathTo) => {
  dispatch({
    type: ActionType.NAV_REMOVE_PAGES_BETWEEN,
    pathFrom: pathFrom,
    pathTo: pathTo
  });
};

//用新页面直接替换当前页面
const resetThisPageTo = (dispatch, data) => {
  dispatch({
    type: ActionType.RESET_THIS_PAGE_TO,
    path: data.routeName,
    params: data.params
  });
};

//订阅某个页面的result
const subscriptionPageResult = (dispatch, path, func) => {
  dispatch({
    type: ActionType.SUBSCRIPTION_PAGE_RESULT,
    path: path,
    func: func
  });
};

//设置结果
const setPageResult = (dispatch, data) => {
  dispatch({
    type: ActionType.SET_PAGE_RESULT,
    data: data
  });
};

//取消订阅
const cancelSubscriptionPageResult = (dispatch, routeName) => {
  dispatch({
    type: ActionType.CANCEL_SUBSCRIPTION_PAGE_RESULT,
    routeName: routeName
  });
};

module.exports = {
  removePagesBetween,
  resetThisPageTo,
  subscriptionPageResult,
  setPageResult,
  cancelSubscriptionPageResult
};
