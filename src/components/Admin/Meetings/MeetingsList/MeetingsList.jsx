import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import moment from 'moment/moment';
import MeetingsGrid from './MeetingsGrid';

export default function MeetingsList() {
  const dispatch = useDispatch();

  const meetings = useSelector((store) => store.meetings);
  console.log('Meetings', meetings);

  const [stripe, setStripe] = useState('odd');

  useEffect(() => {
    dispatch({ type: 'FETCH_ALL_MEETINGS'});
  }, [])

  return (
    <>
      {/* <Sheet>
        <Table stripe={stripe}>
          <thead>
            <tr>
              <th style={{width: '20%' }}>Mentor Name</th>
              <th style={{width: '20%' }}>Mentee Name</th>
              <th style={{width: '15%' }}>Meeting Date</th>
              <th style={{width: '15%' }}>Meeting Start</th>
              <th style={{width: '15%' }}>Meeting End</th>
              <th style={{width: '10%' }}>Status</th>
              
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
            <tr key={meeting.id}>
              <td>{meeting.mentor_last_name}, {meeting.mentor_first_name}</td>
              <td>{meeting.mentee_last_name}, {meeting.mentee_first_name}</td>
              <td>{moment(meeting?.meeting_date).format('LL')}</td>
              <td>{moment(meeting?.meeting_start, "hh:mm:ss").format('h:mm A')}</td>
              <td>{moment(meeting?.meeting_end, "hh:mm:ss").format('h:mm A')}</td>
              <td>{meeting.meeting_status}</td>
              
            </tr>
            ))}
          </tbody>
        </Table>
      </Sheet> */}
      <MeetingsGrid />
    </>
  )
}