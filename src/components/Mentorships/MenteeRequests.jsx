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

export default function MenteeRequests( {mentor} ) {
    const dispatch = useDispatch();
    const history = useHistory();
    const details = useSelector(store => store.profileDetails);
    console.log('Details', details);

    const [requested, setRequested] = useState(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_DETAILS', payload: mentor.user_id });
    }, []);

    const mentorDetails = (mentorId) => {
        console.log('Clicked', mentorId);
        // dispatch({ type: 'FETCH_DETAILS', payload: mentorId });
        // history.push(`/mentor/details/${mentorId}`);
    }

    const connect = (mentorId) => {
        console.log('Clicked', mentorId);
        dispatch({ type: 'REQUEST_MENTORSHIP', payload: mentorId });
        setRequested(!requested);
    }

    const cancel = (mentorshipId) => {
        console.log('Clicked', mentorshipId);
        dispatch({ type: 'DELETE_MENTORSHIP', payload: {mentorshipId: mentorshipId} });
    }

    return (
        <div className='container'>
            <Grid container justifyContent="center">
                <Box sx={{ maxHeight: '80vh' }}>
                <Card sx={{ width: '80vw' }}>
                    <Typography level="title-lg" noWrap>
                        {mentor.mentor_first_name} {mentor.mentor_last_name}
                    </Typography>
                    <CardActions>
                        <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={4}>
                            {mentor.status != 'pending' ? 
                            <Button onClick={() => connect(mentor.id)}>
                                Connect
                            </Button>
                            : 
                            <Button onClick={() => cancel(mentor.id)}>
                                Cancel
                            </Button>
                            }
                            <Button onClick={() => mentorDetails(mentor.mentor_id)} sx={{ cursor: 'pointer' }}>
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