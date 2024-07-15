import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";

export default function MentorDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_DETAILS', payload: params.id });
    }, []);

    return (
        <div className='container'>
            <h1>Details</h1>
        </div>
    )
}