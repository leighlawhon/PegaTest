import { combineReducers } from 'redux'
import global from './global/reducer';
import agenda from './agenda/reducer';

export default combineReducers({
  global,
  agenda
})
