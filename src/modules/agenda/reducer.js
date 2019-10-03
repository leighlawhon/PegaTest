import { TOGGLE_DAY } from './actions';
import { TOGGLE_CATEGORY } from './actions';
import { SHOW_HIDE_DAY } from './actions';


const initialState = {
  dayShowing: 'Full Agenda',
  categoryShowing: 'Full Agenda',
  hideSpace: false
}

/* eslint-disable default-case, no-param-reassign */
export default function agenda(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DAY:
      return { ...state, dayShowing: action.text }
    case TOGGLE_CATEGORY:
      return { ...state, categoryShowing: action.text }
    case SHOW_HIDE_DAY:
      return { ...state, hideSpace: action.hideSpace }
    default:
      return state
  }
}
