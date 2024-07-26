import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Box, CardOverflow, Grid } from '@mui/joy';
import { CardActions, CardContent, Stack } from '@mui/joy';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function MentorRequests({ mentee }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const details = useSelector((store) => store.profileDetails);
  console.log('Details', details);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: mentee.user_id });
  }, []);

  const menteeDetails = (menteeId) => {
    console.log('Clicked', menteeId);
    dispatch({ type: 'FETCH_DETAILS', payload: menteeId });
    history.push(`/mentee/details/${menteeId}`);
  };

  const connect = (mentorshipId) => {
    console.log('Clicked', mentorshipId);
    dispatch({
      type: 'ACCEPT_MENTORSHIP',
      payload: { mentorshipId: mentorshipId },
    });
  };

  const deny = (mentorshipId) => {
    console.log('Clicked', mentorshipId);
    dispatch({
      type: 'DENY_MENTORSHIP',
      payload: { mentorshipId: mentorshipId },
    });
  };

  return (
    <>
    <div className='container'>
      <Grid container justifyContent='center'>
        <Box sx={{ maxHeight: '80vh' }}>
          <Card sx={{ width: '80vw', boxShadow: 'lg', bgcolor: 'background.level1', margin: '10px' }}>
            <CardContent sx={{ cursor: 'pointer' }}
                                      onClick={() => menteeDetails(mentee.mentee_user_id)}>
            <Stack direction='row' alignItems='center' spacing={2}>
              <Avatar
                src={mentee.mentee_avatar}
                alt={mentee.mentee_first_name}
                sx={{ '--Avatar-size': '6rem' }}
              />
              <Stack direction='column'>
                <Typography level='title-lg' noWrap>
                  {mentee.mentee_first_name} {mentee.mentee_last_name}
                </Typography>
                <Typography level='body-md' noWrap>
                  {mentee.mentee_school}
                </Typography>
              </Stack>
              </Stack>
              </CardContent>
              <CardOverflow sx={{ bgcolor: 'background.level2', alignItems: 'center' }}>
                  <CardActions buttonFlex="1">
                    <ButtonGroup variant="outlined" size='lg' sx={{ bgcolor: 'background.surface' }}>
                        <Button onClick={() => connect(mentee.id)}>Accept</Button>
                        <React.Fragment>
                          <Button onClick={() => setOpen(true)}>
                            Deny
                          </Button>
                          <Modal open={open} onClose={() => setOpen(false)}>
                            <ModalDialog variant="outlined" role="alertdialog">
                              <DialogTitle>
                                <WarningRoundedIcon />
                                Confirmation
                              </DialogTitle>
                              <Divider />
                              <DialogContent>
                                Are you sure you want to deny this mentorship?
                              </DialogContent>
                              <DialogActions>
                                <Button variant="solid" color="danger" onClick={() => { 
                                    setOpen(false); 
                                    deny(mentee.id)}}>
                                  Deny mentorship
                                </Button>
                                <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
                                  Cancel
                                </Button>
                              </DialogActions>
                            </ModalDialog>
                          </Modal>
                        </React.Fragment>
                    </ButtonGroup>
                  </CardActions>
              </CardOverflow>
          </Card>
        </Box>
      </Grid>
    </div>
    </>
  );
}
