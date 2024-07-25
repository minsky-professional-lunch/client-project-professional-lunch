import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MeetingItem from './MeetingItem';

export default function MyMeetings() {
    const meetings = useSelector(store => store.meetings);
    const user = useSelector(store => store.user);
    console.log('Meetings', meetings);

    return (
        <div className="container">
        <h1 align='center'>My Meetings</h1>
        {meetings.map((meeting) => (
                <MeetingItem key={meeting.meeting_id} meeting={meeting} />
        ))}
        {meetings.length === 0 ? 
            <>
            {user.isMentor ? 
                <h3>You currently have no upcoming meetings.</h3>
                :
                <>
                <h3 align='center'>No upcoming meetings. Request a meeting with your mentor to keep learning!</h3> 
                </>
            }
            </>
        :
        <></>
        }
        </div>
    )
}