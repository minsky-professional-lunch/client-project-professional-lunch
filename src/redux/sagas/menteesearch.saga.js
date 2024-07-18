import axios from 'axios';
import { put, take, takeLatest } from 'redux-saga/effects';

function* fetchInterestProfiles() {
  try {
    const result = yield axios.get('/api/menteesearch/interest');
    yield put({ type: 'SET_INTEREST_PROFILES', payload: result.data });
  } catch (error) {
    console.log('Error getting profiles based on interests', error);
  }
}

function* fetchGenderProfiles(action) {
  try {
    const result = yield axios.get(`/api/menteesearch/gender/${action.payload}`);
    yield put({ type: 'SET_GENDER_PROFILES', payload: result.data });
    console.log('Result', result);
  } catch (error) {
    console.log('Error getting profiles based on gender', error);
  }
}

function* menteeSearchSaga() {
  yield takeLatest('FETCH_INTEREST_PROFILES', fetchInterestProfiles);
  yield takeLatest('FETCH_GENDER_PROFILES', fetchGenderProfiles);
}

export default menteeSearchSaga;
