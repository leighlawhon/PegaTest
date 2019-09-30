import { TOGGLE_DAY } from './actions';
import { TOGGLE_CATEGORY } from './actions';

const initialState = {
  dayShowing: 'Full Agenda',
  categoryShowing: 'Full Agenda'
}

/* eslint-disable default-case, no-param-reassign */
export default function agenda(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DAY:
      return { ...state, dayShowing: action.text }
    case TOGGLE_CATEGORY:
      return { ...state, categoryShowing: action.text }
    default:
      return state
  }
}
