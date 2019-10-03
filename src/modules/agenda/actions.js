import { uniq } from 'lodash';
import store from '../../store';

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

let showHideArray = [];

export function showHideDay(value) {
  showHideArray.push(value);
  const uniqArray = uniq(showHideArray);
  return { type: SHOW_HIDE_DAY, uniqArray }
}