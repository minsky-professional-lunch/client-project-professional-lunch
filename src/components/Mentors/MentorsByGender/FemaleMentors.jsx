import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography } from '@mui/joy';
import MentorItem from '../MentorItem';

export default function FemaleMentors() {
  const dispatch = useDispatch();
  const profiles = useSelector((store) => store.profiles);
  console.log('Profiles:', profiles);
  const mentors = profiles.filter((profile) => profile.isMentor);
  console.log('Mentors', mentors);
  const user = useSelector((store) => store.user);
  console.log('User', user);
  const femaleMentors = mentors.filter((mentors) => mentors.gender === 2);
  console.log('Female Mentors', femaleMentors);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILES' });
  }, []);

  return (
    <div>
      <Stack>
        {femaleMentors.map((mentor) => (
          <MentorItem key={mentor.id} mentor={mentor} />
        ))}
      </Stack>
    </div>
  );
}
