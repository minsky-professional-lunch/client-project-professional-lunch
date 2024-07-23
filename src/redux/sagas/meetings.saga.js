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

function* fetchAllMeetings() {
  try {
    const result = yield axios.get('/api/meetings/all');
    yield put({ type: 'SET_ALL_MEETINGS', payload: result.data})
} catch (error) {
    console.log('Error getting all meetings:', error);
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

function* acceptMeeting(action) {
    try {
        yield axios.put(`/api/meetings/accept/${action.payload}`);
        yield put({ type: 'FETCH_MEETNGS' });
    } catch (error) {
        console.log('Error accepting meeting', error);
    }
}

function* deleteMeeting(action) {
    try {
        yield axios.delete(`/api/meetings/${action.payload}`);
        yield put({ type: 'FETCH_MEETINGS' });
    } catch (error) {
        console.log('Error deleting meeting', error);
    }
}

function* meetingsSaga() {
    yield takeLatest('FETCH_MEETINGS', fetchMeetings);
    yield takeLatest('FETCH_ALL_MEETINGS', fetchAllMeetings);
    yield takeLatest('REQUEST_MEETING', requestMeeting);
    yield takeLatest('ACCEPT_MEETING', acceptMeeting);
    yield takeLatest('DELETE_MEETING', deleteMeeting);
}

export default meetingsSaga;