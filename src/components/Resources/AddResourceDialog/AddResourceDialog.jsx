import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AddResourceDialog({ open, closeAddResource }) {
  const dispatch = useDispatch();

  // const [newResource, setNewResource] = useState({
  //   title: '',
  //   image: '',
  //   url: '',
  //   about: '',
  //   category: '',
  //   notes: '',
  // });

  const [resourceTitle, setResourceTitle] = useState('')
  const [resourceImage, setResourceImage] = useState('')
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceAbout, setResourceAbout] = useState('');
  const [resourceCategory, setResourceCategory] = useState('');
  const [resourceNotes, setResourceNotes] = useState('');
  

  const addResource = (event) => {
    event.preventDefault();
    dispatch({ type: 'ADD_RESOURCE', payload: { title: resourceTitle, image: resourceImage, url: resourceUrl, about: resourceAbout, category: resourceCategory, notes: resourceNotes  }});
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
      <Container maxWidth='md'>
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
              value={resourceTitle}
              onChange={(event) =>
                setResourceTitle(event.target.value)
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
              value={resourceImage}
              onChange={(event) =>
                setResourceImage(event.target.value)
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
              value={resourceUrl}
              onChange={(event) =>
                setResourceUrl(event.target.value)
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
              value={resourceAbout}
              onChange={(event) =>
                setResourceAbout(event.target.value)
              }
            />
            <TextField
              sx={{ mb: 1.5 }}
              id='category'
              name='category'
              label='category'
              type='text'
              placeholder='Category'
              value={resourceCategory}
              onChange={(event) =>
                setResourceCategory(event.target.value)
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
              value={resourceNotes}
              onChange={(event) =>
                setResourceNotes(event.target.value)
              }
            />
          </DialogContent>
          <DialogActions>
            <Button
              color='warning'
              type='button'
              onClick={() => closeAddResource()}
            >
              Cancel
            </Button>
            <Button type='submit'>Submit</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}
