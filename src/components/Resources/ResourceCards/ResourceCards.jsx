import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/joy/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import EditResourceDialog from '../EditResourceDialog/EditResourceDialog';

export default function ResourceCards({ resource }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [editResourceIsOpen, setEditResourceIsOpen] = useState(false);
  const closeEditResource = () => setEditResourceIsOpen(false);

  const [open, setOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState(null);
  const handleClose = () => setOpen(false);
  const handleOpen = (resourceId) => {
    setResourceToDelete(resourceId);
    setOpen(true);
  };

  const deleteResource = () => {
    dispatch({ type: 'DELETE_RESOURCE', payload: resourceToDelete });
  };

  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = resource.about;

  if (!showFullDescription) {
    description = description.substring(0, 90) + '....';
  }

  return (
    <Box>
      <Card
        variant='outlined'
        spacing={2}
        sx={{
          mb: 2,
          ml: 1,
          mr: 1,
          width: 330,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack direction='row' textAlign='center'>
          <Typography level='title-lg'>{resource.title}</Typography>
        </Stack>
        <AspectRatio minHeight='120px' maxHeight='220px'>
          <img
            src={resource.image}
            loading='lazy'
            alt='a logo for the resource'
            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
          />
        </AspectRatio>
        <CardContent orientation='horizontal'>
          <div>
            <Typography level='body-xs'>{description}</Typography>
            <Typography
              onClick={() => setShowFullDescription((prevState) => !prevState)}
              variant='plain'
              fontSize='sm'
              fontWeight='sm'
              textAlign='right'
              textColor='primary.500'
            >
              {showFullDescription ? 'Less' : 'More'}
            </Typography>
            <Stack sx={{mt: 1}} direction='row' justifyContent='space-between' spacing={2}>
              {user.isAdmin && (
                <Stack direction='row' justifyContent='flex-end'>
                  <Tooltip title='Delete Resource' variant='soft'>
                    <DeleteForeverIcon
                      sx={{ fontSize: '40px', cursor: 'pointer' }}
                      onClick={() => handleOpen(resource.id)}
                    />
                  </Tooltip>
                </Stack>
              )}
              <Typography fontSize='md' fontWeight='md' mb={2}>
                <Link href={resource.url}>Visit Resource</Link>
              </Typography>
              {user.isAdmin && (
                <Stack direction='row' justifyContent='flex-end'>
                  <Tooltip title='Edit Resource' variant='soft'>
                    <EditIcon
                      sx={{ fontSize: '40px', cursor: 'pointer' }}
                      onClick={() => setEditResourceIsOpen(true)}
                    />
                  </Tooltip>
                </Stack>
              )}
            </Stack>
            {user.isAdmin && (
              <>
                <EditResourceDialog
                  open={editResourceIsOpen}
                  closeEditResource={closeEditResource}
                  resource={resource}
                />
              </>
            )}
          </div>
        </CardContent>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {'Are you sure you want to delete this resource?'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} variant='outlined' color='neutral'>
              Cancel
            </Button>
            <Button onClick={deleteResource} variant='outlined' color='danger'>
              Yes, Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Box>
  );
}
