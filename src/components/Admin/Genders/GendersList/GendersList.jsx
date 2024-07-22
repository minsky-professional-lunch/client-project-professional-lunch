import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/joy/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import EditGenderDialog from '../EditGenderDialog/EditGenderDialog';

export default function GendersList() {
  const dispatch = useDispatch();
  const genders = useSelector((store) => store.gendersReducer);

  const [newGender, setNewGender] = useState({ gender: '' });
  const [open, setOpen] = useState(false);

  const [genderToDelete, setGenderToDelete] = useState(null);

  useEffect(() => {
    dispatch({ type: 'FETCH_GENDERS' });
  }, []);

  const deleteGender = () => {
    dispatch({ type: 'DELETE_GENDER', payload: genderToDelete });
    handleClose();
  };

  const handleClose = () => setOpen(false);
  const handleOpen = (genderId) => {
    setGenderToDelete(genderId);
    setOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_GENDER', payload: newGender });
    setNewGender({ gender: '' });
  };

  return (
    <div>
      <div>
        <div>
          <Box
            component='form'
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            onSubmit={handleSubmit}
          >
            <TextField
              label='Add Gender'
              id='outlined-size-small'
              size='small'
              value={newGender.gender}
              onChange={(event) => {
                setNewGender({ gender: event.target.value });
              }}
            />
            <Button type='submit'>Add</Button>
          </Box>
        </div>

        <div>
          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 400 }} size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Gender</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {genders.map((gender) => (
                  <TableRow
                    key={gender.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{gender.gender}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleOpen(gender.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              {'Are you sure you want to delete gender?'}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={deleteGender}>Yes, Delete</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
