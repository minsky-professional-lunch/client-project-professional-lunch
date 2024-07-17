import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography } from '@mui/joy';

export default function MyMentors() {
    const dispatch = useDispatch();
    const profiles = useSelector(store => store.profiles);
    console.log('Profiles:', profiles);
    const mentors = profiles.filter(profile => profile.isMentor);
    console.log('Mentors', mentors);
    const user = useSelector(store => store.user);
    console.log('User', user);
    const myMentors = mentors.filter(mentor => user.mentorships.includes(mentor.id));
    console.log('My Mentors', myMentors);
    const mentorships = useSelector(store => store.mentorships);
    console.log('Mentorships', mentorships);
    const pendingMentorships = mentorships.filter(ment => ment.status === 'pending');
    console.log('Pending mentorships', pendingMentorships);
    const acceptedMentorships = mentorships.filter(ment => ment.status === 'accepted');
    console.log('Accepted mentorships', acceptedMentorships);

    useEffect(() => {
        dispatch({ type: 'FETCH_PROFILES' });
        dispatch({ type: 'FETCH_MENTORSHIPS' });
    }, []);

    return (
        <div className='container'>
            <h1>My Mentors</h1>
        </div>
    )
}