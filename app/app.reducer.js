/**
 *  root reducer collection
 */
import { combineReducers } from 'redux';

import loginPageReducer from './pages/login/reducer'
import MainPageReducer from './pages/main/reducer'
import BoardReducer from './pages/board/reducer'
import PersonCenterReducer from './pages/personcenter/reducer'

const rootReducer = combineReducers({
    BoardReducer,
    loginPageReducer,
    MainPageReducer,
    PersonCenterReducer
});


export default rootReducer;