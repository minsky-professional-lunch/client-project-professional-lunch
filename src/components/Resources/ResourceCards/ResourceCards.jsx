import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/material/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Grid from '@mui/joy/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/joy/Typography';
import EditResourceDialog from '../EditResourceDialog/EditResourceDialog';

export default function ResourceCards({ resource }) {
  const dispatch = useDispatch();

  // const resources = useSelector((store) => store.resources);
  const user = useSelector((store) => store.user);

  const [editResourceIsOpen, setEditResourceIsOpen] = useState(false);
  const closeEditResource = () => setEditResourceIsOpen(false);

  const deleteResource = (resourceId) => {
    dispatch({ type: 'DELETE_RESOURCE', payload: resourceId });
  };

  return (
    <Box>
      <Card
        variant='outlined'
        spacing={2}
        sx={{ mb: 1.5, width: 300, display: 'flex', flexDirection: 'column' }}
      >
        <div>
          <Typography level='title-lg'>{resource.title}</Typography>
        </div>
        <AspectRatio minHeight='120px' maxHeight='200px'>
          <img
            src={resource.image}
            loading='lazy'
            alt='a logo for the resource'
          />
        </AspectRatio>
        <CardContent orientation='horizontal'>
          <div>
            <Typography level='body-xs'>{resource.about}</Typography>
            <Typography fontSize='md' fontWeight='md' mb={2}>
              <Link href={resource.url}>Visit Resource</Link>
            </Typography>
            {user.isAdmin && (
              <>
                <Button
                  variant='solid'
                  size='md'
                  color='primary'
                  sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                  onClick={() => deleteResource(resource.id)}
                >
                  Remove
                </Button>
                <Button
                  variant='solid'
                  size='md'
                  color='primary'
                  sx={{ ml: '4px', alignSelf: 'center', fontWeight: 600 }}
                  onClick={() => setEditResourceIsOpen(true)}
                >
                  Edit
                </Button>
                <EditResourceDialog
                  open={editResourceIsOpen}
                  closeEditResource={closeEditResource}
                />
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </Box>
  );
}
