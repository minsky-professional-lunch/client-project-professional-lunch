import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
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

export default function InterestsList() {
  const dispatch = useDispatch();
  const interests = useSelector((store) => store.interestsReducer);

  const [newInterest, setNewInterest] = useState({ interest: '' });
  const [open, setOpen] = useState(false);

  const [interestToDelete, setInterestToDelete] = useState(null);

  useEffect(() => {
    dispatch({ type: 'FETCH_INTERESTS' });
  }, []);

  const deleteInterest = () => {
    dispatch({ type: 'DELETE_INTEREST', payload: interestToDelete });
    handleClose();
  };

  const handleClose = () => setOpen(false);
  const handleOpen = (interestId) => {
    setInterestToDelete(interestId);
    setOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_INTEREST', payload: newInterest });
    setNewInterest({ interest: '' });
  };

  return (
    <div>
      <div>
        <h1>Interests</h1>
        <div>
          <Box
            component='form'
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            onSubmit={handleSubmit}
          >
            <TextField
              label='Add Interest'
              id='outlined-size-small'
              size='small'
              value={newInterest.interest}
              onChange={(event) => {
                setNewInterest({ interest: event.target.value });
              }}
            />
            <Button type='submit' variant='outlined'>
              Add
            </Button>
          </Box>
        </div>

        <div>
          <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 400 }} size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Interest</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {interests.map((interest) => (
                  <TableRow
                    key={interest.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{interest.interest}</TableCell>
                    <TableCell>
                      <Button
                        variant='outlined'
                        onClick={() => handleOpen(interest.id)}
                      >
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
              {'Are you sure you want to delete interest?'}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={deleteInterest}>Yes, Delete</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  )
}