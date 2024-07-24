import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MeetingItem from './MeetingItem';

export default function MyMeetings() {
    const meetings = useSelector(store => store.meetings);
    console.log('Meetings', meetings);

    return (
        <div className="container">
        <h1 align='center'>My Meetings</h1>
        {meetings.map((meeting) => (
                <MeetingItem key={meeting.meeting_id} meeting={meeting} />
        ))}
        </div>
    )
}