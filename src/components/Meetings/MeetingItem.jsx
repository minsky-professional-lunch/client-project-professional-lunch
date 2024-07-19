import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { Box, CardOverflow, Grid } from '@mui/joy';
import { CardActions, CardContent, Stack } from "@mui/material";
import Button from '@mui/joy/Button';
import moment from 'moment/moment';

export default function MeetingItem( {meeting} ) {
    return (
        <div className='container'>
                <Grid container justifyContent="center">
                <Box sx={{ maxHeight: '80vh' }}>
                <Card sx={{ width: '80vw' }}>
                    <Typography level="title-lg" noWrap>
                        Meeting with {meeting.mentor_first_name}
                    </Typography>
                    <Typography level="title-lg" noWrap>
                        {moment(meeting.meeting_date).format('LL')}
                    </Typography>
                    <Typography level="title-md" noWrap>
                        {moment(meeting.meeting_start, "hh:mm:ss").format('h:mm A')} - {moment(meeting.meeting_end, "hh:mm:ss").format('h:mm A')}
                    </Typography>
                    <CardActions>
                        <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={4}>
                            <Button onClick={() => seeDetails(meeting.meeting_id)}>
                                View
                            </Button>
                        </Stack>
                    </CardActions>
                </Card>
                </Box>
            </Grid>
        </div>
    )
}