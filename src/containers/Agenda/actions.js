export const TOGGLE_DAY = 'TOGGLE_DAY';

export function toggleDay(text) {
  console.log(text)
  return { type: TOGGLE_DAY, text }
}