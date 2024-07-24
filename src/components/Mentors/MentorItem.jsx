import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Avatar, Box, CardOverflow, Grid } from '@mui/joy';
import { CardActions, CardContent, Stack } from "@mui/material";
import Button from '@mui/joy/Button';

export default function MentorItem( {mentor} ) {
    const dispatch = useDispatch();
    const history = useHistory();
    const details = useSelector(store => store.profileDetails);
    const mentDetails = useSelector(store => store.mentDetails);
    console.log('Ment details', mentDetails);
    console.log('Details', details);

    const [requested, setRequested] = useState(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_PROFILE_DETAILS' });
    }, []);

    const mentorDetails = (mentorId) => {
        console.log('Clicked', mentorId);
        dispatch({ type: 'FETCH_MENT_DETAILS', payload: mentorId });
        history.push(`/mentor/details/${mentorId}`);
    }

    const connect = (mentorId) => {
        console.log('Clicked', mentorId);
        dispatch({ type: 'FETCH_MENT_DETAILS', payload: mentorId });
        dispatch({ type: 'REQUEST_MENTORSHIP', payload: {mentorId: mentorId, menteeId: details.profile.id} });
        setRequested(!requested);
    }

    return (
        <div className='container'>
            <Grid container justifyContent="center">
                <Box sx={{ maxHeight: '80vh' }}>
                <Card sx={{ width: '80vw', margin: '5px' }}>
                    <Stack direction='row' alignItems='center' spacing={2.5}>
                        <Avatar src={mentor.avatar} sx={{ '--Avatar-size': '6rem', marginBottom: '3px', cursor: 'pointer' }}
                            onClick={() => mentorDetails(mentor.user_id)} />
                        <Stack direction='column'>
                            <Typography level="h3" noWrap>
                                {mentor.first_name} {mentor.last_name}
                            </Typography>
                            <Stack direction='row' justifyContent="flex-start" alignItems="center" spacing={2} sx={{ marginTop: '10px'}}>
                                {mentor.status != 'pending' ? 
                                <Button onClick={() => connect(mentor.id)}>
                                    Connect
                                </Button>
                                : 
                                <Button>
                                    Requested
                                </Button>
                                }
                            </Stack>
                        </Stack>
                    </Stack>
                </Card>
                </Box>
            </Grid>
        </div>
    )
}