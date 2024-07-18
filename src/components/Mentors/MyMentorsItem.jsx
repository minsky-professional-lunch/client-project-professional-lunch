import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Box, CardOverflow, Grid } from '@mui/joy';
import { CardActions, CardContent } from "@mui/material";
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';

export default function MyMentorsItem( {mentor} ) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const meetings = useSelector(store => store.meetings);
    console.log('Meetings', meetings);

    const [newMeeting, setNewMeeting] = useState({mentorship_id: mentor.id, date: '', start: '', end: '', link: '', notes: ''});
    console.log('New meeting', newMeeting);

    const [requested, setRequested] = useState(false);

    useEffect(() => {
        dispatch({ type: 'FETCH_PROFILES' });
        dispatch({ type: 'FETCH_MEETINGS' });
    }, []);

    const mentorDetails = (mentorId) => {
        console.log('Clicked', mentorId);
        dispatch({ type: 'FETCH_PROFILE_DETAILS', payload: mentorId });
        history.push(`/mentor/details/${mentorId}`);
    }

    const cancel = (mentorshipId) => {
        console.log('Clicked', mentorshipId);
        dispatch({ type: 'DELETE_MENTORSHIP', payload: {mentorshipId: mentorshipId} });
    }

    const request = (event) => {
        event.preventDefault();
        setOpen(false);
        dispatch({ type: 'REQUEST_MEETING', payload: {newMeeting: newMeeting, mentorID: mentor.mentor_id} });
        setRequested(!requested);
        console.log('submit');
        console.table(newMeeting);
    }

    const handleChange = (event) => {
        console.log(event.target.id);
        switch (event.target.id) {
            case 'date':
                setNewMeeting({...newMeeting, date: event.target.value});
                break;
            case 'start':
                setNewMeeting({...newMeeting, start: event.target.value});
                break;
            case 'end':
                setNewMeeting({...newMeeting, end: event.target.value});
                break;
            case 'link':
                setNewMeeting({...newMeeting, link: event.target.value});
                break;
            case 'notes':
                setNewMeeting({...newMeeting, notes: event.target.value});
                break;
        }
    }

    return (
        <div className='container'>
            <Grid container justifyContent="center">
                <Box sx={{ maxHeight: '80vh' }}>
                <Card sx={{ width: '80vw' }}>
                    <Typography level="title-lg" noWrap>
                        {mentor.mentor_first_name} {mentor.mentor_last_name}
                    </Typography>
                    <CardActions>
                        <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={4}>
                            {mentor.status === 'accepted' ? 
                            <React.Fragment>
                                <Button startDecorator={<Add />} onClick={() => setOpen(true)}>
                                    Request Meeting
                                </Button>
                            <Modal open={open} onClose={() => setOpen(false)}>
                                <ModalDialog>
                                <DialogTitle>Request new meeting</DialogTitle>
                                <DialogContent>Please select a date and time</DialogContent>
                                <form
                                    onSubmit={request}
                                >
                                    <Stack spacing={2}>
                                    <FormControl>
                                        <FormLabel>Date</FormLabel>
                                        <Input autoFocus required type="date" slotProps={{ input: {id: 'date'} }} value={newMeeting.date} onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Start Time</FormLabel>
                                        <Input required type="time" slotProps={{ input: {id: 'start'} }} value={newMeeting.start} onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>End Time</FormLabel>
                                        <Input required type="time" slotProps={{ input: {id: 'end'} }} value={newMeeting.end} onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Link/Location</FormLabel>
                                        <Input value={newMeeting.link} slotProps={{ input: {id: 'link'} }} onChange={handleChange}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Notes</FormLabel>
                                        <Input value={newMeeting.notes} slotProps={{ input: {id: 'notes'} }} onChange={handleChange}/>
                                    </FormControl>
                                    <Button type="submit">Submit</Button>
                                    </Stack>
                                </form>
                                </ModalDialog>
                                </Modal>
                                </React.Fragment>
                            : 
                            <Button onClick={() => cancel(mentor.id)}>
                                Cancel Request
                            </Button>
                            }
                            <Button onClick={() => mentorDetails(mentor.mentor_id)} sx={{ cursor: 'pointer' }}>
                                View Profile
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>
                </Box>
            </Grid>
        </div>
    )
}