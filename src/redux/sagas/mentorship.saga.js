import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMentorships() {
    try {
        const result = yield axios.get('/api/mentorships/all');
        yield put({ type: 'SET_MEMBERSHIPS', payload: result.data})
    } catch (error) {
        console.log('Error getting all mentorships:', error);
    }
}

function* fetchMentorshipDetails() {
    try {
        const result = yield axios.get('/api/mentorships/');
        yield put({ type: 'SET_MENTORSHIP_DETAILS', payload: result.data });
    } catch (error) {
        console.log('Error getting mentorship details:', error);
    }
}

function* requestMentorship(action) {
    try {
        yield axios.post(`/api/mentorships/${action.payload}`);
        yield put({ type: 'FETCH_MENTORSHIP_DETAILS' });
        yield put({ type: 'FETCH_MENTORSHIPS' }); 
        yield put({ type: 'FETCH_USER' });   
    }  catch (error) {
        console.log('Error posting mentorship:', error);
    }
}

function* acceptMentorship(action) {
    try {
        yield axios.put('/api/mentorships/', action.payload);
        yield put({ type: 'FETCH_MENTORSHIP_DETAILS' });
        yield put({ type: 'FETCH_MENTORSHIPS' });    
    }  catch (error) {
        console.log('Error accepting mentorship:', error);
    }
}

function* deleteMentorship(action) {
    try {
        yield axios.delete(`/api/mentorships/${action.payload.mentorshipId}`);
        yield put({ type: 'FETCH_MENTORSHIP_DETAILS' });
        yield put({ type: 'FETCH_MENTORSHIPS' });    
    }  catch (error) {
        console.log('Error deleting mentorship:', error);
    }
}

function* mentorshipSaga() {
    yield takeLatest('FETCH_MENTORSHIPS', fetchMentorships);
    yield takeLatest('FETCH_MENTORSHIP_DETAILS', fetchMentorshipDetails);
    yield takeLatest('REQUEST_MENTORSHIP', requestMentorship);
    yield takeLatest('ACCEPT_MENTORSHIP', acceptMentorship);
    yield takeLatest('DELETE_MENTORSHIP', deleteMentorship);
}


export default mentorshipSaga;