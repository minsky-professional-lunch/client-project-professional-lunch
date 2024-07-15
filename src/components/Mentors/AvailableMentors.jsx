import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography } from '@mui/joy';
import MentorItem from './MentorItem';

export default function AvailableMentors() {
    const dispatch = useDispatch();
    const profiles = useSelector(store => store.profiles);
    console.log('Profiles:', profiles);
    const mentors = profiles.filter(profile => profile.isMentor);
    console.log('Mentors', mentors);

    useEffect(() => {
        dispatch({ type: 'FETCH_PROFILES' });
    }, []);

    return (
        <div className='container'>
            <h1>Available Mentors</h1>
            <Stack>
                {mentors.map((mentor) => (
                    <MentorItem key={mentor.id} mentor={mentor} />
                )
                )}
            </Stack>
        </div>
    )
}