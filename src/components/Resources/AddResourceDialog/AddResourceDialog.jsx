import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddResourceDialog({ open, closeAddResource }) {
  const dispatch = useDispatch();

  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceImage, setResourceImage] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceAbout, setResourceAbout] = useState('');
  const [resourceCategory, setResourceCategory] = useState('');
  const [resourceNotes, setResourceNotes] = useState('');

  const addResource = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_RESOURCE',
      payload: {
        title: resourceTitle,
        image: resourceImage,
        url: resourceUrl,
        about: resourceAbout,
        category: resourceCategory,
        notes: resourceNotes,
      },
    });
    setResourceTitle('');
    setResourceImage('');
    setResourceUrl('');
    setResourceAbout('');
    setResourceCategory('');
    setResourceNotes('');
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
            label='Title'
            type='text'
            placeholder='Title'
            fullWidth
            value={resourceTitle}
            onChange={(event) => setResourceTitle(event.target.value)}
            required
          />
          <TextField
            sx={{ mb: 1.5 }}
            id='image'
            name='image'
            label='Image'
            type='text'
            placeholder='Image'
            fullWidth
            value={resourceImage}
            onChange={(event) => setResourceImage(event.target.value)}
            required
          />
          <TextField
            sx={{ mb: 1.5 }}
            id='url'
            name='url'
            label='URL'
            type='text'
            placeholder='URL'
            fullWidth
            multiline
            minRows={2}
            value={resourceUrl}
            onChange={(event) => setResourceUrl(event.target.value)}
            required
          />
          <TextField
            sx={{ mb: 1.5 }}
            id='about'
            name='about'
            label='About'
            type='text'
            placeholder='About'
            fullWidth
            multiline
            minRows={2}
            required
            value={resourceAbout}
            onChange={(event) => setResourceAbout(event.target.value)}
          />
          <TextField
            sx={{ mb: 1.5 }}
            id='category'
            name='category'
            label='Category'
            type='text'
            placeholder='Category'
            fullWidth
            value={resourceCategory}
            onChange={(event) => setResourceCategory(event.target.value)}
            required
          />
          <TextField
            // sx={{ mb: 1.5 }}
            id='notes'
            name='notes'
            label='Notes'
            type='text'
            placeholder='Notes'
            fullWidth
            value={resourceNotes}
            onChange={(event) => setResourceNotes(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color='neutral'
            variant='outlined'
            type='button'
            onClick={() => closeAddResource()}
          >
            Cancel
          </Button>
          <Button type='submit'color='neutral'>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
