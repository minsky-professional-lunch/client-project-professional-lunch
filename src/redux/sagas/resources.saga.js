import axios from 'axios';
import { put, take, takeLatest } from 'redux-saga/effects';

function* fetchResources() {
  try {
    const response = yield axios.get(`api/resources`);
    yield put({ type: 'SET_RESOURCES', payload: response.data});
  } catch (error) {
    console.error(`Error getting resources`, error);
  }
}

function* fetchSelectedResource(action) {
  try {
    const response = yield axios.get(`api/resources/${action.payload}`);
    yield put({ type: 'SET_SELECTED_RESOURCE', payload: response.data})
  } catch (error) {
    console.error(`Error getting single resource`, error);
  }
}

function* addResource(action) {
  try {
    yield axios.post(`api/resources`, action.payload);
    yield put({ type: 'FETCH_RESOURCES' });
  } catch (error) {
    alert(`Error adding resource`);
    console.error(`Error adding resource`, error);
  }
}

function* editResource(action) {
  try {
    yield axios.put(`api/resources/${action.payload}`, {
      title: action.payload.title, 
      image: action.payload.image,
      url: action.payload.url, 
      about: action.payload.about,
      category: action.payload.category,
      notes: action.payload.notes,
    });
    yield put({ type: 'FETCH_RESOURCES' })
  } catch (error) {
    alert(`Error editing resource`);
    console.log(`Error editing resource`, error)
  }
}

function* deleteResource(action) {
  try {
    yield axios.delete(`api/resources/${action.payload}`);
      yield put({ type: 'FETCH_RESOURCES'});
  } catch (error) {
    alert(`Error deleting resource`);
    console.error(`Error deleting resource`, error);
  }
}

function* resourcesSaga() {
  yield takeLatest('FETCH_RESOURCES', fetchResources);
  yield takeLatest('FETCH_SELECTED_RESOURCE', fetchSelectedResource);
  yield takeLatest('ADD_RESOURCE', addResource);
  yield takeLatest('EDIT_RESOURCE', editResource);
  yield takeLatest('DELETE_RESOURCE', deleteResource);
}

export default resourcesSaga;