import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './app.reducer'
import { createLogger } from 'redux-logger';

const isDebuggingInChrome = false;

const logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true
});

let middleWares = [thunk];

if (process.env.NODE_ENV === 'development') {
    middleWares = [...middleWares, logger];
}

let middleWareStore = applyMiddleware(...middleWares)(createStore);

export default  function configureStore(initState: Object) {
    const store = middleWareStore(rootReducer,initState);
    if(isDebuggingInChrome){
        window.store = store;
    }
    return store;
};