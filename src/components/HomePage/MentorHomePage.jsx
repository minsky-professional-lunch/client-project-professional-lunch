import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MentorItem from '../Mentors/MentorItem';
import Requests from '../Mentorships/MentorRequests';
import MentorRequests from '../Mentorships/MentorRequests';
import MenteeRequests from '../Mentorships/MenteeRequests';
import MeetingItem from '../Meetings/MeetingItem';

function MentorHomePage() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const profile = useSelector(store => store.profileDetails);
  console.log('Profile', profile);
  const mentorships = useSelector(store => store.mentorships);
  console.log('Mentorships', mentorships);
  const pending = mentorships.filter(mentor => mentor.status === 'pending');
  console.log('Pending', pending);
  const meetings = useSelector(store => store.meetings);
  console.log('Meetings', meetings);
  const meetingRequests = meetings.filter(meeting => meeting.meeting_status === 'pending');
  console.log('Meeting requests', meetingRequests);
  const acceptedMeetings = meetings.filter(meeting => meeting.meeting_status === 'accepted');
  console.log('Accepted meetings', acceptedMeetings);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILE_DETAILS', payload: user.id });
    dispatch({ type: 'FETCH_MENTORSHIPS' });
    dispatch({ type: 'FETCH_MEETINGS' });
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {profile?.profile?.first_name}!</h2>
      {pending.length > 0 ? 
      <>
      <h3>Mentorship Requests</h3>
      {pending.map((mentee) => (
        <MentorRequests key={mentee.id} mentee={mentee} />
      ))}
      </>
      :
      <></>
      }

      {meetings.length > 0 ? 
      <>
      <h3>Meeting Requests</h3>
      {meetingRequests.map((meeting) => (
        <MeetingItem key={meeting.id} meeting={meeting} />
      ))}
      <h3>Upcoming Meetings</h3>
      {acceptedMeetings.map((meeting) => (
        <MeetingItem key={meeting.id} meeting={meeting} />
      ))}
      </>
      :
      <h3>No upcoming meetings. Request a meeting with your mentor to keep learning!</h3> 
      }
    </div>
  );
}

// this allows us to use <App /> in index.js
export default MentorHomePage;
