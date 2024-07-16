import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchSchools() {
  try {
    const response = yield axios.get("/api/schools");
    yield put({ type: "SET_SCHOOLS", payload: response.data });
  } catch (error) {
    console.log("error in fetching registration interests");
  }
}

function* addSchool(action) {
  try {
    yield axios.post(`api/schools`, action.payload);
    yield put({ type: 'FETCH_SCHOOLS' });
  } catch (error) {
    alert(`Error adding school`);
    console.error(`Error adding school`, error);
  }
}

function* editSchool(action) {
  try {
    yield axios.put(`/api/schools/${action.payload.id}`, {school: action.payload.school});
    yield put({ type: 'FETCH_SCHOOLS' });
  } catch (error) {
    alert(`Error editing school`);
    console.log(`Error editing school`, error);
  }
}

function* deleteSchool(action) {
  try {
    yield axios.delete(`/api/schools/${action.payload}`);
    yield put({ type: 'FETCH_SCHOOLS'});
  } catch (error) {
    alert(`Error deleting school`);
    console.log(`Error deleting school`, error);
  }
}

function* schoolsSaga() {
  yield takeLatest('FETCH_SCHOOLS', fetchSchools);
  yield takeLatest('ADD_SCHOOL', addSchool);
  yield takeLatest('EDIT_SCHOOL', editSchool);
  yield takeLatest('DELETE_SCHOOL', deleteSchool);
}

export default schoolsSaga;