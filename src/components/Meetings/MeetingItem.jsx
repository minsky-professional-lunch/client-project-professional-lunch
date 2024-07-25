import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Avatar, Box, CardOverflow, Grid } from '@mui/joy';
import { CardActions, CardContent, Stack } from "@mui/joy";
import Button from '@mui/joy/Button';
import moment from 'moment/moment';
import ButtonGroup from '@mui/joy/ButtonGroup';

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
                <Card sx={{ width: '80vw', boxShadow: 'lg', bgcolor: 'background.level1', margin: '10px' }}>
                <CardContent sx={{ cursor: 'pointer' }}
                                      onClick={() => seeDetails(meeting.meeting_id)}>
                    <Stack direction='row' spacing={2}>
                        <Avatar src={meeting.mentee_avatar} sx={{ '--Avatar-size': '5rem'}}/>
                        <Stack direction='column'>
                            <Typography level="title-lg" noWrap sx={{ width: '57vw' }}>
                                Meeting with {meeting.mentee_first_name} {meeting.mentee_last_name}
                            </Typography>
                            <Typography level="body-md" noWrap sx={{ width: '50vw' }}>
                                {moment(meeting.meeting_date).format('LL')}
                            </Typography>
                            <Typography level="body-md" noWrap sx={{ width: '50vw' }}>
                                {moment(meeting.meeting_start, "hh:mm:ss").format('h:mm A')} - {moment(meeting.meeting_end, "hh:mm:ss").format('h:mm A')}
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
                    {meeting.meeting_status === 'pending' ? 
                    <CardOverflow sx={{ bgcolor: 'background.level2', alignItems: 'center' }}>
                        <CardActions buttonFlex="1">
                            <ButtonGroup variant="outlined" size='lg' sx={{ bgcolor: 'background.surface' }}>
                                <Button onClick={() => accept(meeting.meeting_id)}>Accept</Button>
                                <Button onClick={() => deny(meeting.meeting_id)}>Deny</Button>
                            </ButtonGroup>
                        </CardActions>
                    </CardOverflow>
                    :
                    <></> 
                    }
                </Card>
                </Box>
            </Grid>     
            : 
            <Grid container justifyContent="center">
                <Box sx={{ maxHeight: '80vh' }}>
                <Card sx={{ width: '80vw', boxShadow: 'lg', bgcolor: 'background.level1', margin: '10px' }} onClick={() => seeDetails(meeting.meeting_id)}>
                <Stack direction='row' spacing={2}>
                        <Avatar src={meeting.mentor_avatar} sx={{ '--Avatar-size': '5rem'}}/>
                        <Stack direction='column'>
                            <Typography level="title-lg" noWrap sx={{ width: '57vw' }}>
                                Meeting with {meeting.mentor_first_name} {meeting.mentor_last_name}
                            </Typography>
                            <Typography level="body-md" noWrap sx={{ width: '50vw' }}>
                                {moment(meeting.meeting_date).format('LL')} | {moment(meeting.meeting_start, "hh:mm:ss").format('h:mm A')}
                            </Typography>
                            <Typography level="body-md" noWrap sx={{ width: '50vw' }}>
                                Status: {meeting.meeting_status}
                            </Typography>
                        </Stack>
                </Stack>
                </Card>
                </Box>
            </Grid>
            }
        </div>
    )
}