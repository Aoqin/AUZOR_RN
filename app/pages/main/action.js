/**
 * main action
 * @flow
 */
import * as ActionType from "../../constants/actionTypes";
import RealmStorage from "../../utils/realmStorage";

let realmStorage = RealmStorage.getInstance();

function selectMainTab(dispatch, tabName) {
  dispatch({
    type: ActionType.SELECT_MAIN_TAB,
    tabName: tabName
  });
}

module.exports = {
  selectMainTab
};
