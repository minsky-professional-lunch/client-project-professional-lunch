import React, { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

function UserPage() {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch({ type: "CHECK_FOR_PROFILE" }); 
  }, []);

  const history = useHistory();

  const createProfile = () => {
    console.log("button clicked");
    history.push("/registration/2");
  };
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Button variant='outlined' color='neutral' onClick={() => createProfile()}>Create Profile</Button>
      <LogOutButton className="btn" />
      </Box>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
