import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Checkbox from '@mui/joy/Checkbox';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(false);
  const errors = useSelector((store) => store.errors);
  const history = useHistory();
  const dispatch = useDispatch();

  // end registerUser

  const nextPage = () => {
    event.preventDefault();

    if (password !== confirmPassword) {
      // Add validation error handling
      alert('Passwords do not match');
      return;
    }

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        isMentor: Boolean(role),
      },
    });

    setRole(false);
  };

  return (
    <form className='formPanel' onSubmit={nextPage}>
      <Box
        sx={{
          py: 2,
          display: 'grid',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <h2>Register User</h2>
        {errors.registrationMessage && (
          <h3 className='alert' role='alert'>
            {errors.registrationMessage}
          </h3>
        )}
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            label='Username'
            placeholder='Username'
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
          <FormHelperText>Please use an email address.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            label='Password'
            placeholder='Password'
            type={showPassword ? 'text' : 'password'}
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            endDecorator={
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            label='Confirm Password'
            placeholder='Confirm Password'
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            required
            onChange={(event) => setConfirmPassword(event.target.value)}
            endDecorator={
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Select Mentor or Mentee</FormLabel>
          <RadioGroup>
            <Radio
              id='Mentor'
              label='Mentor'
              value={true}
              name='role'
              onChange={(event) => setRole(true)}
            />
            <Radio
              id='Mentee'
              label='Mentee'
              value={false}
              name='role'
              onChange={(event) => setRole(false)}
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Confirm age?</FormLabel>
          <Checkbox label='I am 18 years of age or older' required />
        </FormControl>
        <ButtonGroup spacing='0.5rem' color='primary' variant='solid'>
          <Button color='neutral' onClick={() => history.push('/login')} >Back</Button>
          <Button color='neutral' className='btn' type='submit' name='submit' value='Next'>
            Next
          </Button>
        </ButtonGroup>
      </Box>
    </form>
  );
}

export default RegisterForm;
