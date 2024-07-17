import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';

export default function MentorList() {
  const dispatch = useDispatch();

  const profiles = useSelector((store) => store.profiles);
  console.log('Profiles', profiles);
  const mentors = profiles.filter(profile => profile.isMentor);
  console.log('Mentors', mentors);
  const [stripe, setStripe] = useState('odd');

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILES'});
  }, [])
  
  return (
    <>
      <h1>Mentors</h1>
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
            {mentors.map((mentor) => (
            <tr key={mentor.id}>
              <td>{mentor.first_name}</td>
              <td>{mentor.last_name}</td>
              <td>{mentor.email}</td>
              <td>{mentor.school}</td>
              <td>{mentor.linkedin}</td>
              <td>{mentor.bio}</td>
              <td>{mentor.availability}</td>
              <td>{mentor.interests}</td>
            </tr>
            ))}
          </tbody>
        </Table>
      </Sheet>
    </>
  )
}