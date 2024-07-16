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

export default function MentorRequests( {mentee} ) {
    const dispatch = useDispatch();
    const history = useHistory();
    const details = useSelector(store => store.profileDetails);
    console.log('Details', details);

    useEffect(() => {
        dispatch({ type: 'FETCH_DETAILS', payload: mentee.user_id });
    }, []);

    const mentorDetails = (menteeId) => {
        console.log('Clicked', menteeId);
        // dispatch({ type: 'FETCH_DETAILS', payload: mentorId });
        // history.push(`/mentor/details/${mentorId}`);
    }

    const connect = (mentorshipId) => {
        console.log('Clicked', mentorshipId);
        dispatch({ type: 'ACCEPT_MENTORSHIP', payload: {mentorshipId: mentorshipId} });
    }

    const deny = (mentorshipId) => {
        console.log('Clicked', mentorshipId);
        dispatch({ type: 'DELETE_MENTORSHIP', payload: {mentorshipId: mentorshipId} });
    }

    return (
        <div className='container'>
            <Grid container justifyContent="center">
                <Box sx={{ maxHeight: '80vh' }}>
                <Card sx={{ width: '80vw' }}>
                    <Typography level="title-lg" noWrap>
                        {mentee.mentee_first_name} {mentee.mentee_last_name}
                    </Typography>
                    <CardActions>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Button onClick={() => connect(mentee.id)}>
                                Accept
                            </Button>
                            <Button onClick={() => deny(mentee.id)}>
                                Deny
                            </Button>
                            <Button onClick={() => mentorDetails(mentee.mentee_id)} sx={{ cursor: 'pointer' }}>
                                View Profile
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>
                </Box>
            </Grid>
        </div>
    )
}