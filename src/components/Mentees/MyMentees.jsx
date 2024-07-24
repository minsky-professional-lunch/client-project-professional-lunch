import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography } from '@mui/joy';
import MyMenteesItem from './MyMenteesItem';
import MentorRequests from '../Mentorships/MentorRequests';


export default function MyMentees() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  console.log('User', user);
  const mentorships = useSelector((store) => store.mentorships);
  console.log('Mentorships', mentorships);
  const pendingMentorships = mentorships.filter((ment) => ment.status === 'pending');
  console.log('Pending mentorships', pendingMentorships);
  const acceptedMentorships = mentorships.filter((ment) => ment.status === 'accepted');
  console.log('Accepted mentorships', acceptedMentorships);

  useEffect(() => {
    dispatch({ type: 'FETCH_PROFILES' });
    dispatch({ type: 'FETCH_MENTORSHIPS' });
  }, []);

  return (
    <div className='container'>
      <h1 align='center'>My Mentees</h1>
      {pendingMentorships.length > 0 ? 
      <>
      <h3 align='center'>Mentorship Requests</h3>
      {pendingMentorships.map((mentee) => (
        <MentorRequests key={mentee.id} mentee={mentee} />
      ))}
      </>
      : 
      <></>
      }
      {acceptedMentorships.length > 0 ?
      <>
      <h3 align='center'>Accepted Mentees</h3>
      {acceptedMentorships.map((mentee) => (
        <MyMenteesItem key={mentee.id} mentee={mentee}/>
      ))}
      </>
      :
      <></>
      }
    </div>
  )
}
