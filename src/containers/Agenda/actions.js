export const TOGGLE_DAY = 'TOGGLE_DAY';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';

export function toggleDay(text) {
  console.log(text)
  return { type: TOGGLE_DAY, text }
}

export function toggleCategory(text) {
  console.log(text)
  return { type: TOGGLE_CATEGORY, text }
}