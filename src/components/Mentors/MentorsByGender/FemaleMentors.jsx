import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography } from '@mui/joy';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
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

  const mentorsPerPage = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMentors = femaleMentors.slice(
    currentIndex,
    currentIndex + mentorsPerPage
  );

  const nextMentors = () => {
    if (currentIndex + mentorsPerPage >= femaleMentors.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + mentorsPerPage);
    }
  };

  const previousMentors = () => {
    if (currentIndex + mentorsPerPage >= femaleMentors.length) {
      setCurrentIndex(0);
    } else {
      if (currentIndex === 0) {
        return;
      } else {
        setCurrentIndex(currentIndex - mentorsPerPage);
      }
    }
  };

  return (
    <div>
      <Stack>
        {currentMentors.map((mentor) => (
          <MentorItem key={mentor.id} mentor={mentor} />
        ))}
      </Stack>
      <Stack
        direction='row'
        justifyContent='space-between'
        sx={{ margin: '6px' }}
      >
        <IconButton onClick={previousMentors}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton onClick={nextMentors}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Stack>
    </div>
  );
}
