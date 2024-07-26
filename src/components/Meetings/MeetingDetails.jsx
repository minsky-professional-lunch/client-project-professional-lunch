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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import ArchiveIcon from '@mui/icons-material/Archive';

export default function MeetingDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const user = useSelector(store => store.user);
  console.log('params', params);
  const meetings = useSelector((store) => store.meetings);
  console.log('Meetings', meetings);
  const thisMeeting = meetings.filter(
    (meeting) => meeting.meeting_id === Number(params.id)
  )[0];
  console.log('This meeting', thisMeeting);
  const [open, setOpen] = React.useState(false);

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

  const accept = (meetingId) => {
    console.log('clicked', meetingId);
    dispatch({ type: 'ACCEPT_MEETING', payload: meetingId });
    dispatch({ type: 'FETCH_MEETINGS' });
    history.push('/my-meetings');
}

  const deny = (meetingId) => {
      console.log('clicked', meetingId);
      dispatch({ type: 'DENY_MEETING', payload: meetingId });
      history.push('/my-meetings');
  }

  const deleteMeeting = (meetingId) => {
    dispatch({ type: 'DELETE_MEETING', payload: meetingId });
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
          {thisMeeting?.meeting_status === 'Accepted' ? 
          <>
          <React.Fragment>
              <Tooltip title='Archive Meeting' variant='soft'>
                <ArchiveIcon sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => setOpen(true)}/>
              </Tooltip>
              <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                  <DialogTitle>
                    <WarningRoundedIcon />
                    Confirmation
                  </DialogTitle>
                  <Divider />
                  <DialogContent>
                    Are you sure you want to archive this meeting?
                  </DialogContent>
                  <DialogActions>
                    <Button variant="solid" color="success" onClick={() => { 
                        setOpen(false); 
                        archiveMeeting(thisMeeting?.meeting_id)}}>
                      Archive meeting
                    </Button>
                    <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                  </DialogActions>
                </ModalDialog>
              </Modal>
            </React.Fragment>
          </>
          : 
          <>
          {user.isMentor ? 
          <AddCircleOutlineIcon sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => accept(thisMeeting?.meeting_id)}/>
          : 
          <></>
          }
          </>
          }
          {thisMeeting?.meeting_status === 'Denied - not available at this time' && !user.isMentor ? 
          <>
            <DeleteForever sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => deleteMeeting(thisMeeting?.meeting_id)}/>
          </>
          : 
          <></>
          }
          {thisMeeting?.meeting_status === 'Pending' ? 
          <></>
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
                <Typography sx={{ fontSize: '1.3rem'}}><b>Status</b>: {thisMeeting?.meeting_status}</Typography>
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
              {user.isMentor && thisMeeting?.meeting_status === 'Pending' ? 
            <React.Fragment>
              <Button
                variant="outlined"
                color="danger"
                endDecorator={<DeleteForever />}
                onClick={() => setOpen(true)}
                sx={{fontSize: '25px'}}
              >
                Deny
              </Button>
              <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog">
                  <DialogTitle>
                    <WarningRoundedIcon />
                    Confirmation
                  </DialogTitle>
                  <Divider />
                  <DialogContent>
                    Are you sure you want to deny this meeting?
                  </DialogContent>
                  <DialogActions>
                    <Button variant="solid" color="danger" onClick={() => { 
                        setOpen(false); 
                        deny(thisMeeting?.meeting_id)}}>
                      Deny meeting
                    </Button>
                    <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                  </DialogActions>
                </ModalDialog>
              </Modal>
            </React.Fragment>
              : 
              <></>
              }
            </Stack>
          </Box>
        </Grid>
      </div>
    </>
  );
}
