import { combineReducers } from 'redux';
import toDoReducer from '../features/List/toDoReducer/toDoReducer';
import authReducer from './authReducer/authReducer';

const rootReducer = combineReducers({
  user: authReducer,
  todo: toDoReducer,
});

export default rootReducer;
