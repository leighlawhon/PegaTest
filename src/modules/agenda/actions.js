export const TOGGLE_DAY = 'TOGGLE_DAY';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';
export const TOGGLE_COLLAPSE = 'TOGGLE_CATEGORY';


export function toggleDay(text) {
  return { type: TOGGLE_DAY, text }
}

export function toggleCategory(text) {
  return { type: TOGGLE_CATEGORY, text }
}

export function toggleCollapse(bool) {
  return { type: TOGGLE_COLLAPSE, bool }
}