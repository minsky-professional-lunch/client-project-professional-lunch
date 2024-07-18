import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography } from '@mui/joy';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MaleMentors from './MaleMentors';
import FemaleMentors from './FemaleMentors';
import NonBinaryMentors from './NonBinaryMentors';
import NotSayMentors from './NotSayMentors';
import OtherMentors from './OtherMentors';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MentorsByGender() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    dispatch({ type: 'FETCH_INTEREST_PROFILES'});
    // dispatch({ type: 'FETCH_GENDER_PROFILES'});
  }, []);

  return (
    <div>
      {/* <div>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            <Tab label='Male' {...a11yProps(0)} />
            <Tab label='Female' {...a11yProps(1)} />
            <Tab label='Non-Binary' {...a11yProps(2)} />
            <Tab label='Prefer not to say' {...a11yProps(3)} />
            <Tab label='Other' {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <MaleMentors />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <FemaleMentors />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <NonBinaryMentors />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <NotSayMentors />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <OtherMentors />
        </CustomTabPanel>
      </Box>
      </div> */}
      <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>Male</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MaleMentors />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Female</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FemaleMentors />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Non-Binary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NonBinaryMentors/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Prefer not to say</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NotSayMentors/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Other Gender</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <OtherMentors/>
        </AccordionDetails>
      </Accordion>
    </div>
    </div>
  )
}
