import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {
  authReducer, userReducer, noteReducer
} from '../reducers';

export default createStore(
  combineReducers({
    userState: userReducer,
    authState: authReducer,
    noteState: noteReducer
  }),
  {},
  applyMiddleware(logger, thunk));
