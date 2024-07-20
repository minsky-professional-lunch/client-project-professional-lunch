import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Box, CardOverflow, Grid } from '@mui/joy';
import { CardActions, CardContent, Stack } from "@mui/material";
import Button from '@mui/joy/Button';
import moment from 'moment/moment';
import MeetingItem from './MeetingItem';

export default function MyMeetings() {
    const dispatch = useDispatch();
    const history = useHistory();
    const meetings = useSelector(store => store.meetings);
    console.log('Meetings', meetings);

    return (
        <div className="container">
        <h1>My Meetings</h1>
        {meetings.map((meeting) => (
            <MeetingItem key={meeting.meeting_id} meeting={meeting} />
        ))}
        </div>
    )
}