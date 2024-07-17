import axios from 'axios';
import { put, take, takeLatest } from 'redux-saga/effects';

function* fetchAdminProfiles() {
    try {
        const result = yield axios.get('/api/adminprofiles');
        yield put({ type: 'SET_ADMIN_PROFILES', payload: result.data });
    } catch (error) {
        console.log('Error getting profiles:', error);
    }
}

function* adminProfilesSaga() {
    yield takeLatest('FETCH_ADMIN_PROFILES', fetchAdminProfiles);
}

export default adminProfilesSaga;