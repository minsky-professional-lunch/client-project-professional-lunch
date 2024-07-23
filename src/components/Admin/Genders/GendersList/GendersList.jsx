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
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import EditGenderDialog from '../EditGenderDialog/EditGenderDialog';
import { styled } from '@mui/material/styles';

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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  return (
    <Box>
      <Typography>Add New Gender</Typography>
      <Stack
        component='form'
        direction='row'
        spacing={2}
        mb={2}
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
        <Button type='submit' variant='outlined'>Add</Button>
      </Stack>
      <div>
        <TableContainer >
          <Table sx={{ maxWidth: 1000 }} size='small'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Current Genders</StyledTableCell>
                <StyledTableCell align='center'>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {genders.map((gender) => (
                <TableRow
                  key={gender.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{gender.gender}</TableCell>
                  <TableCell align='center'>
                    <Button onClick={() => handleOpen(gender.id)} variant='outlined'>
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
          <DialogTitle>{'Are you sure you want to delete gender?'}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined'>Cancel</Button>
            <Button onClick={deleteGender} variant='outlined' color='danger'>Yes, Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
