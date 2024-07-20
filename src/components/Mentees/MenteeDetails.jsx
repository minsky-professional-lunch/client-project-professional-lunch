import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Avatar, Stack, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';

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
    <div className='container'>
      <h1>Mentee Details</h1>
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
    </div>
  );
}
