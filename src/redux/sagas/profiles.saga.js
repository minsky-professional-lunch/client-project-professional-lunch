import axios from 'axios';
import { put, take, takeLatest } from 'redux-saga/effects';

function* fetchProfiles() {
    try {
        const result = yield axios.get('/api/profile');
        yield put({ type: 'SET_PROFILES', payload: result.data });
    } catch (error) {
        console.log('Error getting profiles:', error);
    }
}

function* fetchProfileDetails(action) {
    try {
        const result = yield axios.get(`/api/profile/${action.payload}`);
        yield put({ type: 'SET_DETAILS', payload: result.data });
        console.log('Result', result);
    } catch (error) {
        console.log('Error getting profile details:', error);
    }
}

function* profilesSaga() {
    yield takeLatest('FETCH_PROFILES', fetchProfiles);
    yield takeLatest('FETCH_PROFILE_DETAILS', fetchProfileDetails);
}

export default profilesSaga;