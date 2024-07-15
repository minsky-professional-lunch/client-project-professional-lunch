import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useDispatch, useSelector} from 'react-redux';

function UserPage() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const profile = useSelector(store => store.profileDetails);
  console.log('Profile', profile);

  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: user.id });
  }, []);

  return (
    <div className="container">
      <h2>Welcome, {profile?.profile?.first_name}!</h2>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
