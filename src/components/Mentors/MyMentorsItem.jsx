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
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';

export default function MyMentorsItem({ mentor }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const meetings = useSelector((store) => store.meetings);

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
        <Box sx={{ maxHeight: '80vh' }}>
          <Card sx={{ width: '80vw' }}>
            <Typography level='title-lg' noWrap>
              {mentor.mentor_first_name} {mentor.mentor_last_name}
            </Typography>
            <CardActions>
              <Stack
                direction='row'
                justifyContent='space-evenly'
                alignItems='center'
                spacing={4}
              >
                {mentor.status === 'accepted' ? (
                  <></>
                ) : (
                  <Button onClick={() => cancel(mentor.id)}>
                    Cancel Request
                  </Button>
                )}
                <Button
                  onClick={() => mentorDetails(mentor.mentor_user_id)}
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
  );
}
