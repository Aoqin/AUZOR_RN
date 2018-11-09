import { AppNavigator } from "../../../appNavigator";
import * as ActionType from "../../../constants/actionTypes";
import { NavigationActions } from "react-navigation";

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Splash")
);
export default function NavReducer(state = initialState, action) {
  let nextState: Object;
  let newAction: string;
  let newState: Object;
  switch (action.type) {
    case ActionType.SUBSCRIPTION_PAGE_RESULT:
      nextState = Object.assign({}, state);
      if (typeof state.routes[state.index].waitPageResult !== "undefined") {
        nextState.routes[state.index].waitPageResult[action.path] = action.func;
      } else {
        let waitPage = {};
        waitPage[action.path] = action.func;
        nextState.routes[state.index].waitPageResult = waitPage;
      }
      return nextState;
    case ActionType.SET_PAGE_RESULT:
      nextState = Object.assign({}, state);
      let nowRouteName = state.routes[state.index].routeName;
      for (let routeIndex in nextState.routes) {
        if (
          typeof nextState.routes[routeIndex].waitPageResult !== "undefined" &&
          typeof nextState.routes[routeIndex].waitPageResult[nowRouteName] ===
            "function"
        ) {
          if (
            typeof nextState.routes[routeIndex].pageResultData !== "undefined"
          ) {
            nextState.routes[routeIndex].pageResultData[nowRouteName] =
              action.data;
          } else {
            let resultObj = {};
            resultObj[nowRouteName] = action.data;
            nextState.routes[routeIndex].pageResultData = resultObj;
          }
        }
      }
      return nextState;

    case ActionType.CANCEL_SUBSCRIPTION_PAGE_RESULT:
      nextState = Object.assign({}, state);

      for (let i in nextState.routes) {
        if (nextState.routes[i].routeName === action.routeName) {
          delete nextState.routes[i].pageResultData;
        }
      }
      return nextState;
    case ActionType.NAV_REMOVE_PAGES_BETWEEN:
      newState = { index: state.index, routes: [] };
      let pageFromFound = false;
      let pageToFound = false;
      state.routes.map((route, index) => {
        if (route.routeName === action.pathTo && pageFromFound) {
          pageToFound = true;
        }
        if (!pageFromFound) {
          newState.routes.push(route);
        } else if (pageFromFound && pageToFound) {
          newState.routes.push(route);
        } else {
          --newState.index;
        }
        if (route.routeName === action.pathFrom) {
          pageFromFound = true;
        }
      });
      return newState;
    case ActionType.RESET_THIS_PAGE_TO:
      newAction = NavigationActions.navigate({
        routeName: action.path,
        params: action.params
      });
      newState = Object.assign({}, state);
      newState.index = newState.index - 1;
      newState.routes.pop();
      nextState = AppNavigator.router.getStateForAction(newAction, newState);
      return nextState;
    case "Navigation/COMPLETE_TRANSITION":
      let route = state.routes[state.index];
      if (
        typeof route !== "undefined" &&
        typeof route.waitPageResult !== "undefined"
      ) {
        if (typeof route.pageResultData !== "undefined") {
          for (let k in route.pageResultData) {
            if (typeof route.waitPageResult[k] === "function") {
              let data = Object.assign({}, route.pageResultData[k]);
              setTimeout(() => {
                route.waitPageResult[k](data);
              }, 0);
            }
          }
          nextState = Object.assign({}, state);
          for (let i in nextState.routes) {
            if (nextState.routes[i].routeName === route.routeName) {
              delete nextState.routes[i].pageResultData;
            }
          }
          return nextState;
        }
      }
      return state;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }
  return nextState || state;
}
