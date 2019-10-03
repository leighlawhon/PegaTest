import { SCREEN_WIDTH, REQUEST_DATA, RECEIVE_DATA, UPDATE_DAYS } from './actions';

/* eslint-disable default-case, no-param-reassign */
const initialState = {
  screenWidth: typeof window === 'object' ? window.innerWidth : null,
  fakeCurrentTime: new Date("Nov 2 2019 12:00 AM"),
  data: [],
  days: {}
}

export default function global(state = initialState, action) {
  switch (action.type) {
    case SCREEN_WIDTH:
      return { ...state, screenWidth: action.screenWidth }
    case REQUEST_DATA:
      return { ...state, isFetching: true, }
    case RECEIVE_DATA:
      return { ...state, data: action.data, isFetching: false, days: action.days }
    case UPDATE_DAYS:
      return { ...state, days: action.days }
    default:
      return state
  }
}
