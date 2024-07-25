import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormHelperText from '@mui/joy/FormHelperText';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className='formPanel' onSubmit={login}>
      <Box
        sx={{
          py: 2,
          display: 'grid',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <h2>Login</h2>
        {errors.loginMessage && (
          <h3 className='alert' role='alert'>
            {errors.loginMessage}
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
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            id='password'
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
        <Button
          color='neutral'
          className='btn'
          type='submit'
          name='submit'
          value='Log In'
          sx={{ mb: 1 }}
        >
          Log In
        </Button>
        {/* <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div> */}
      </Box>
    </form>
  );
}

export default LoginForm;
