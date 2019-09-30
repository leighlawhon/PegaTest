import { combineReducers } from 'redux'
import counter from './counter';
import agendaReducer from '../containers/Agenda/reducer'

export default combineReducers({
  counter,
  agendaReducer
})
