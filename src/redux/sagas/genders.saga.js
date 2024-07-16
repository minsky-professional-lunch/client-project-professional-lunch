import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGenders() {
  try {
    const response = yield axios.get("/api/genders");
    yield put({ type: "SET_GENDERS", payload: response.data });
  } catch (error) {
    console.log("error in fetching registration interests");
  }
}

function* addGender(action) {
  try {
    yield axios.post(`api/genders`, action.payload);
    yield put({ type: 'FETCH_GENDERS' });
  } catch (error) {
    alert(`Error adding gender`);
    console.error(`Error adding gender`, error);
  }
}

function* editGender(action) {
  try {
    yield axios.put(`/api/genders/${action.payload.id}`, {gender: action.payload.gender});
    yield put({ type: 'FETCH_GENDERS' });
  } catch (error) {
    alert(`Error editing gender`);
    console.log(`Error editing gender`, error);
  }
}

function* deleteGender(action) {
  try {
    yield axios.delete(`/api/genders/${action.payload}`);
    yield put({ type: 'FETCH_GENDERS'});
  } catch (error) {
    alert(`Error deleting gender`);
    console.log(`Error deleting gender`, error);
  }
}

function* gendersSaga() {
  yield takeLatest('FETCH_GENDERS', fetchGenders);
  yield takeLatest('ADD_GENDER', addGender);
  yield takeLatest('EDIT_GENDER', editGender);
  yield takeLatest('DELETE_GENDER', deleteGender);
}

export default gendersSaga;