import axios from 'axios';
import { put, take, takeLatest } from 'redux-saga/effects';

function* fetchProfiles() {
    try {
        yield axios.get('/api/profile');
        yield put({ type: 'SET_PROFILES', payload: result.data });
    } catch (error) {
        console.log('Error getting profiles:', error);
    }
}

function* profilesSaga() {
    yield takeLatest('FETCH_PROFILES', fetchProfiles);
}

export default profilesSaga;