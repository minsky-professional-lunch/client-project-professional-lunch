import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography } from '@mui/joy';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButton } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import MentorItem from '../MentorItem';
import MaleMentors from './MaleMentors';
import FemaleMentors from './FemaleMentors';
import NonBinaryMentors from './NonBinaryMentors';
import NotSayMentors from './NotSayMentors';
import OtherMentors from './OtherMentors';

export default function MentorAccordions() {
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

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILES' });
  }, []);

  const mentorsPerPage = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentMentors = availableMentors.slice(
    currentIndex,
    currentIndex + mentorsPerPage
  );

  const nextMentors = () => {
    if (currentIndex + mentorsPerPage >= availableMentors.length) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + mentorsPerPage);
    }
  };

  const previousMentors = () => {
    if (currentIndex + mentorsPerPage >= availableMentors.length) {
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
    <>
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
            {currentMentors.map((mentor) => (
              <MentorItem key={mentor.id} mentor={mentor} />
            ))}
          </Stack>
        </AccordionDetails>
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
      </Accordion>
      
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          <Typography>Male Mentors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MaleMentors />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          <Typography>Female Mentors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FemaleMentors />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          <Typography>Non-Binary Mentors</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NonBinaryMentors />
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          <Typography>Mentors that prefer not to say gender</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NotSayMentors />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel1-content'
          id='panel1-header'
        >
          <Typography>Mentors of other gender</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OtherMentors />
        </AccordionDetails>
      </Accordion> */}
    </>
  );
}
