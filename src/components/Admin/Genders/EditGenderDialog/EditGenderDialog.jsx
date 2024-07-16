import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditGenderDialog({ open, closeEditGender, genderToEdit, setGenderToEdit}) {
  const dispatch = useDispatch();

  const [editGenderName, setEditGenderName] = useState(genderToEdit);

  const editGender = (event) => {
    event.preventDefault();
    dispatch({ type: 'EDIT_GENDER', payload: editGenderName});
    closeEditGender();
  }
  
  return (
    <>
      <Dialog open={open} onClose={closeEditGender} PaperProps={{ component: 'form', onSubmit: editGender}}>
        <DialogTitle>Edit Gender</DialogTitle>
        <DialogContent>
          <TextField 
            sx={{ mb: 1.5, mt: 1 }}
            id='gender'
            name='gender'
            label='Gender'
            type='text'
            placeholder={genderToEdit}
            fullWidth
            value={genderToEdit}
            onChange={(event) => setEditGenderName(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color='warning'
            type='button'
            onClick={() => closeEditGender()}
          >
            Cancel
          </Button>
          <Button type='submit'>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}