import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/joy/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import Typography from '@mui/material/Typography';
import ResourceCards from '../ResourceCards/ResourceCards';
import AddResource from '../AddResourceDialog/AddResourceDialog';
import AddResourceDialog from '../AddResourceDialog/AddResourceDialog';
import { Container } from '@mui/material';

export default function Resources() {
  const dispatch = useDispatch();
  const history = useHistory();
  const resources = useSelector((store) => store.resources);
  const user = useSelector((store) => store.user);

  const [addResourceIsOpen, setAddResourceIsOpen] = useState(false);
  
  const closeAddResource = () => setAddResourceIsOpen(false);
  
  useEffect(() => {
    dispatch({ type: 'FETCH_RESOURCES' });
  }, []);

  return (
    <Container maxWidth='lg'>
      <h1>Resources</h1>
      <Grid container spacing={1}>
        {resources.map((resource) => (
          <ResourceCards key={resource.id} resource={resource} />
        ))}
      </Grid>
      {user.isAdmin && (
        <>
          <Button
            sx={{ mb: 8 }}
            variant='outlined'
            color='neutral'
            onClick={() => setAddResourceIsOpen(true)}
          >
            Add Resource
          </Button>
          <AddResourceDialog
            open={addResourceIsOpen}
            closeAddResource={closeAddResource}
          />
        </>
      )}
    </Container>
  );
}
