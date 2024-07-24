import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Stack, Typography } from '@mui/joy';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Badge from '@mui/joy/Badge';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Textarea from '@mui/joy/Textarea';
import { TextField, Autocomplete } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';

export default function EditProfileDialog({ open, closeEditProfile, profile}) {
  const dispatch = useDispatch();
  const history = useHistory();

  // const profile = useSelector((store) => store.profileDetails);
  const schools = useSelector((store) => store.schoolsReducer);
  const genders = useSelector((store) => store.gendersReducer);
  const interestsStore = useSelector((store) => store.interestsReducer);
  const profileAvailability = useSelector((store) => store.profileDetails.details.availability);
  const days = useSelector((store) => store.dayReducer);
  const times = useSelector((store) => store.timeReducer);

  const [interests, setInterests] = useState(profile?.details?.interests);
  const [availability, setAvailability] = useState(profile?.details?.availability);
  const [editProfile, setEditProfile] = useState({
    profile: {},
    details: { availability: profileAvailability },
  });
  console.log('Profile', profile, editProfile);


  useEffect(() => {
    setEditProfile(profile);
  }, [profile]); // when profile in redux has finished loading, load into local state so we can edit it

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILE_DETAILS' });
    dispatch({ type: 'FETCH_SCHOOLS' });
    dispatch({ type: 'FETCH_GENDERS' });
    dispatch({ type: 'FETCH_INTERESTS' });
    dispatch({ type: 'FETCH_DAYS' });
    dispatch({ type: 'FETCH_TIMES' });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('clicked');
    console.log('editProfile', editProfile);
    dispatch({ type: 'EDIT_PROFILE', payload: editProfile });
    closeEditProfile();
  };

  const handleInterestsChange = (event, newValue) => {
    console.log('The New Value', newValue);
    console.log('interests', interests);
    if (newValue.length <= 5) {
      setInterests(newValue);
      setEditProfile({
        ...editProfile,
        details: {
          ...editProfile.details,
          interests: newValue,
        },
      });
    }
  };

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
              setEditProfile({
                ...editProfile,
                profile: {
                  ...editProfile.profile,
                  avatar: result.info.secure_url,
                },
              });
            }
          }
        )
        .open();
  };

  return (
    <>
    <Dialog
        open={open}
        onClose={closeEditProfile}
        PaperProps={{ component: 'form', onSubmit: handleSubmit }}
        >
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
              sx={{ mb: 1.5, mt: 1 }}
              placeholder='Bio'
              type='text'
              id='bio'
              label='Bio'
              fullWidth
              multiline
              minRows={3}
              value={editProfile?.profile?.bio}
              className='form-control'
              onChange={(event) =>
                setEditProfile({
                  ...editProfile,
                  profile: { ...editProfile.profile, bio: event.target.value },
                })
              }
            />
            <TextField 
            sx={{ mb: 1.5 }}
            placeholder='Email'
            type='text'
            id='email'
            name='email'
            label='Email'
            className='form-control'
            value={editProfile?.profile?.email}
            onChange={(event) =>
              setEditProfile({
                ...editProfile,
                profile: {
                  ...editProfile.profile,
                  email: event.target.value,
                },
              })
            }
            
            />
             <TextField
              placeholder='LinkedIn'
              className='form-control'
              type='text'
              id='linkedin'
              label='LinkedIn'
              fullWidth
              multiline
              value={editProfile?.profile?.linkedin}
              onChange={(e) =>
                setEditProfile({
                  ...editProfile,
                  profile: {
                    ...editProfile.profile,
                    linkedin: e.target.value,
                  },
                })
              }
            />
          <InputLabel>Gender</InputLabel>
           <Select value={editProfile?.profile.gender}
              onChange={(event) =>
                setEditProfile({
                  ...editProfile,
                  profile: {
                    ...editProfile.profile,
                    gender: Number(event.target.value),
                  },
                })
              }>
              {genders.map((gender) => (
                <MenuItem key={gender.id} value={gender.id}>
                  {gender.gender}
                </MenuItem>
              ))}
            </Select>
            <InputLabel>Interests</InputLabel>
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
        </DialogContent>
        <DialogActions>
          <Button
            color='neutral'
            variant='outlined'
            type='button'
            onClick={() => closeEditProfile()}
          >
            Cancel
          </Button>
          <Button type='submit' color='primary' variant='outlined'>Submit</Button>
        </DialogActions>
        </Dialog>
    </>
  )
}