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
        // dispatch({ type: 'REQUEST_MENTORSHIP', payload: {mentorId: mentorId, menteeId: details.profile.user_id} });
        // setRequested(!requested);
    }

    return (
        <div className='container'>
            <Grid container justifyContent="center">
                <Box sx={{ maxHeight: '80vh' }}>
                <Card sx={{ width: '80vw' }}>
                    <Typography level="title-lg" noWrap>
                        {mentor.first_name} {mentor.last_name}
                    </Typography>
                    <CardActions>
                        <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={4}>
                            {mentor.status != 'pending' ? 
                            <Button onClick={() => connect(mentor.id)}>
                                Connect
                            </Button>
                            : 
                            <Button>
                                Requested
                            </Button>
                            }
                            <Button onClick={() => mentorDetails(mentor.user_id)} sx={{ cursor: 'pointer' }}>
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