import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Box, CardOverflow, Grid } from '@mui/joy';
import { CardActions, CardContent, Stack } from '@mui/joy';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';

export default function MentorRequests({ mentee }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const details = useSelector((store) => store.profileDetails);
  console.log('Details', details);

  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: mentee.user_id });
  }, []);

  const mentorDetails = (menteeId) => {
    console.log('Clicked', menteeId);
    dispatch({ type: 'FETCH_DETAILS', payload: menteeId });
    history.push(`/mentor/details/${menteeId}`);
  };

  const connect = (mentorshipId) => {
    console.log('Clicked', mentorshipId);
    dispatch({
      type: 'ACCEPT_MENTORSHIP',
      payload: { mentorshipId: mentorshipId },
    });
  };

  const deny = (mentorshipId) => {
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
        <Box sx={{ maxHeight: '80vh' }}>
          <Card sx={{ width: '80vw', boxShadow: 'lg', bgcolor: 'background.level1' }}>
            <CardContent sx={{ cursor: 'pointer' }}
                                      onClick={() => mentorDetails(mentee.mentee_user_id)}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Avatar
                src={mentee.mentee_avatar}
                alt={mentee.mentee_first_name}
                sx={{ '--Avatar-size': '6rem' }}
              />
              <Stack direction='column'>
                <Typography level='title-lg' noWrap>
                  {mentee.mentee_first_name} {mentee.mentee_last_name}
                </Typography>
                <Typography level='body-md' noWrap>
                  {mentee.mentee_school}
                </Typography>
              </Stack>
              </Stack>
              </CardContent>
              <CardOverflow sx={{ bgcolor: 'background.level2', alignItems: 'center' }}>
                  <CardActions buttonFlex="1">
                    <ButtonGroup variant="outlined" size='lg' sx={{ bgcolor: 'background.surface' }}>
                        <Button onClick={() => connect(mentee.id)}>Accept</Button>
                        <Button onClick={() => deny(mentee.id)}>Deny</Button>
                    </ButtonGroup>
                  </CardActions>
              </CardOverflow>
          </Card>
        </Box>
      </Grid>
    </div>
    </>
  );
}
