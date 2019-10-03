import { uniq } from 'lodash';
import store from '../../store';
import { updateDays } from '../global/actions'
export const TOGGLE_DAY = 'TOGGLE_DAY';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';
export const SHOW_HIDE_DAY = 'SHOW_HIDE_DAY';


export function toggleDay(text) {
  console.log(text)
  return { type: TOGGLE_DAY, text }
}

export function toggleCategory(text) {
  return { type: TOGGLE_CATEGORY, text }
}
export function showHideDay(value, invert) {
  console.log(value)
  const daysObj = store.getState().global.days;
  if (invert) {
    for (let [key, value] of Object.entries(daysObj)) {
      daysObj[key] = false;
    }
    daysObj[new Date(value).getTime()] = true;

    return { type: SHOW_HIDE_DAY, hideSpace: true }
  } else {
    daysObj[new Date(value).getTime()] = !daysObj[new Date(value).getTime()]
    store.dispatch(updateDays(daysObj));
    return { type: SHOW_HIDE_DAY, hideSpace: false }
  }

}