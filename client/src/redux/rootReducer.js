import { combineReducers } from 'redux';


import counterReducer from './Counter/reducer';


const rootReducer = combineReducers({

    showProfileInfo: counterReducer,

});

export default rootReducer;