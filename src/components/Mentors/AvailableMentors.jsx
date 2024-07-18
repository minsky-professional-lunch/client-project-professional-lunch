import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography } from '@mui/joy';
import MentorItem from './MentorItem';

export default function AvailableMentors() {
  const dispatch = useDispatch();
  const profiles = useSelector((store) => store.profiles);
  console.log('Profiles:', profiles);
  const mentors = profiles.filter((profile) => profile.isMentor);
  console.log('Mentors', mentors);
  const user = useSelector((store) => store.user);
  console.log('User', user);
  const availableMentors = mentors.filter(
    (mentor) => !user.mentorships.includes(mentor.id)
  );
  console.log('Available Mentors', availableMentors);
  const interestMentors = useSelector((store) => store.menteeSearchProfiles);
  console.log('Interest Mentors', interestMentors);
  const genderMentors = useSelector((store) => store.menteeSearchProfiles);
  console.log('Gender Mentors', genderMentors);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILES' });
    dispatch({ type: 'FETCH_INTEREST_PROFILES'});
    dispatch({ type: 'FETCH_GENDER_PROFILES'});
  }, []);

  return (
    <>
      <div className='container'>
        <h1>All Available Mentors</h1>
        <Stack>
          {availableMentors.map((mentor) => (
            <MentorItem key={mentor.id} mentor={mentor} />
          ))}
        </Stack>
      </div>
      <div>
        <h1>Similar Mentors</h1>
          {/* <Stack>
            {interestMentors.map((mentor) =>)}
          </Stack> */}
      </div>
    </>
  );
}
