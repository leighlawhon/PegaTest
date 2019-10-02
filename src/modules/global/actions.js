export const SCREEN_WIDTH = 'SCREEN_WIDTH';

export function onWindowResize() {
  let width = document.body.clientWidth;
  console.log(width);
  return { type: SCREEN_WIDTH, screenWidth: width }
}
