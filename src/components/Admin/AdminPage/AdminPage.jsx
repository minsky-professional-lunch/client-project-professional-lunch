import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import GendersList from '../Genders/GendersList/GendersList';
import InterestsList from '../Interests/InterestsList/InterestsList';
import MenteeList from '../Mentees/MenteeList/MenteeList';
import MentorList from '../Mentors/MentorList/MentorList';
import MentorshipList from '../Mentorships/MentorshipList/MentorshipList';
import SchoolsList from '../Schools/SchoolsList/SchoolsList';
import MeetingsList from '../Meetings/MeetingsList/MeetingsList';

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

export default function AdminPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='container'>
      <h1>Admin Page</h1>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant='fullWidth'
            textColor="inherit"
          TabIndicatorProps={{
            style: {
              backgroundColor: 'black',
            }
          }}
          >
            <Tab label='Mentors' {...a11yProps(0)} sx={{
              '&.Mui-selected': {
                color: 'black',
              },
            }} />
            <Tab label='Mentees' {...a11yProps(1)} sx={{
              '&.Mui-selected': {
                color: 'black',
              },
            }}/>
            <Tab label='Mentorships' {...a11yProps(2)} sx={{
              '&.Mui-selected': {
                color: 'black',
              },
            }}/>
            <Tab label='Meetings' {...a11yProps(3)} sx={{
              '&.Mui-selected': {
                color: 'black',
              },
            }}/>
            <Tab label='Interests' {...a11yProps(4)} sx={{
              '&.Mui-selected': {
                color: 'black',
              },
            }}/>
            <Tab label='Schools' {...a11yProps(5)} sx={{
              '&.Mui-selected': {
                color: '',
              },
            }}/>
            <Tab label='Genders' {...a11yProps(6)} sx={{
              '&.Mui-selected': {
                color: 'black',
              },
            }}/>
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <MentorList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <MenteeList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <MentorshipList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <MeetingsList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <InterestsList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <SchoolsList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <GendersList />
        </CustomTabPanel>
      </Box>
    </div>
  );
}
