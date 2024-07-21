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

export default function MeetingItem( {meeting} ) {
    const user = useSelector(store => store.user);
    const history = useHistory();
    const dispatch = useDispatch();

    const seeDetails = (meetingId) => {
        console.log('clicked', meetingId);
        history.push(`/meeting/details/${meeting.meeting_id}`);
    }

    const accept = (meetingId) => {
        console.log('clicked', meetingId);
        dispatch({ type: 'ACCEPT_MEETING', payload: meetingId });
        dispatch({ type: 'FETCH_MEETINGS' });
    }

    const deny = (meetingId) => {
        console.log('clicked', meetingId);
        dispatch({ type: 'DELETE_MEETING', payload: meetingId });
    }

    return (
        <div className='container'>
            {user.isMentor ? 
            <Grid container justifyContent="center">
                <Box sx={{ maxHeight: '80vh' }}>
                <Card sx={{ width: '80vw' }}>
                    <Typography level="title-lg" noWrap>
                        Meeting with {meeting.mentee_first_name} {meeting.mentee_last_name}
                    </Typography>
                    <Typography level="title-lg" noWrap>
                        {moment(meeting.meeting_date).format('LL')}
                    </Typography>
                    <Typography level="title-md" noWrap>
                        {moment(meeting.meeting_start, "hh:mm:ss").format('h:mm A')} - {moment(meeting.meeting_end, "hh:mm:ss").format('h:mm A')}
                    </Typography>
                    <CardActions>
                        <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>
                            {meeting.meeting_status === 'pending' ? 
                                <>
                                <Button onClick={() => accept(meeting.meeting_id)}>
                                    Accept
                                </Button>
                                <Button onClick={() => deny(meeting.meeting_id)}>
                                    Deny
                                </Button>
                                <Button onClick={() => seeDetails(meeting.meeting_id)}>
                                    View Details
                                </Button>
                                </>
                            : 
                                <>
                                 <Button onClick={() => seeDetails(meeting.meeting_id)}>
                                    View Details
                                </Button>
                                </>
                            }
                        </Stack>
                    </CardActions>
                </Card>
                </Box>
            </Grid>     
            : 
            <Grid container justifyContent="center">
                <Box sx={{ maxHeight: '80vh' }}>
                <Card sx={{ width: '80vw' }} onClick={() => seeDetails(meeting.meeting_id)}>
                    <Typography level="title-lg" noWrap>
                        Meeting with {meeting.mentor_first_name} {meeting.mentor_last_name}
                    </Typography>
                    <Typography level="title-lg" noWrap>
                        {moment(meeting.meeting_date).format('LL')}
                    </Typography>
                    <Typography level="title-md" noWrap>
                        {moment(meeting.meeting_start, "hh:mm:ss").format('h:mm A')} - {moment(meeting.meeting_end, "hh:mm:ss").format('h:mm A')}
                    </Typography>
                    <Typography level="title-md" noWrap>
                        Status: {meeting.meeting_status}
                    </Typography>
                  
                    <CardActions>
                        <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={4}>
                            <Button >
                                View
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>
                </Box>
            </Grid>
            }
        </div>
    )
}