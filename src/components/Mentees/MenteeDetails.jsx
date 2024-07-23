import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Avatar, Stack, Typography, Grid, Box } from '@mui/joy';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import Chip from '@mui/joy/Chip';
import Tooltip from '@mui/joy/Tooltip';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import OpenInNew from '@mui/icons-material/OpenInNew';

export default function MenteeDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  console.log('User', user);
  const details = useSelector((store) => store.mentDetails);
  console.log('Details', details);
  const mentorships = useSelector((store) => store.mentorships);
  const thisMentorship = mentorships?.filter(
    (mentee) =>
      mentee.mentee_user_id === Number(params.id)
  )[0];
  console.log('This mentorship', thisMentorship);
  console.log('Mentorships', mentorships);

  useEffect(() => {
    dispatch({ type: 'FETCH_MENT_DETAILS', payload: params.id });
    dispatch({ type: 'FETCH_MENTORSHIPS' });
  }, []);

  const remove = (mentorshipId) => {
    console.log('Clicked', mentorshipId);
    dispatch({
      type: 'DELETE_MENTORSHIP',
      payload: { mentorshipId: mentorshipId },
    });
    history.push('/home');
  };

  const back = () => {
    history.push('/my-mentees');
  }

  // check to see if data is done loading
  if (!details.profile) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
    {/* <div className='container'>
      <h1>Profile Details</h1>
      <Stack
        direction='column'
        justifyContent='space-evenly'
        alignItems='center'
        spacing={3}
      >
        <Avatar
          variant='outlined'
          sx={{ width: 150, height: 150 }}
          src={details?.profile?.avatar}
        ></Avatar>
        <Typography>
          {details?.profile?.first_name} {details?.profile?.last_name}
        </Typography>
        <Typography>
          Areas of Expertise:{' '}
          <ul>
            {details?.details?.interests?.map((interest) => (
              <li>{interest.interest}</li>
            ))}
          </ul>
        </Typography>
        <Typography>
          Availability:{' '}
          <ul>
            {details?.details?.availability?.map((avail) => (
              <li>
                {avail.day} @ {avail.time}
              </li>
            ))}
          </ul>
        </Typography>
        </Stack>
        <Button onClick={() => remove(thisMentorship.id)}>Remove</Button>
        <Button onClick={back}>
          Back
        </Button>
    </div> */}
    <div className='container'>
    <Stack direction='row' justifyContent="space-between" alignItems="center" sx={{marginBottom: '25px'}}>
      <Tooltip title="Back" variant="soft">
        <ArrowBackIosIcon sx={{ fontSize: '2.5rem', cursor: 'pointer' }} onClick={back}/>
      </Tooltip>
      <Typography level='h2' >Profile Details</Typography>
      <Tooltip title="Remove" variant='soft'>
        <PersonRemoveIcon sx={{ fontSize: '3rem', cursor: 'pointer' }} onClick={() => remove(thisMentorship.id)}/>
      </Tooltip>
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
        <Avatar src={details?.profile?.avatar} sx={{ '--Avatar-size': '10rem', marginBottom: '3px' }} />
          <Typography sx={{ fontSize: '2rem', fontWeight: 'bold'}} level='h2'>
            {details?.profile?.first_name} {details?.profile?.last_name}
          </Typography>
        <Typography sx={{ fontSize: '1.5rem' }} level='body-lg'>
          {thisMentorship?.mentee_school}
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
    </div>
    </>
  );
}
