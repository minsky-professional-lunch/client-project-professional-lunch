import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditResourceDialog({ open, closeEditResource }) {
  const dispatch = useDispatch();
  const resourceId = useParams().id;
  const resource = useSelector((store) => store.resources);

  const [editResourceTitle, setEditResourceTitle] = useState('');
  const [editResourceImage, setEditResourceImage] = useState('');
  const [editResourceUrl, setEditResourceUrl] = useState('');
  const [editResourceAbout, setEditResourceAbout] = useState('');
  const [editResourceCategory, setEditResourceCategory] = useState('');
  const [editResourceNotes, setEditResourceNotes] = useState('');

  const editResource = (event) => {
    event.preventDefault();
    dispatch({
      type: 'EDIT_RESOURCE',
      payload: {
        title: editResourceTitle,
        image: editResourceImage,
        url: editResourceUrl,
        about: editResourceAbout,
        category: editResourceCategory,
        notes: editResourceNotes,
      },
    });
    closeEditResource();
  };

  // useEffect(() => {
  //   event.preventDefault();
  //   dispatch({ type: 'FETCH_SELECTED_RESOURCE', payload: resourceId });
  // }, []);

  return (
    <>
      <Dialog
        open={open}
        onClose={closeEditResource}
        PaperProps={{ component: 'form', onSubmit: editResource }}
      >
        <DialogTitle>EditResource</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ mb: 1.5, mt: 1 }}
            id='title'
            name='title'
            label='Title'
            type='text'
            placeholder={resource.title}
            fullWidth
            value={editResourceTitle}
            onChange={(event) => setEditResourceTitle(event.target.value)}
          />
          <TextField
            sx={{ mb: 1.5 }}
            id='image'
            name='image'
            label='Image'
            type='text'
            placeholder={resource.image}
            fullWidth
            value={editResourceImage}
            onChange={(event) => setEditResourceImage(event.target.value)}
          />
          <TextField
            sx={{ mb: 1.5 }}
            id='url'
            name='url'
            label='URL'
            type='text'
            placeholder={resource.url}
            fullWidth
            value={editResourceUrl}
            onChange={(event) => setEditResourceUrl(event.target.value)}
          />
          <TextField
            sx={{ mb: 1.5 }}
            id='about'
            name='about'
            label='About'
            type='text'
            placeholder={resource.about}
            fullWidth
            value={editResourceAbout}
            onChange={(event) => setEditResourceAbout(event.target.value)}
          />
          <TextField
            sx={{ mb: 1.5 }}
            id='category'
            name='category'
            label='Category'
            type='text'
            placeholder={resource.category}
            fullWidth
            value={editResourceCategory}
            onChange={(event) => setEditResourceCategory(event.target.value)}
          />
          <TextField
            // sx={{ mb: 1.5 }}
            id='notes'
            name='notes'
            label='Notes'
            type='text'
            placeholder={resource.notes}
            fullWidth
            value={editResourceNotes}
            onChange={(event) => setEditResourceNotes(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color='warning'
            type='button'
            onClick={() => closeEditResource()}
          >
            Cancel
          </Button>
          <Button type='submit'>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
