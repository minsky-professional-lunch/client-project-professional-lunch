import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Avatar, Stack, Typography, Grid, Box , Card, CardContent } from '@mui/joy';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Add from '@mui/icons-material/Add';
import Tooltip from '@mui/joy/Tooltip';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Chip from '@mui/joy/Chip';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

export default function MentorDetails() {
  const params = useParams();
  console.log('Params.id', params.id);
  const dispatch = useDispatch();
  const history = useHistory();
  const details = useSelector((store) => store.mentDetails);
  console.log('Details', details);
  const user = useSelector((store) => store.user);
  console.log('User', user);
  const mentorships = useSelector((store) => store.mentorships);
  const thisMentorship = mentorships?.filter(
    (mentor) =>
      mentor.mentor_user_id === Number(params.id)
  )[0];
  console.log('This mentorship', thisMentorship);
  console.log('Mentorships', mentorships);
  const [open, setOpen] = React.useState(false);
  const [requested, setRequested] = useState(false);

  const [newMeeting, setNewMeeting] = useState({
    mentorship_id: '',
    date: '',
    start: '',
    end: '',
    link: '',
    notes: '',
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_MENT_DETAILS', payload: params.id });
    dispatch({ type: 'FETCH_MENTORSHIPS' });
    console.log('New meeting', newMeeting);
  }, []);

  const connect = (mentorId) => {
    console.log('Clicked', mentorId);
    dispatch({ type: 'REQUEST_MENTORSHIP', payload: mentorId });
    setRequested(!requested);
  };

  const remove = (mentorshipId) => {
    console.log('Clicked', mentorshipId);
    dispatch({
      type: 'DELETE_MENTORSHIP',
      payload: { mentorshipId: mentorshipId },
    });
    history.push('/home');
  };

  const request = (event) => {
    event.preventDefault();
    setOpen(false);
    dispatch({ type: 'REQUEST_MEETING', payload: {newMeeting: newMeeting, mentorID: params.id} });
    console.log('submit');
    console.table(newMeeting);
  };

  const back = () => {
    if (!user.isMentor) {
      // history.push('/my-mentors');
      history.goBack();
    } else if (user.isMentor) {
      // history.push('/my-mentees');
      history.goBack();
    }
  }

  const handleChange = (event) => {
    console.log(event.target.id);
    let myMeetingId = thisMentorship?.id;
    console.log('myMeetingId', myMeetingId);
    let myCopyMeeting = {...newMeeting, mentorship_id: myMeetingId};
    console.log('meeting', myCopyMeeting);
    switch (event.target.id) {
      case 'date':
        setNewMeeting({ ...myCopyMeeting, date: event.target.value });
        break;
      case 'start':
        setNewMeeting({ ...myCopyMeeting, start: event.target.value });
        break;
      case 'end':
        setNewMeeting({ ...myCopyMeeting, end: event.target.value });
        break;
      case 'link':
        setNewMeeting({ ...myCopyMeeting, link: event.target.value });
        break;
      case 'notes':
        setNewMeeting({ ...myCopyMeeting, notes: event.target.value });
        break;
    }
  };

  // check to see if data is done loading
  if (!details.profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className='container'>
      <Stack direction='row' justifyContent="space-between" alignItems="center" sx={{marginBottom: '25px'}}>
        <Tooltip title="Back" variant="soft">
          <ArrowBackIosIcon sx={{ fontSize: '2.5rem', cursor: 'pointer' }} onClick={back}/>
        </Tooltip>
        <Typography level='h2' >Profile Details</Typography>
        {!user.mentorships.includes(details.profile.id) ? (
          <Tooltip title="Connect" variant="soft">
            <PersonAddAlt1Icon sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => connect(details?.profile?.id)} />
          </Tooltip>
        ) : (
          <Tooltip title="Remove" variant='soft'>
            <PersonRemoveIcon sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => remove(thisMentorship.id)}/>
          </Tooltip>
        )}
      </Stack>
      <Grid container justifyContent="center">
        <Box sx={{ maxHeight: '90vh' }}>
        <Stack direction='column' spacing={1.5} alignItems='center'>
        <Card
          sx={{
            width: '82vw',
            maxWidth: '100%',
            boxShadow: 'lg',
          }}
        >
          <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
            <Avatar src={details?.profile?.avatar} sx={{ '--Avatar-size': '10rem', marginBottom: '3px' }}/>
            <Typography sx={{ fontSize: '2rem', fontWeight: 'bold'}} level='h2'>
              {details?.profile?.first_name} {details?.profile?.last_name}
            </Typography>
            <Stack direction='row' alignItems='center' spacing={1}>
              <Button component="a" href={`mailto:${details?.profile?.email}`} variant='plain' color='neutral'>
                <EmailIcon sx={{ fontSize: '2rem' }} />
              </Button>
                {details?.profile?.linkedin != null ? 
                <Button component="a" href={details?.profile?.linkedin} variant='plain' color='neutral'>
                  <LinkedInIcon sx={{ fontSize: '2.5rem' }} />
                </Button>
              : 
              <></>
              }
            </Stack>
          </CardContent>
        </Card>
        <Card sx={{
            width: '82vw',
            maxWidth: '100%',
            boxShadow: 'lg',
          }}>
            <Stack direction='column'>
              <Typography level='h3'>About Me</Typography>
              <Typography sx={{ fontSize: '1.3rem' }}>{details?.profile?.bio}</Typography>
            </Stack>
        </Card>
        <Card sx={{
        width: '82vw',
        maxWidth: '100%',
        boxShadow: 'lg'
          }}>
            <Stack direction='column'>
              <Typography level='h3'>Interests</Typography>
              <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
              {details?.details?.interests?.map((interest) => (
                  <Chip sx={{ fontSize: '1.3rem', marginTop: '10px'}}>{interest.interest}</Chip>
                ))}
                </Stack>
            </Stack>
        </Card>
        <Card sx={{
            width: '82vw',
            maxWidth: '100%',
            boxShadow: 'lg'
          }}>
            <Stack direction='column'>
              <Typography level='h3'>Availability</Typography>
              <Stack direction='row' spacing={1} flexWrap='wrap' useFlexGap>
              {details?.details?.availability?.map((avail) => (
                  <Chip sx={{ fontSize: '1.3rem', marginTop: '10px' }}>
                    {avail.day} @ {avail.time}
                  </Chip>
                ))}
                </Stack>
            </Stack>
        </Card>
        </Stack>
        </Box>
        </Grid>
      <Stack
        direction='column'
        justifyContent='space-evenly'
        alignItems='center'
        spacing={3}
      >
        {user.mentorships.includes(details.profile.id) &&
        thisMentorship?.status === 'accepted' ? (
          <React.Fragment>
            <Button startDecorator={<Add />} onClick={() => setOpen(true)}>
              Request Meeting
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalDialog>
                <DialogTitle>Request new meeting</DialogTitle>
                <DialogContent>Please select a date and time</DialogContent>
                <form onSubmit={request}>
                  <Stack spacing={2}>
                    <FormControl>
                      <FormLabel>Date</FormLabel>
                      <Input
                        autoFocus
                        required
                        type='date'
                        slotProps={{ input: { id: 'date' } }}
                        value={newMeeting.date}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Start Time</FormLabel>
                      <Input
                        required
                        type='time'
                        slotProps={{ input: { id: 'start' } }}
                        value={newMeeting.start}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>End Time</FormLabel>
                      <Input
                        required
                        type='time'
                        slotProps={{ input: { id: 'end' } }}
                        value={newMeeting.end}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Link/Location</FormLabel>
                      <Input
                        value={newMeeting.link}
                        slotProps={{ input: { id: 'link' } }}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Notes</FormLabel>
                      <Input
                        value={newMeeting.notes}
                        slotProps={{ input: { id: 'notes' } }}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Button type='submit'>Submit</Button>
                  </Stack>
                </form>
              </ModalDialog>
            </Modal>
          </React.Fragment>
        ) : (
          <></>
        )}
      </Stack>
    </div>
  );
}
