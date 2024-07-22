import { useDispatch, useSelector } from 'react-redux';
import { useScript } from '../../hooks/useScript';
import React, { useEffect, useState } from 'react';
import { Avatar, Stack, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import Badge from "@mui/joy/Badge";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Textarea from '@mui/joy/Textarea';
import { Select } from '@mui/material';

export default function Profile() {
   const dispatch = useDispatch();
   const profile = useSelector(store => store.profileDetails);
   console.log('Profile', profile);

    const [editProfile, setEditProfile] = useState({avatar: profile.profile.avatar });

    useEffect(() => {
      dispatch({ type: 'FETCH_PROFILE_DETAILS' })
    }, []);

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('clicked');
      dispatch({ type: 'EDIT_PROFILE', payload: editProfile });   
   }

    const openWidget = () => {
        !!window.cloudinary && window.cloudinary.createUploadWidget(
           {
              sources: ['local', 'url', 'camera'],
              cloudName: 'dz2bil44j',
              uploadPreset: 'hl5wdxak'
           },
           (error, result) => {
              if (!error && result && result.event === "success") {
                 setEditProfile({
                    ...editProfile,
                    avatar: result.info.secure_url
                 })
              }
           },
        ).open();
     }

     if (!profile.profile) {
      return <h2>Loading...</h2>;
    }

    return (
      <div className="container">
      <h1>My Profile</h1>
      <form>
      <Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={3}>
         {/* <Typography>Edit Profile Picture</Typography> */}
          <Badge
              onClick={openWidget}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="outlined"
              badgeContent={
              <CameraAltIcon
                  sx={{ width: '35px', height: '35px', color: '#343A40', cursor: 'pointer' }}
              />
              }
              badgeInset="14%"
              sx={{ '--Badge-paddingX': '0px' }}
          >
              <Avatar variant="outlined" sx={{ width: 150, height: 150 }} src={profile?.profile?.avatar} />
          </Badge>
              {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
          </Stack> 
          <Stack direction='row' spacing={3}>
            <Typography>
               Bio
            </Typography>
            <Textarea placeholder='Bio' value={profile?.profile?.bio} />
         </Stack>
            <Typography>
               Gender
            </Typography>
            <Typography>
               School
            </Typography>
            <Typography>
               Interests
            </Typography>
            <Typography>
               Availability
            </Typography>
            <Stack direction='row' spacing={3}>
               <Typography>
                  LinkedIn
               </Typography>
               <Textarea placeholder='LinkedIn' value={profile?.profile?.linkedin} />
            </Stack>
            <Button onClick={handleSubmit} sx={{ bgcolor: "#1BAC5C" }}>Save Changes</Button>
            </form>
      { /* This just sets up the window.cloudinary widget */ }
              {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
              <br />
  </div>
    )
}