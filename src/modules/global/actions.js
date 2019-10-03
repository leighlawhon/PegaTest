import fetch from 'cross-fetch'

export const SCREEN_WIDTH = 'SCREEN_WIDTH';
export const REQUEST_DATA = 'REQUEST_Data';
export const RECEIVE_DATA = 'RECEIVE_Data';
export const INVALIDATE_DATA = 'INVALIDATE_DATA';
export const UPDATE_DAYS = 'UPDATE_DAYS';

export function onWindowResize() {
  let width = document.body.clientWidth;
  return { type: SCREEN_WIDTH, screenWidth: width }
}

function requestData() {
  return {
    type: REQUEST_DATA,
  }
}

function receiveData(json) {
  let daysObj = {};
  json.forEach(element => {
    daysObj[new Date(element.title).getTime()] = true;
  });
  return {
    type: RECEIVE_DATA,
    data: json,
    receivedAt: Date.now(),
    days: daysObj
  }
}
export function updateDays(daysObj) {
  console.log(daysObj)
  return {
    type: UPDATE_DAYS,
    days: { ...daysObj }
  }
}

export function invalidateData() {
  return {
    type: INVALIDATE_DATA,
  }
}

let timer = null;
export function fetchData() {
  return function (dispatch) {
    dispatch(requestData())

    return fetch('https://api.myjson.com/bins/guhap')
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        timer = setTimeout(() => {
          dispatch(receiveData(json));
        }, 2000)
      )
  }
}