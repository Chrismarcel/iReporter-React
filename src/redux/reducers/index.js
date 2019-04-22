import { combineReducers } from 'redux';
import authReducer from './authReducer';
import reportReducer from './reportReducer';

const rootReducer = combineReducers({ auth: authReducer, report: reportReducer });
export default rootReducer;
