import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useScript } from '../../hooks/useScript';
import { useEffect, useState } from 'react';
import { Avatar, Stack, Typography } from '@mui/joy';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Badge from '@mui/joy/Badge';
import Input from '@mui/joy/Input';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';

export default function RegisterForm4() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [availability, setAvailability] = useState([{ day: '', time: '' }]);
  const [avatar, setAvatar] = useState({avatar: ''});
  const days = useSelector((store) => store.dayReducer);
  const times = useSelector((store) => store.timeReducer);
  const regInfo = useSelector(
    (store) => store.registrationReducer.registrationReducer
  );
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({
      type: 'FETCH_DAYS',
    });
    dispatch({
      type: 'FETCH_TIMES',
    });
  }, [dispatch]);

  const openWidget = () => {
    !!window.cloudinary &&
      window.cloudinary
        .createUploadWidget(
          {
            sources: ['local', 'url', 'camera'],
            cloudName: 'dz2bil44j',
            uploadPreset: 'hl5wdxak',
          },
          (error, result) => {
            if (!error && result && result.event === 'success') {
              setAvatar({...avatar,
                avatar: result.info.secure_url
              })
            }
          },
        )
        .open();
  };

  const handleDayChange = (index, event) => {
    console.log('Day Change event', event);
    console.log('Day Change index', index);
    console.log('target.value', event.target.value);
    const newAvailability = [...availability];
    newAvailability[index].day = event.target.value;
    setAvailability(newAvailability);
  };

  const handleTimeChange = (index, event) => {
    console.log('Time Change event', event);
    console.log('Time Change index', index);
    console.log('target.value', event.target.value);
    const newAvailability = [...availability];
    newAvailability[index].time = event.target.value;
    setAvailability(newAvailability);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    setAvailability([...availability, { day: '', time: '' }]);
  };

  const registerUser = (event) => {
    event.preventDefault();
    if (availability.every((a) => a.day && a.time)) {
      dispatch({
        type: 'ADD_FOURTH_PAGE_INFO',
        payload: {
          availability: availability,
          avatar: avatar,
        },
      });
      history.push('/');
    } else {
      alert('Please select both a day and a time for all availabilities.');
    }

    dispatch({
      type: 'REGISTER_PROFILE',
      payload: {
        first_name: regInfo.firstName,
        last_name: regInfo.lastName,
        email: regInfo.email,
        gender: Number(regInfo.gender),
        school: user.isMentor ? 16 : Number(regInfo.school),
        avatar: avatar,
        bio: regInfo.bio,
        linkedin: regInfo.linkedin,
        availability: availability,
        interests: regInfo.interests,
      },
    });
  };

  return (
    <div className='container'>
      <h2>Create Profile (Page 3 of 3)</h2>
      <h4>Upload Avatar:</h4>
      <Stack
        direction='column'
        justifyContent='space-evenly'
        alignItems='center'
        spacing={3}
      >
        <Badge
          onClick={openWidget}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant='outlined'
          badgeContent={
            <CameraAltIcon
              sx={{
                width: '35px',
                height: '35px',
                color: '#343A40',
                cursor: 'pointer',
              }}
            />
          }
          badgeInset='14%'
          sx={{ '--Badge-paddingX': '0px' }}
        >
          <Avatar
            variant='outlined'
            sx={{ width: 150, height: 150 }}
            src={avatar}
          />
        </Badge>
        {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
      </Stack>
      <br />
      <h4>Select Availabilities</h4>
      {/* {availability.map((avail, index) => (
        <form className='formPanel' key={index}>
          <select onChange={(e) => handleDayChange(index, e)} value={avail.day}>
            <option value='' disabled>
              Select a day
            </option>
            {days.map((day) => (
              <option value={day.id} key={day.id}>
                {day.day}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => handleTimeChange(index, e)}
            value={avail.time}
          >
            <option value='' disabled>
              Select a time
            </option>
            {times.map((time) => (
              <option key={time.id} value={time.id}>
                {time.time}
              </option>
            ))}
          </select>
          <button onClick={handleAdd}>+</button>
        </form>
      ))} */}
      {availability.map((avail, index) => (
        <form className='formPanel' key={index}>
          <Box sx={{
            py: 2,
            display: 'grid',
            gap: 2,
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <FormControl size='small'>
            <InputLabel>Select a day</InputLabel>
            <Select
              label='Select a day'
              onChange={(e) => handleDayChange(index, e)}
              slotProps={{ input: { id: 'day' }}}
              value={avail.day}
            >
              {days.map((day) => (
                <MenuItem value={day.id} key={day.id}>
                  {day.day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size='small'>
            <InputLabel>Select a time of day</InputLabel>
            <Select
              label='Select a time of day'
              onChange={(e) => handleTimeChange(index, e)}
              slotProps={{ input: { id: 'time' }}}
              value={avail.time}
            >
              {times.map((time) => (
                <MenuItem key={time.id} value={time.id}>
                  {time.time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button color='neutral' sx={{ mb:1}} onClick={handleAdd}>Add Availability</Button>
          </Box>
        </form>
      ))}
      <ButtonGroup spacing='0.5rem' color='primary' variant='solid'>
        <Button color='neutral' onClick={() => history.push('/registration/3')}>Back</Button>
        <Button color='neutral' onClick={(event) => registerUser(event)}>Register</Button>
      </ButtonGroup>
    </div>
  );
}
