import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';

export default function MenteeList() {
  const dispatch = useDispatch();

  const profiles = useSelector((store) => store.profiles);
  // const profileDetails = useSelector((store) => store.profileDetails);
  console.log('Profiles', profiles);
  // console.log('Profile Details', profileDetails);
  const mentees = profiles.filter(profile => !profile.isMentor);
  console.log('Mentees', mentees);
  const [stripe, setStripe] = useState('odd');

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILES'});
    // dispatch({ type: 'FETCH_PROFILE_DETAILS'});
  }, [])
  
  return (
    <>
      <h1>Mentees</h1>
      <Sheet>
        <Table stripe={stripe}>
          <thead>
            <tr>
              <th style={{width: '10%' }}>First Name</th>
              <th style={{width: '10%' }}>Last Name</th>
              <th style={{width: '15%' }}>Email</th>
              <th style={{width: '15%' }}>School</th>
              <th style={{width: '15%' }}>LinkedIn</th>
              <th style={{width: '15%' }}>Bio</th>
              <th style={{width: '10%' }}>Availability</th>
              <th style={{width: '10%' }}>Interests</th>
            </tr>
          </thead>
          <tbody>
            {mentees.map((mentee) => (
            <tr key={mentee.id}>
              <td>{mentee.first_name}</td>
              <td>{mentee.last_name}</td>
              <td>{mentee.email}</td>
              <td>{mentee.school}</td>
              <td>{mentee.linkedin}</td>
              <td>{mentee.bio}</td>
              <td>{mentee.availability}</td>
              <td>{mentee.interests}</td>
            </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  )
}