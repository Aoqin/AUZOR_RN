import { combineReducers } from "redux";
// import LoginPageReducer from '../pages/login/reducer';
import AuthLoadingReducer from '../pages/auth/reducer';
import BoardPageReducer from '../pages/board/reducer';
import HomePageReducer from '../pages/home/reducer';
import PersonalPageReducer from '../pages/personal/reducer';
import RecordsPageReducer from '../pages/records/reducer';
import SignInPageReducer from '../pages/signIn/reducer';

const rootReducer = combineReducers({
  AuthLoadingReducer,
  BoardPageReducer,
  HomePageReducer,
  PersonalPageReducer,
  RecordsPageReducer,
  SignInPageReducer
});

export default rootReducer;
