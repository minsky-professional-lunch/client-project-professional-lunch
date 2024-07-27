import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function MenteeGrid() {
  const dispatch = useDispatch();

  const profiles = useSelector((store) => store.adminProfiles);
  const mentees = profiles.filter((profile) => !profile.isMentor);
  console.log('Mentees', mentees);

  const [tableData, setTableData] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'last_name', headerName: 'Last Name', width: 140 },
    { field: 'first_name', headerName: 'First Name', width: 140 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'school', headerName: 'School', width: 200 },
    { field: 'linkedin', headerName: 'LinkedIn', width: 250 },
    { field: 'bio', headerName: 'Bio', width: 300 },
    { field: 'availability', headerName: 'Availability', width: 300 },
    { field: 'interests', headerName: 'Interests', width: 300 },
  ];

  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_PROFILES' });
  }, []);

  let rows = [];
  rows = mentees.map((mentee, index) => {
    return (rows = {
      id: mentee.id,
      last_name: mentee.last_name,
      first_name: mentee.first_name,
      email: mentee.email,
      school: mentee.school,
      linkedin: mentee.linkedin,
      bio: mentee.bio,
      availability: mentee.availability,
      interests: mentee.interests,
    });
  });

  return (
    <>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25, page: 0 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          pagination
          getRowHeight={() => 'auto'}
        />
      </div>
    </>
  );
}
