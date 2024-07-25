import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

function UserPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'CHECK_FOR_PROFILE' });
  }, []);

  const history = useHistory();

  const createProfile = () => {
    console.log('button clicked');
    history.push('/registration/2');
  };
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <Stack className='container' sx={{ mb: 2 }} direction='column' alignItems='center' justifyContent='center' spacing={4}>
      <Card variant='outlined' sx={{ width: 320 }}>
        <CardOverflow>
          <AspectRatio ratio='2'>
            <img
              src='./images/PLaunch.png'
              loading='lazy'
              alt='Professional Launch Logo'
            />
          </AspectRatio>
        </CardOverflow>
        <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
          <Typography sx={{ fontSize: '26px' }} level='title-lg'>
            Welcome to Professional Launch!
          </Typography>
          <Typography level='title-md'>
            Positively connecting the less connected.
          </Typography>
          <Typography level='body-md'>
            Thank you for creating an account!
          </Typography>
          <Typography level='body-sm'>
            Please continue your Professional Launch journey by creating your
            profile.
          </Typography>
        </CardContent>
        <CardOverflow sx={{ bgcolor: 'background.level1' }}>
          <CardActions buttonFlex='1'>
            <ButtonGroup
              variant='outlined'
              sx={{ bgcolor: 'background.surface' }}
            >
              <Button
                variant='outlined'
                color='neutral'
                onClick={() => createProfile()}
              >
                Create Profile
              </Button>
              <LogOutButton className='btn' />
            </ButtonGroup>
          </CardActions>
        </CardOverflow>
      </Card>

      {/* <h2>
        Welcome to Professional Launch! Positively connecting the less
        connected. Thank you for creating your account.
      </h2>
      <h3>
        Please continue your Professional Launch journey by creating a profile.
      </h3>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant='outlined'
          color='neutral'
          onClick={() => createProfile()}
        >
          Create Profile
        </Button>
        <LogOutButton className='btn' />
      </Box> */}
    </Stack>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
