import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function InterestsList() {
  const dispatch = useDispatch();
  const interests = useSelector((store) => store.interestsReducer);

  useEffect(() => {
    dispatch({ type: 'FETCH_INTERESTS' });
  }, []);

  return (
    <div>
      <h1>Interests</h1>
      <div>
        <ul>
          {interests.map((interest) => (
            <div key={interest.id}>
              <li>{interest.interest}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}