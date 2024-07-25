import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import moment from 'moment/moment';
import {
  Avatar,
  AvatarGroup,
  Stack,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
} from '@mui/joy';
import Tooltip from '@mui/joy/Tooltip';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Button from '@mui/joy/Button';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';

export default function MeetingDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  console.log('params', params);
  const meetings = useSelector((store) => store.meetings);
  console.log('Meetings', meetings);
  const thisMeeting = meetings.filter(
    (meeting) => meeting.meeting_id === Number(params.id)
  )[0];
  console.log('This meeting', thisMeeting);

  useEffect(() => {
    dispatch({ type: 'FETCH_MEETINGS' });
  }, []);

  const back = () => {
    history.goBack();
  };

  const archiveMeeting = (meetingId) => {
    console.log('clicked', meetingId);
    dispatch({ type: 'ARCHIVE_MEETING', payload: meetingId });
    history.push('/my-meetings');
  }

  // check to see if data is done loading
  if (!thisMeeting) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className='container'>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          sx={{ marginBottom: '25px' }}
        >
          <Tooltip title='Back' variant='soft'>
            <ArrowBackIosIcon
              sx={{ fontSize: '2.5rem', cursor: 'pointer' }}
              onClick={back}
            />
          </Tooltip>
          <Typography level='h2'>Meeting Details</Typography>
          {thisMeeting?.meeting_status === 'accepted' ? 
          <>
          <Tooltip title='Archive Meeting' variant='soft'>
            <DomainVerificationIcon sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => archiveMeeting(thisMeeting?.meeting_id)}/>
          </Tooltip>
          </>
          : 
          <></>
          }
        </Stack>
        <Grid container justifyContent='center'>
          <Box sx={{ width: '90vw' }}>
          <Stack direction='column' spacing={1.5} alignItems='center'>
            <Card sx={{ width: '82vw', maxWidth: '100%', boxShadow: 'lg' }}>
              <CardContent sx={{ alignItems: 'center', textAlign: 'center', margin: '10px' }}>
                <AvatarGroup
                  sx={{
                    '--AvatarGroup-gap': '-15px',
                    '--Avatar-size': '9rem',
                    '--Avatar-ringSize': '5px',
                    marginBottom: '10px'
                  }}
                >
                  <Avatar src={thisMeeting?.mentor_avatar} variant="outlined"/>
                  <Avatar src={thisMeeting?.mentee_avatar} variant="outlined"/>
                </AvatarGroup>
                <Typography sx={{ fontSize: '2rem', fontWeight: 'bold'}}>
                    {thisMeeting?.mentor_first_name} {thisMeeting?.mentor_last_name}  &  
                    <br />{thisMeeting?.mentee_first_name} {thisMeeting?.mentee_last_name}
                </Typography>
              </CardContent>
              </Card>
              <Card sx={{ width: '82vw', maxWidth: '100%', boxShadow: 'lg' }}>
              <CardContent>
                <Stack direction='column' justifyContent="flex-start" alignItems="baseline" margin='5px' spacing={1.5}>
                    <Stack direction='row' spacing={1}>
                        <Typography sx={{ fontSize: '25px', fontWeight: 'bold'}}>Date:</Typography>
                        <Typography sx={{ fontSize: '25px'}}>{moment(thisMeeting?.meeting_date).format('LL')}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography sx={{ fontSize: '25px', fontWeight: 'bold'}}>Time:</Typography>
                        <Typography sx={{ fontSize: '25px' }}>{moment(thisMeeting?.meeting_start, 'hh:mm:ss').format('h:mm A')} -{' '}
                        {moment(thisMeeting?.meeting_end, 'hh:mm:ss').format('h:mm A')}</Typography>
                    </Stack>
                    <Stack direction='column' spacing={1}>
                        <Typography sx={{ fontSize: '25px', fontWeight: 'bold'}}>Link/Location:</Typography>
                        <Typography sx={{ fontSize: '25px' }}>{thisMeeting?.meeting_link}</Typography>
                    </Stack>
                    <Stack direction='column' spacing={1}>
                        <Typography sx={{ fontSize: '25px', fontWeight: 'bold'}}>Notes:</Typography>
                        <Typography sx={{ fontSize: '25px' }}>{thisMeeting?.meeting_notes}</Typography>
                    </Stack>
                </Stack>
              </CardContent>
            </Card>
            </Stack>
          </Box>
        </Grid>
      </div>
    </>
  );
}
