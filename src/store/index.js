import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
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
  applyMiddleware(thunk));
