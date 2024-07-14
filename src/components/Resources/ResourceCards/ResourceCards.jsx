import AspectRatio from '@mui/joy/AspectRatio';
import Box  from '@mui/material/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';

export default function ResourceCards({ resource }) {
  return (
    <Box>
      <Card variant="outlined" spacing={3} sx={{ mb: 1.5, width: 300, display: "flex", flexDirection: "column" }}>
        <div>
          <Typography level='title-lg'>{resource.title}</Typography>
          {/* <Typography level="body-sm">April 24 to May 02, 2021</Typography> */}
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
            <Typography fontSize='lg' fontWeight='lg'>
              {resource.url}
            </Typography>
            <Typography level='body-xs'>{resource.about}</Typography>
            <Button
              variant='solid'
              size='md'
              color='primary'
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            >
              Explore
            </Button>
          </div>
        </CardContent>      
      </Card>
    </Box>
  );
}
