import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { Avatar, Stack, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';

export default function MentorDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const details = useSelector(store => store.profileDetails);
    console.log('Details', details);

    useEffect(() => {
        dispatch({ type: 'FETCH_PROFILE_DETAILS', payload: params.id });
    }, []);

    const connect = (mentorId) => {
        console.log('Clicked', mentorId);
    }

    // check to see if data is done loading
    if (!details.profile) {
        return <h2>Loading...</h2>
    }

    return (
        <div className='container'>
            <h1>Details</h1>
            <Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={3}>
                <Avatar variant="outlined" sx={{ width: 150, height: 150 }} src={details?.profile?.avatar}></Avatar>
                <Typography>{details?.profile?.first_name} {details?.profile?.last_name}</Typography>
                <Typography>Areas of Expertise: <ul>{details?.details?.interests?.map(interest => <li>{interest.interest}</li>)}</ul></Typography>
                <Typography>Availability: <ul>{details?.details?.availability?.map(avail => <li>{avail.day} @ {avail.time}</li>)}</ul></Typography>
                <Button onClick={() => connect(details?.profile?.id)}>Connect</Button>
            </Stack>
        </div>
    )
}