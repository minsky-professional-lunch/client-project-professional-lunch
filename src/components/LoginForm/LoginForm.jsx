import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
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
    <form className="formPanel" onSubmit={login}>
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
        <h3 className="alert" role="alert">
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
            label='Password'
            placeholder='Password'
            type='password'
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </FormControl>
        <Button className="btn" type="submit" name="submit" value="Log In" sx={{ mb:1 }}>Log In</Button>
      {/* <div>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div> */}
      </Box>
    </form>
  );
}

export default LoginForm;
