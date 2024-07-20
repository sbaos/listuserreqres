// rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';
const rootReducer = combineReducers({
    accout: userReducer,
});

export default rootReducer;
