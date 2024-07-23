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
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

export default function SchoolsList() {
  const dispatch = useDispatch();
  const schools = useSelector((store) => store.schoolsReducer);

  const [newSchool, setNewSchool] = useState({ school: '' });
  const [open, setOpen] = useState(false);

  const [schoolToDelete, setSchoolToDelete] = useState(null);

  useEffect(() => {
    dispatch({ type: 'FETCH_SCHOOLS' });
  }, []);

  const deleteSchool = () => {
    dispatch({ type: 'DELETE_SCHOOL', payload: schoolToDelete });
    handleClose();
  };

  const handleClose = () => setOpen(false);
  const handleOpen = (schoolId) => {
    setSchoolToDelete(schoolId);
    setOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_SCHOOL', payload: newSchool });
    setNewSchool({ school: '' });
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
      <Typography>Add New School</Typography>
      <Stack
        component='form'
        direction='row'
        spacing={2} 
        mb={2}
        onSubmit={handleSubmit}
      >
        <TextField
          label='Add School'
          id='outlined-size-small'
          size='small'
          value={newSchool.school}
          onChange={(event) => {
            setNewSchool({ school: event.target.value });
          }}
        />
        <Button type='submit' variant='outlined'>Add</Button>
      </Stack>

      <div>
        <TableContainer>
          <Table sx={{ maxWidth: 800 }} size='small'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Current Schools</StyledTableCell>
                <StyledTableCell align='center'>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schools.map((school) => (
                <TableRow
                  key={school.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{school.school}</TableCell>
                  <TableCell align='center'>
                    <Button onClick={() => handleOpen(school.id)} variant='outlined'>
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
          <DialogTitle>{'Are you sure you want to delete school?'}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined'>Cancel</Button>
            <Button onClick={deleteSchool} variant='outlined' color='danger'>Yes, Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    </Box>
  );
}
