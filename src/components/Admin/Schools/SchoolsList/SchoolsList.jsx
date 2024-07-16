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

export default function SchoolsList() {
  const dispatch = useDispatch();
  const schools = useSelector((store) => store.schoolsReducer);

  const [newSchool, setNewSchool] = useState({ school: ''});
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

  return (
    <div>
      <div>
        <h1>Schools</h1>
        <div>
          <Box
            component='form'
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
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
                  <TableCell>School</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {schools.map((school) => (
                  <TableRow
                    key={school.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>{school.school}</TableCell>
                    <TableCell>
                      <Button
                        variant='outlined'
                        onClick={() => handleOpen(school.id)}
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
              {'Are you sure you want to delete school?'}
            </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={deleteSchool}>Yes, Delete</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}