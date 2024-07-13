import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Grid from '@mui/joy/Grid';
import Typography from '@mui/joy/Typography';

export default function ResourceCards({ resource }) {
  return (
    <Grid container item spacing={3}>
      <Card sx={{ width: 320 }} variant='outlined'>
        <div>
          <Typography level='title-lg'>{resource.title}</Typography>
          {/* <Typography level="body-sm">April 24 to May 02, 2021</Typography> */}
        </div>
        <AspectRatio minHeight='120px' maxHeight='200px'>
          <img
            src={resource.image}
            srcSet='https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x'
            loading='lazy'
            alt=''
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
              aria-label='Explore Bahamas Islands'
              sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
            >
              Explore
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
