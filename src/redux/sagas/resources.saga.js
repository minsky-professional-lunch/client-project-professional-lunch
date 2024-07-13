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

function* addResource(action) {
  try {
    yield axios.post('api/resources', action.payload);
    yield put({ type: 'FETCH_RESOURCES' });
  } catch (error) {
    alert(`Error adding resource`);
    console.error(`Error adding resource`, error);
  }
}

function* resourcesSaga() {
  yield takeLatest('FETCH_RESOURCES', fetchResources);
  yield takeLatest('ADD_RESOURCE', addResource);
}

export default resourcesSaga;