import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography } from '@mui/joy';
import MentorItem from '../MentorItem';

export default function OtherMentors() {
  const dispatch = useDispatch();
  const profiles = useSelector((store) => store.profiles);
  console.log('Profiles:', profiles);
  const mentors = profiles.filter((profile) => profile.isMentor);
  console.log('Mentors', mentors);
  const user = useSelector((store) => store.user);
  console.log('User', user);
  const otherGenderMentors = mentors.filter((mentors) => mentors.gender === 5);
  console.log('Other Gender Mentors', otherGenderMentors);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILES' });
  }, []);

  return (
    <div>
      <Stack>
        {otherGenderMentors.map((mentor) => (
          <MentorItem key={mentor.id} mentor={mentor} />
        ))}
      </Stack>
    </div>
  );
}
