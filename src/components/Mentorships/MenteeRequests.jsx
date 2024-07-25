import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Avatar, Box, CardOverflow, Grid } from '@mui/joy';
import { CardActions, CardContent, Stack } from "@mui/joy";

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
        dispatch({ type: 'FETCH_DETAILS', payload: mentorId });
        history.push(`/mentor/details/${mentorId}`);
    }

    const cancel = (mentorshipId) => {
        console.log('Clicked', mentorshipId);
        dispatch({ type: 'DELETE_MENTORSHIP', payload: {mentorshipId: mentorshipId} });
    }

    return (
        <div className='container'>
            <Grid container justifyContent="center">
                <Box sx={{ maxHeight: '80vh', margin: '10px'}}>
                <Card sx={{
                width: '80vw',
                boxShadow: 'lg',
                bgcolor: 'background.level1',
                cursor: 'pointer',
                }}>
                    <CardContent sx={{ cursor: 'pointer'}} onClick={() => mentorDetails(mentor.mentor_user_id)}>
                        <Stack direction='column' alignItems='center' spacing={2}>
                            <Avatar src={mentor.mentor_avatar} sx={{ '--Avatar-size': '8rem' }}/>
                            <Stack direction='column' spacing={1}>
                            <Typography level='h2' sx={{ marginBottom: '10px' }}>
                            {mentor.mentor_first_name} {mentor.mentor_last_name}
                                </Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
                </Box>
            </Grid>
        </div>
    )
}