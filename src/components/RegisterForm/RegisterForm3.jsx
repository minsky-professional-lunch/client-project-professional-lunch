import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

export default function RegisterForm3() {
  const [linkedin, setLinkedin] = useState('');

  const currentUser = useSelector(
    (store) => store.registrationReducer.registrationReducer
  );
  const schools = useSelector((store) => store.schoolsReducer);
  const genders = useSelector((store) => store.gendersReducer);

  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState([]);
  const [availability, setAvailability] = useState('');
  const interestsStore = useSelector((store) => store.interestsReducer);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_INTERESTS',
    });
  }, []);

  const handleInterestsChange = (event, newValue) => {
    if (newValue.length <= 5) {
      setInterests(newValue);
    }
  };

  const nextPage = () => {
    history.push('/registration/4');
    event.preventDefault();
    dispatch({
      type: 'ADD_THIRD_PAGE_INFO',
      payload: {
        linkedin: linkedin,
        interests: interests,
        bio: bio,
      },
    });
  };
  return (
    <div className='container'>
      <h2>Create Profile (Page 2 of 3)</h2>
      <>
        <form onSubmit={nextPage} className='formPanel'>
          <Box
            sx={{
              py: 2,
              display: 'grid',
              gap: 2,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <FormControl>
              <FormLabel>LinkedIn Profile</FormLabel>
              <Input
                label='LinkedIn Profile'
                placeholder='LinkedIn Profile'
                value={linkedin}
                onChange={(event) => setLinkedin(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>User Bio</FormLabel>
              <Textarea
                label='User Bio'
                placeholder='Tell us a little about yourself'
                minRows={4}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Interests</FormLabel>
              <Autocomplete
                multiple
                options={interestsStore}
                value={interests}
                getOptionLabel={(option) => option.interest}
                disableCloseOnSelect
                onChange={handleInterestsChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label='Add Up To 5 Interests'
                    placeholder='Interests...'
                  />
                )}
              />
            </FormControl>
            <Button className='btn' type='submit' name='submit'>
              Next
            </Button>
          </Box>

          {/* <div>
            LinkedIn
            <input
              type='text'
              value={linkedin}
              onChange={(event) => setLinkedin(event.target.value)}
            />
          </div>
          <div>
            Add A Little About You
            <input
              type='text'
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </div>
          <div>
            <Autocomplete
              multiple
              options={interestsStore}
              value={interests}
              getOptionLabel={(option) => option.interest}
              disableCloseOnSelect
              onChange={handleInterestsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='outlined'
                  label='Add Up To 5 Interests'
                  placeholder='Interests...'
                />
              )}
            />
          </div>
          <button type='submit'>Next</button> */}
        </form>
      </>
    </div>
  );
}
