/**
 * main reducer
 * @flow
 */

import * as ActionTypes from "../../constants/actionTypes";

type State = {
  mainTab: string
};

function MainPageReducer(state: State = { mainTab: "board" }, action: Object) {
  if (action.type === ActionTypes.SELECT_MAIN_TAB) {
    return Object.assign({}, state, {
      mainTab: action.tabName
    });
  } else {
    return Object.assign({}, state);
  }
}

export default MainPageReducer;
