import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Avatar, Box, CardOverflow, Grid } from '@mui/joy';
import { CardActions, CardContent, Stack } from "@mui/joy";
import Button from '@mui/joy/Button';
import moment from 'moment/moment';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export default function MeetingItem( {meeting} ) {
    const user = useSelector(store => store.user);
    const history = useHistory();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const seeDetails = (meetingId) => {
        console.log('clicked', meetingId);
        history.push(`/meeting/details/${meeting.meeting_id}`);
    }

    const accept = (meetingId) => {
        console.log('clicked', meetingId);
        dispatch({ type: 'ACCEPT_MEETING', payload: meetingId });
        dispatch({ type: 'FETCH_MEETINGS' });
        history.push('/my-meetings');
    }

    const deny = (meetingId) => {
        console.log('clicked', meetingId);
        dispatch({ type: 'DENY_MEETING', payload: meetingId });
        history.push('/my-meetings');
    }

    return (
        <div className='container'>
            {user.isMentor ? 
            <Grid container justifyContent="center">
                <Box sx={{ maxHeight: '80vh' }}>
                <Card sx={{ width: '80vw', boxShadow: 'lg', bgcolor: 'background.level1', margin: '10px' }}>
                <CardContent sx={{ cursor: 'pointer' }}
                                      onClick={() => seeDetails(meeting.meeting_id)}>
                    <Stack direction='row' spacing={2}>
                        <Avatar src={meeting.mentee_avatar} sx={{ '--Avatar-size': '5rem'}}/>
                        <Stack direction='column'>
                            <Typography level="title-lg" noWrap sx={{ width: '57vw' }}>
                                Meeting with {meeting.mentee_first_name} {meeting.mentee_last_name}
                            </Typography>
                            <Typography level="body-md" noWrap sx={{ width: '50vw' }}>
                                {moment(meeting.meeting_date).format('LL')}
                            </Typography>
                            <Typography level="body-md" noWrap sx={{ width: '50vw' }}>
                                {moment(meeting.meeting_start, "hh:mm:ss").format('h:mm A')} - {moment(meeting.meeting_end, "hh:mm:ss").format('h:mm A')}
                            </Typography>
                        </Stack>
                    </Stack>
                </CardContent>
                    {meeting.meeting_status === 'Pending' ? 
                    <CardOverflow sx={{ bgcolor: 'background.level2', alignItems: 'center' }}>
                        <CardActions buttonFlex="1">
                            <ButtonGroup variant="outlined" size='lg' sx={{ bgcolor: 'background.surface' }}>
                                <Button onClick={() => accept(meeting.meeting_id)}>Accept</Button>
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
                                            Are you sure you want to deny this meeting?
                                        </DialogContent>
                                        <DialogActions>
                                            <Button variant="solid" color="danger" onClick={() => { 
                                                setOpen(false); 
                                                deny(meeting.meeting_id)}}>
                                            Deny meeting
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
                    :
                    <></> 
                    }
                </Card>
                </Box>
            </Grid>     
            : 
            <Grid container justifyContent="center">
                <Box sx={{ maxHeight: '80vh' }}>
                <Card sx={{ width: '80vw', boxShadow: 'lg', bgcolor: 'background.level1', margin: '10px' }} onClick={() => seeDetails(meeting.meeting_id)}>
                <Stack direction='row' spacing={2}>
                        <Avatar src={meeting.mentor_avatar} sx={{ '--Avatar-size': '5rem'}}/>
                        <Stack direction='column'>
                            <Typography level="title-lg" noWrap sx={{ width: '57vw' }}>
                                Meeting with {meeting.mentor_first_name} {meeting.mentor_last_name}
                            </Typography>
                            <Typography level="body-md" noWrap sx={{ width: '50vw' }}>
                                {moment(meeting.meeting_date).format('LL')} | {moment(meeting.meeting_start, "hh:mm:ss").format('h:mm A')}
                            </Typography>
                            <Typography level="body-md" sx={{ width: '50vw' }}>
                                <span><b>Status:</b></span> {meeting.meeting_status}
                            </Typography>
                        </Stack>
                </Stack>
                </Card>
                </Box>
            </Grid>
            }
        </div>
    )
}