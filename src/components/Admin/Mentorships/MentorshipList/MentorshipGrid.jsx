import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function MentorshipGrid() {
  const dispatch = useDispatch();

  const mentorships = useSelector((store) => store.mentorships);
  console.log('Mentorships', mentorships);

  const [tableData, setTableData] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'mentor_last_name', headerName: 'Mentor Last Name', width: 140 },
    { field: 'mentor_first_name', headerName: 'Mentor First Name', width: 140 },
    { field: 'mentor_email', headerName: 'Mentor Email', width: 250 },
    { field: 'mentee_last_name', headerName: 'Mentee Last Name', width: 140 },
    { field: 'mentee_first_name', headerName: 'Mentee First Name', width: 140 },
    { field: 'mentee_email', headerName: 'Mentee Email', width: 250 },
    { field: 'school', headerName: 'Mentee School', width: 200 },
    { field: 'status', headerName: 'Status', width: 100 },
  ];

  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_PROFILES' });
  }, []);

  let rows = [];
  rows = mentorships.map((mentorship, index) => {
    return (rows = {
      id: mentorship.id,
      mentor_last_name: mentorship.mentor_last_name,
      mentor_first_name: mentorship.mentor_first_name,
      mentor_email: mentorship.mentor_email,
      mentee_last_name: mentorship.mentee_last_name,
      mentee_first_name: mentorship.mentee_first_name,
      mentee_email: mentorship.mentee_email,
      school: mentorship.school,
      status: mentorship.status,
    });
  });

  return (
    <>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={25} // Set default page size to 25
          rowsPerPageOptions={[10, 25, 50]}
        />
      </div>
    </>
  );
}
