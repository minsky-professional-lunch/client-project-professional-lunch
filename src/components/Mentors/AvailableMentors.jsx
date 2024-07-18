import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography } from '@mui/joy';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MentorItem from './MentorItem';
import MentorsByGender from './MentorsByGender/MentorsByGender';

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

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILES' });
    dispatch({ type: 'FETCH_INTEREST_PROFILES' });
  }, []);

  return (
    <>
      <div className='container'>
        <h1>Available Mentors</h1>
        <div>
          <h3>All Mentors</h3>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls='panel1-content'
              id='panel1-header'
            >
              <Typography>All Mentors</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                {availableMentors.map((mentor) => (
                  <MentorItem key={mentor.id} mentor={mentor} />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </div>
        <div>
          <h3>Mentors Based on Your Interests</h3>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls='panel1-content'
              id='panel1-header'
            >
              <Typography>Mentors with similar interests</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack>
                {interestMentors.map((mentor) => (
                  <MentorItem key={mentor.id} mentor={mentor} />
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </div>
        <div>
          <h3>Mentors Based on Gender</h3>
          <MentorsByGender />
        </div>
      </div>
    </>
  );
}
