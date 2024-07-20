import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment/moment';

export default function MeetingDetails() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    console.log('params', params);
    const meetings = useSelector(store => store.meetings);
    console.log('Meetings', meetings);
    const thisMeeting = meetings.filter(meeting => meeting.meeting_id === Number(params.id))[0];
    console.log('This meeting', thisMeeting);

    useEffect(() => {
        dispatch({ type: 'FETCH_MEETINGS' });
    }, [])

    const back = () => {
        history.push('/my-meetings');
    }

    // check to see if data is done loading
    if (!thisMeeting) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="container">
        <h1>Meeting Details</h1>
        <h4>Mentor: {thisMeeting?.mentor_first_name} {thisMeeting?.mentor_last_name}</h4>
        <h4>Mentee: {thisMeeting?.mentee_first_name} {thisMeeting?.mentee_last_name}</h4>
        <h4>Date: {moment(thisMeeting?.meeting_date).format('LL')}</h4>
        <h4>Time: {moment(thisMeeting?.meeting_start, "hh:mm:ss").format('h:mm A')} - {moment(thisMeeting?.meeting_end, "hh:mm:ss").format('h:mm A')}</h4>
        <h4>Link/Location: {thisMeeting?.meeting_link}</h4>
        <h4>Notes: {thisMeeting?.meeting_notes}</h4>
        <button onClick={back}>Back</button>
        </div>
    )
}