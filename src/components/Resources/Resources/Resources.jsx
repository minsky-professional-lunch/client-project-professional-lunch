import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/joy/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/joy/Tooltip';
import ResourceCards from '../ResourceCards/ResourceCards';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
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
      <Stack sx={{ mb: 2 }} direction='row' alignItems='center' spacing={4}>
        <Stack>
          <Typography sx={{ fontSize: '2rem', fontWeight: 'bold' }} level='h2'>
            Resources
          </Typography>
        </Stack>
        <Stack>
          {user.isAdmin && (
            <>
              <Tooltip title='Add Resource' variant='soft'>
                <LibraryAddIcon
                  sx={{ fontSize: '25px', cursor: 'pointer' }}
                  onClick={() => setAddResourceIsOpen(true)}
                />
              </Tooltip>

              <AddResourceDialog
                open={addResourceIsOpen}
                closeAddResource={closeAddResource}
              />
            </>
          )}
        </Stack>
      </Stack>
      <Grid alignItems='center' justifyContent='center' container spacing={1}>
        {resources.map((resource) => (
          <ResourceCards key={resource.id} resource={resource} />
        ))}
      </Grid>
    </Container>
  );
}
