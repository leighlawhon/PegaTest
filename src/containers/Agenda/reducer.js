import { TOGGLE_DAY } from './actions';

const initialState = {
  agendaShowing: 'Full Agenda'
}

/* eslint-disable default-case, no-param-reassign */
export default function agendaReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DAY:
      return { ...state, agendaShowing: action.text }
    default:
      return state
  }
}
