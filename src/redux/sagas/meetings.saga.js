import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMeetings() {
    try {
        const result = yield axios.get('/api/meetings/');
        console.log('Result', result);
        yield put({ type: 'SET_MEETINGS', payload: result.data });
    } catch (error) {
        console.log('Error getting meetings', error);
    }
}

function* requestMeeting(action) {
    try {
        yield axios.post(`/api/meetings/${action.payload.mentorID}`, {newMeeting: action.payload.newMeeting});
        yield put({ type: 'FETCH_MEETINGS' });
    } catch (error) {
        console.log('Error requesting meeting', error);
    }
}

function* meetingsSaga() {
    yield takeLatest('FETCH_MEETINGS', fetchMeetings);
    yield takeLatest('REQUEST_MEETING', requestMeeting);
}

export default meetingsSaga;