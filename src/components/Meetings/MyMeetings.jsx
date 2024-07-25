import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import MeetingItem from './MeetingItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Typography } from '@mui/joy';

export default function MyMeetings() {
    const meetings = useSelector(store => store.meetings);
    const upcomingMeetings = meetings.filter(meeting => meeting.meeting_status != 'completed');
    const archiveMeetings = meetings.filter(meeting => meeting.meeting_status === 'completed');
    console.log('archive', archiveMeetings);
    console.log('upcoming meetings', upcomingMeetings);
    const user = useSelector(store => store.user);
    console.log('Meetings', meetings);

    return (
        <div className="container">
        <h1 align='center'>My Meetings</h1>
        {upcomingMeetings.map((meeting) => (
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
        {archiveMeetings.length > 0 ? 
        <>
        <Accordion sx={{ marginTop: '50px'}}>
            <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls='panel1-content'
            id='panel1-header'>
                <Typography>Archived Meetings</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {archiveMeetings.map(meeting => (
                    <MeetingItem meeting={meeting} key={meeting.meeting_id} />
                ))}
            </AccordionDetails>
        </Accordion>
        </>
        :
        <></>
        }
        </div>
    )
}