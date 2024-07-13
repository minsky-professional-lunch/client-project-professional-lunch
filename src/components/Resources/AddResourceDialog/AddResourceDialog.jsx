import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddResourceDialog({ open, closeAddResource }) {
  const dispatch = useDispatch();

  const [newResource, setNewResource] = useState({
    title: '',
    image: '',
    url: '',
    about: '',
    category: '',
    notes: '',
  });

  const addResource = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_RESOURCE', payload: { newResource } });
    closeAddResource();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeAddResource}
        PaperProps={{ component: 'form', onSubmit: addResource }}
      >
        <DialogTitle>Add Resource</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mb: 1.5, mt: 1 }}
            id='title'
            name='title'
            label='title'
            type='text'
            placeholder='Title'
            value={newResource.title}
            onChange={(event) =>
              setNewResource({ ...newResource, title: event.target.value })
            }
            required
          />
          <TextField
            sx={{ mb: 1.5 }}
            id='image'
            name='image'
            label='image'
            type='text'
            placeholder='Image'
            value={newResource.image}
            onChange={(event) =>
              setNewResource({ ...newResource, image: event.target.value })
            }
            required
          />
          <TextField
            sx={{ mb: 1.5 }}
            id='url'
            name='url'
            label='url'
            type='text'
            placeholder='URL'
            value={newResource.url}
            onChange={(event) =>
              setNewResource({ ...newResource, url: event.target.value })
            }
            required
          />
          <TextField
            sx={{ mb: 1.5 }}
            id='about'
            name='about'
            label='about'
            type='text'
            placeholder='About'
            value={newResource.about}
            onChange={(event) =>
              setNewResource({ ...newResource, about: event.target.value })
            }
            
          />
          <TextField
            sx={{ mb: 1.5 }}
            id='category'
            name='category'
            label='category'
            type='text'
            placeholder='Category'
            value={newResource.category}
            onChange={(event) =>
              setNewResource({ ...newResource, category: event.target.value })
            }
            required
          />
          <TextField
            sx={{ mb: 1.5 }}
            id='notes'
            name='notes'
            label='notes'
            type='text'
            placeholder='Notes'
            value={newResource.notes}
            onChange={(event) =>
              setNewResource({ ...newResource, notes: event.target.value })
            }
            
          />
        </DialogContent>
        <DialogActions>
          <Button color='warning' type='button' onClick={() => closeAddResource()}>Cancel</Button>
          <Button type='submit'>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
