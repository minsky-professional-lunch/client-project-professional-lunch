import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import MentorGrid from './MentorGrid';

export default function MentorList() {
  const dispatch = useDispatch();

  const adminProfiles = useSelector((store) => store.adminProfiles);
  console.log('Profiles', adminProfiles);
  const mentors = adminProfiles.filter((profile) => profile.isMentor);
  console.log('Mentors', mentors);
  const [stripe, setStripe] = useState('odd');

  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_PROFILES' });
  }, []);

  return (
    <>
      {/* <Sheet>
        <Table stripe={stripe}>
          <thead>
            <tr>
              <th style={{ width: '10%' }}>Last Name</th>
              <th style={{ width: '10%' }}>First Name</th>
              <th style={{ width: '15%' }}>Email</th>
              <th style={{ width: '15%' }}>LinkedIn</th>
              <th style={{ width: '20%' }}>Bio</th>
              <th style={{ width: '20%' }}>Availability</th>
              <th style={{ width: '20%' }}>Interests</th>
            </tr>
          </thead>
          <tbody>
            {mentors.map((mentor) => (
              <tr key={mentor.id}>
                <td>{mentor.last_name}</td>
                <td>{mentor.first_name}</td>
                <td>{mentor.email}</td>
                <td>
                  {!mentor.linkedin ? 'No Profile' : <a href={mentor.linkedin}>Go to Profile</a>}
                </td>
                <td>{mentor.bio}</td>
                <td>{mentor.availability}</td>
                <td>{mentor.interests}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Sheet> */}
      <MentorGrid />
    </>
  );
}
