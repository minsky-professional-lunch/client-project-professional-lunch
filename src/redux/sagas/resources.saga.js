import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchResources() {
  try {
    const response = yield axios.get('api/resources');
    yield put({ type: 'SET_RESOURCES', payload: response.data});
  } catch (error) {
    console.error(`Error getting resources`);
  }
}

function* resourcesSaga() {
  yield takeLatest('FETCH_RESOURCES', fetchResources);
}

export default resourcesSaga;