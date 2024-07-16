import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
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

export default function GendersList() {
  const dispatch = useDispatch();
  const genders = useSelector((store) => store.gendersReducer);

  const [newGender, setNewGender] = useState({ gender: '' });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_GENDERS' });
  }, []);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_GENDER', payload: newGender });
    setNewGender({ gender: '' });
  };

  const deleteGender = (genderId) => {
    dispatch({ type: 'DELETE_GENDER', payload: genderId });
    handleClose();
  };

  return (
    <div>
      <div>
        <h1>Genders</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor=''>Gender</label>
            <input
              type='text'
              placeholder='Enter New Gender'
              value={newGender.gender}
              onChange={(event) => {
                setNewGender({ gender: event.target.value });
              }}
            />
            <button type='submit'>Add</button>
          </form>
        </div>
        <div>
          <ul>
            {genders.map((gender) => (
              <div key={gender.id}>
                <div>
                  <li>{gender.gender}</li>
                  <Button variant='outlined' onClick={handleOpen}>
                    Delete
                  </Button>
                </div>
                <div>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                      {'Are you sure you want to delete gender?'}
                    </DialogTitle>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={() => deleteGender(gender.id)}>
                        Yes, Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </div>
            ))}
          </ul>
        </div>
        {/* <div>
          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 400 }} size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Gender</TableCell>
                  <TableCell>Edit/Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {genders.map((gender) => (
                  <TableRow key={gender.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{gender.gender}</TableCell>
                    <TableCell>
                      <Button variant='outlined' onClick={handleOpen}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div> */}
      </div>
    </div>
  );
}
