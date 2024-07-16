import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

export default function MenteeList() {
  const dispatch = useDispatch();

  const profiles = useSelector((store) => store.profiles);
  // const profileDetails = useSelector((store) => store.profileDetails);
  console.log('Profiles', profiles);
  // console.log('Profile Details', profileDetails);
  const mentees = profiles.filter(profile => profile.isMentor);
  console.log('Mentees', mentees);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILES'});
    // dispatch({ type: 'FETCH_PROFILE_DETAILS'});
  }, [])
  
  return (
    <>
      <h1>Mentees</h1>
      <ul>
        {mentees.map((mentee) => (
          <li>{mentee.first_name} {mentee.last_name}</li>
        ))}
      </ul>
    </>
  )
}