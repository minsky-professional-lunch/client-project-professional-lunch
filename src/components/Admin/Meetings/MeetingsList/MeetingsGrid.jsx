import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment/moment';


export default function MeetingsGrid() {
  const dispatch = useDispatch();

  const meetings = useSelector((store) => store.meetings);
  console.log('Meetings', meetings);
  
  const [tableData, setTableData] = useState([]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'mentor_last_name', headerName: 'Mentor Last Name', width: 150 },
    { field: 'mentor_first_name', headerName: 'Mentor First Name', width: 150 },
    { field: 'mentee_last_name', headerName: 'Mentee Last Name', width: 150 },
    { field: 'mentee_first_name', headerName: 'Mentee First Name', width: 150 },
    { field: 'meeting_date', headerName: 'Meeting Date', width: 140 },
    { field: 'meeting_start', headerName: 'Meeting Start', width: 120 },
    { field: 'meeting_end', headerName: 'Meeting End', width: 120 },
    { field: 'meeting_status', headerName: 'Meeting Status', width: 140 },
  ]

  useEffect(() => {
    dispatch({ type: 'FETCH_ADMIN_PROFILES' });
  }, []);

  let rows = [];
  rows = meetings.map((meeting, index) => {
    return (rows = {
      id: index, 
      mentor_last_name: meeting.mentor_last_name,
      mentor_first_name: meeting.mentor_first_name,
      mentee_last_name: meeting.mentee_last_name,
      mentee_first_name: meeting.mentee_first_name,
      meeting_date: moment(meeting?.meeting_date).format('LL'),
      meeting_start: moment(meeting?.meeting_start, "hh:mm:ss").format('h:mm A'),
      meeting_end: moment(meeting?.meeting_end, "hh:mm:ss").format('h:mm A'),
      meeting_status: meeting.meeting_status,
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