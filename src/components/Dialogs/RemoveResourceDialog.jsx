import { useState } from 'react';
import Button from '@mui/joy/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function RemoveResourceDialog() {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Button onClick={handleClickOpen}>Open Alert Dialog</Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"Delete"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Delete</Button>
      </DialogActions>

    </Dialog>
    </>
  )
}