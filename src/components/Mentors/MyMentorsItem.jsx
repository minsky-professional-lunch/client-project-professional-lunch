import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import {
  Box,
  CardOverflow,
  Grid,
  CardActions,
  CardContent,
  Avatar,
} from '@mui/joy';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';

export default function MyMentorsItem({ mentor }) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILES' });
    dispatch({ type: 'FETCH_MEETINGS' });
  }, []);

  const mentorDetails = (mentorId) => {
    console.log('Clicked', mentorId);
    dispatch({ type: 'FETCH_PROFILE_DETAILS', payload: mentorId });
    history.push(`/mentor/details/${mentorId}`);
  };

  const cancel = (mentorshipId) => {
    console.log('Clicked', mentorshipId);
    dispatch({
      type: 'DELETE_MENTORSHIP',
      payload: { mentorshipId: mentorshipId },
    });
  };

  return (
    <div className='container'>
      <Grid container justifyContent='center'>
        <Box sx={{ maxHeight: '80vh', margin: '10px' }}>
          <Card
            sx={{
              width: '80vw',
              boxShadow: 'lg',
              bgcolor: 'background.level1',
              cursor: 'pointer',
            }}
          >
            <CardContent onClick={() => mentorDetails(mentor.mentor_user_id)}>
              <Stack direction='column' alignItems='center' spacing={2}>
                <Avatar
                  src={mentor.mentor_avatar}
                  alt={mentor.mentor_first_name}
                  sx={{ '--Avatar-size': '8rem', cursor: 'pointer' }}
                />
                <Stack direction='column' alignItems='center' >
                  <Typography level='h2' sx={{ marginBottom: '10px' }}>
                    {mentor.mentor_first_name} {mentor.mentor_last_name}
                  </Typography>
                  {mentor.status === 'Denied - not available at this time' ? 
                  <>
                    <Typography><b>Status:</b> {mentor.status}</Typography>
                  </>
                  :
                  <></>
                  }
                </Stack>
              </Stack>
            </CardContent>
            {mentor.status === 'accepted' ? (
              <></>
            ) : (
              <CardActions>
                <Button onClick={() => cancel(mentor.id)} color='neutral'>
                  Delete Request
                </Button>
              </CardActions>
            )}
          </Card>
        </Box>
      </Grid>
    </div>
  );
}
