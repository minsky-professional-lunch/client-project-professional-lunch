import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MentorItem from '../Mentors/MentorItem';
import Requests from '../Mentorships/MentorRequests';
import MentorRequests from '../Mentorships/MentorRequests';
import MenteeRequests from '../Mentorships/MenteeRequests';

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const profile = useSelector(store => store.profileDetails);
  console.log('Profile', profile);
  const mentorships = useSelector(store => store.mentorshipDetails);
  console.log('Mentorships', mentorships);
  const pending = mentorships.filter(mentor => mentor.status === 'pending');
  console.log('Pending', pending);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILE_DETAILS', payload: user.id });
    dispatch({ type: 'FETCH_MENTORSHIP_DETAILS', payload: user.id });
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {profile?.profile?.first_name}!</h2>
      {user.isMentor ? 
      <>
      <h3>Mentorship Requests</h3>
      {pending.map((mentee) => (
        <MentorRequests key={mentee.id} mentee={mentee} />
      ))}
      </>
      :
      <>
      <h3>Pending Mentorships</h3>
        {pending.map((mentor) => (
          <MenteeRequests key={mentor.id} mentor={mentor} />
        ))}
      </>
      }
      <h3>Upcoming Meetings</h3>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
