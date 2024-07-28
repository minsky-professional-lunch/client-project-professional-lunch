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
import Grid from '@mui/joy/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.grey,
      color: theme.palette.common.black,
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <Grid
      container
      direction='column'
      alignItems='center'
      justifyContent='center'
    >
      {/* <Box sx={{ width: '100%', mt: 2 }}> */}
        <Typography>Add New Interest</Typography>
        <Stack
          component='form'
          direction='row'
          spacing={2}
          mb={2}
          onSubmit={handleSubmit}
        >
          <TextField
            label='Add Interest'
            required
            id='outlined-size-small'
            size='small'
            value={newInterest.interest}
            onChange={(event) => {
              setNewInterest({ interest: event.target.value });
            }}
          />
          <Button type='submit' color='neutral'>
            Add
          </Button>
        </Stack>
        <Stack>
        <TableContainer>
          <Table sx={{ width: '50vw' }} size='small'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Current Interests</StyledTableCell>
                <StyledTableCell align='center'>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {interests.map((interest) => (
                <TableRow
                  key={interest.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{interest.interest}</TableCell>
                  <TableCell align='center'>
                    <Button
                      onClick={() => handleOpen(interest.id)}
                      variant='outlined'
                      color='neutral'
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {'Are you sure you want to delete this interest?'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined' color='neutral'>
              Cancel
            </Button>
            <Button onClick={deleteInterest} variant='outlined' color='danger'>
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
        </Stack>
      {/* </Box> */}
    </Grid>
  );
}
