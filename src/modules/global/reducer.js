import { SCREEN_WIDTH } from './actions';

/* eslint-disable default-case, no-param-reassign */
const initialState = {
  screenWidth: typeof window === 'object' ? window.innerWidth : null,
}

export default function global(state = initialState, action) {
  switch (action.type) {
    case SCREEN_WIDTH:
      return { ...state, screenWidth: action.screenWidth }
    default:
      return state
  }
}
