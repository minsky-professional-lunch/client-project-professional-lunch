import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { Avatar, Stack, Typography } from '@mui/joy';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Add from '@mui/icons-material/Add';

export default function MentorDetails() {
    const params = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const details = useSelector(store => store.profileDetails);
    console.log('Details', details);
    const user = useSelector(store => store.user);
    console.log('User', user);
    const [open, setOpen] = React.useState(false);

    const [newMeeting, setNewMeeting] = useState({mentorship_id: '', date: null, start: null, end: null, link: null, notes: null});
    console.log('New meeting', newMeeting);

    useEffect(() => {
        dispatch({ type: 'FETCH_PROFILE_DETAILS', payload: params.id });
    }, []);

    const connect = (mentorId) => {
        console.log('Clicked', mentorId);
        // FINISH DISPATCH
    }

    const remove = (mentorId) => {
        console.log('Clicked', mentorId);
        // FINISH DISPATCH
    }

    const request = (event) => {
        event.preventDefault();
        setOpen(false);
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

    // check to see if data is done loading
    if (!details.profile) {
        return <h2>Loading...</h2>
    }

    return (
        <div className='container'>
            <h1>Details</h1>
            <Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={3}>
                <Avatar variant="outlined" sx={{ width: 150, height: 150 }} src={details?.profile?.avatar}></Avatar>
                <Typography>{details?.profile?.first_name} {details?.profile?.last_name}</Typography>
                <Typography>Areas of Expertise: <ul>{details?.details?.interests?.map(interest => <li>{interest.interest}</li>)}</ul></Typography>
                <Typography>Availability: <ul>{details?.details?.availability?.map(avail => <li>{avail.day} @ {avail.time}</li>)}</ul></Typography>
                {!user.mentorships.includes(details.profile.id) ? 
                <Button onClick={() => connect(details?.profile?.id)}>Connect</Button>
                : 
                <Button onClick={() => remove(details?.profile?.id)}>Remove</Button>
                }
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
            </Stack>
        </div>
    )
}