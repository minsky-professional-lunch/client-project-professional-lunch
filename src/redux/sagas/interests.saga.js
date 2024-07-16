import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchInterests() {
  try {
    const response = yield axios.get("/api/interests");
    yield put({ type: "SET_INTERESTS", payload: response.data });
  } catch (error) {
    console.log("error in fetching registration interests");
  }
}

function* addInterest(action) {
  try {
    yield axios.post(`/api/interests`, action.payload);
    yield put({ type: 'FETCH_INTERESTS' });
  } catch (error) {
    alert(`Error adding interest`);
    console.error(`Error adding interest`, error);
  }
}

function* editInterest(action) {
  try {
    yield axios.put(`/api/interests/${action.payload.id}`, {interest: action.payload.interest});
    yield put({ type: 'FETCH_INTERESTS' });
  } catch (error) {
    alert(`Error editing interest`);
    console.log(`Error editing ginterest`, error);
  }
}

function* deleteInterest(action) {
  try {
    yield axios.delete(`/api/interests/${action.payload}`);
    yield put({ type: 'FETCH_INTERESTS'});
  } catch (error) {
    alert(`Error deleting interest`);
    console.log(`Error deleting interest`, error);
  }
}

function* interestsSaga() {
  yield takeLatest('FETCH_INTERESTS', fetchInterests);
  yield takeLatest('ADD_INTEREST', addInterest);
  yield takeLatest('EDIT_INTEREST', editInterest);
  yield takeLatest('DELETE_INTEREST', deleteInterest);
}

export default interestsSaga;