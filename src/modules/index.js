import { combineReducers } from 'redux'
import counter from './counter';
import agenda from '../containers/Agenda/reducer'

export default combineReducers({
  counter,
  agenda
})
