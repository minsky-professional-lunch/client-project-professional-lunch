import React from 'react';
import './Footer.css';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import GroupsIcon from '@mui/icons-material/Groups';
import ListIcon from '@mui/icons-material/List';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

function Footer() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const user = useSelector(store => store.user);

  const goHome = () => {
    history.push('/home')
  }

  const goMentorships = () => {
    history.push('/my-mentors');
  }

  const goMeetings = () => {
    history.push('/my-groups');
  }
  
  const goResources = () => {
    history.push('/resources');
  }

  return (
  <>
  <br />
  <br />
  <br />
  <br />
  {user.id && (
      <Box sx={{position: "fixed", bottom: 0, margin: "auto", width: "100vw", zIndex: 1 }}>
        <BottomNavigation
          sx={{ bgcolor: "#15a140" }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction sx={{ color: "#FFFFFF" }} label="Home" icon={<HomeIcon  sx={{ color: "#FFFFFF" }} />} onClick={goHome} />
          <BottomNavigationAction sx={{ color: "#FFFFFF" }} label="Mentorships" icon={<GroupsIcon sx={{ color: "FFFFFF" }} />} onClick={goMentorships}/>
          <BottomNavigationAction sx={{ color: "#FFFFFF" }} label="Meetings" icon={<EventIcon sx={{ color: "#FFFFFF" }} />} onClick={goMeetings}/>
          <BottomNavigationAction sx={{ color: "#FFFFFF" }} label="Resources" icon={<ListIcon sx={{ color: "FFFFFF" }} />} onClick={goResources}/>
        </BottomNavigation>
      </Box>
    )}
  
    {!user.id && (
      <></>
    )}
  </>
);
}

export default Footer;
