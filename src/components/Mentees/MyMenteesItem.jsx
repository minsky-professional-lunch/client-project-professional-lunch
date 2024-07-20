import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Box, CardOverflow, Grid } from '@mui/joy';
import { CardActions, CardContent } from '@mui/material';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';

export default function MyMenteesItem({ mentee }) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILES' });
    dispatch({ type: 'FETCH_MEETINGS' });
  }, []);

  const menteeDetails = (menteeId) => {
    console.log('Clicked', menteeId);
    dispatch({ type: 'FETCH_PROFILE_DETAILS', payload: menteeId });
    history.push(`/mentee/details/${menteeId}`);
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
        <Box sx={{ maxHeight: '80vh' }}>
          <Card sx={{ width: '80vw' }}>
            <Typography level='title-lg' noWrap>
              {mentee.mentee_first_name} {mentee.mentee_last_name}
            </Typography>
            <CardActions>
              <Stack
                direction='row'
                justifyContent='space-evenly'
                alignItems='center'
                spacing={4}
              >
                <Button
                  onClick={() => menteeDetails(mentee.mentee_user_id)}
                  sx={{ cursor: 'pointer' }}
                >
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