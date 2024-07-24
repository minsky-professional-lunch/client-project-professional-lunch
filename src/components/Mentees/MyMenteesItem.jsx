import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Box, CardOverflow, Grid, Avatar } from '@mui/joy';
import { CardContent } from '@mui/joy';
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
    <>
    <div className='container'>
        <Grid container justifyContent='center'>
          <Box sx={{ maxHeight: '80vh', marginBottom: '10px' }}>
            <Card sx={{ width: '80vw', boxShadow: 'lg', bgcolor: 'background.level1', cursor: 'pointer' }}>
              <CardContent onClick={() => menteeDetails(mentee.mentee_user_id)}>
              <Stack direction='row' alignItems='center' spacing={2}>
                <Avatar
                  src={mentee.mentee_avatar}
                  alt={mentee.mentee_first_name}
                  sx={{ '--Avatar-size': '6rem' }}
                />
                <Stack direction='column'>
                  <Typography level='h3' noWrap>
                    {mentee.mentee_first_name} {mentee.mentee_last_name}
                  </Typography>
                  <Typography level='body-md' noWrap>
                    {mentee.mentee_school}
                  </Typography>
                </Stack>
                </Stack>
                </CardContent>
            </Card>
          </Box>
        </Grid>
      </div>
      </>
  )
}