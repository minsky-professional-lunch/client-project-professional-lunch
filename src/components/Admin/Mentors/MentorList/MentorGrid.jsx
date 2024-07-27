import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';


export default function MentorGrid() {
  const dispatch = useDispatch();

  const adminProfiles = useSelector((store) => store.adminProfiles);
  console.log('Profiles', adminProfiles);
  const mentors = adminProfiles.filter((profile) => profile.isMentor);
  console.log('Mentors', mentors);
  
  const [tableData, setTableData] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'last_name', headerName: 'Last Name', width: 140 },
    { field: 'first_name', headerName: 'First Name', width: 140 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'linkedin', headerName: 'LinkedIn', width: 250 },
    { field: 'bio', headerName: 'Bio', width: 300 },
    { field: 'availability', headerName: 'Availability', width: 300 },
    { field: 'interests', headerName: 'Interests', width: 300 }
  ]

  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_PROFILES' });
  }, []);

  let rows = [];
  rows = mentors.map((mentor, index) => {
    return (rows = {
      id: mentor.id, 
      last_name: mentor.last_name,
      first_name: mentor.first_name,
      email: mentor.email,
      linkedin: mentor.linkedin,
      bio: mentor.bio,
      availability: mentor.availability,
      interests: mentor.interests
    })
  })
  
  return (
    <>
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
    </>
  )
}