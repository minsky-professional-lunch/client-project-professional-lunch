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
    // const details = useSelector(store => store.profileDetails);
    // console.log('Details', details);

    useEffect(() => {
        dispatch({ type: 'FETCH_PROFILES' });
    }, []);

    const mentorDetails = (mentorId) => {
        console.log('Clicked', mentorId);
        dispatch({ type: 'FETCH_PROFILE_DETAILS', payload: mentorId });
        history.push(`/mentor/details/${mentorId}`);
    }

    const request = (mentorId) => {
        console.log('Clicked', mentorId);
        // dispatch({ type: 'REQUEST_MENTORSHIP', payload: mentorId });
    }

    const cancel = (mentorshipId) => {
        console.log('Clicked', mentorshipId);
        dispatch({ type: 'DELETE_MENTORSHIP', payload: {mentorshipId: mentorshipId} });
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
                                    onSubmit={(event) => {
                                    event.preventDefault();
                                    setOpen(false);
                                    }}
                                >
                                    <Stack spacing={2}>
                                    <FormControl>
                                        <FormLabel>Date</FormLabel>
                                        <Input autoFocus required type="date" />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Time</FormLabel>
                                        <Input required type="time" />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Notes</FormLabel>
                                        <Input />
                                    </FormControl>
                                    <Button type="submit" onClick={() => request(mentor.mentor_id)}>Submit</Button>
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