import * as React from 'react';
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMediaQuery } from '@mui/material';



// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })
// (({ theme, expand }) => ({
//   transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//   marginLeft: 'auto',
//   transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest,
//   })
// }));
const getRandomColor = () => {
  // Predefined set of colors
  const colors = ['#FF5733', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#FF5733', '#581845'];
  // Choose a random color from the set
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};


export default function Cards({ idMeal, strMeal, strCategory, strMealThumb, strYoutube, strInstructions, handleCardClick }) {
  // const [expanded, setExpanded] = React.useState(false);
  const isSmallDevice = useMediaQuery('(max-width:600px)');

  const [like, setLike] = React.useState(false);
  const handleLike = () => {
    setLike(!like); // Toggle the like state when the button is clicked
  };

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const handleShare = () => {
    // Replace 'yourLinkHere' with the actual link you want to share
    const linkToShare = 'https://react-recipe-app-lyart.vercel.app/';

    // Check if the browser supports the Web Share API
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: linkToShare
      }).then(() => {
        console.log('Link shared successfully');
      }).catch((error) => {
        console.error('Error sharing link:', error);
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      console.log('Web Share API not supported, using fallback');
      // You can implement your own custom share functionality here
      // For example, copying the link to clipboard or opening a share dialog
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }} onClick={() => handleCardClick(idMeal)} style={{ margin: isSmallDevice ? '12px' : '17px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: getRandomColor }} aria-label="recipe">
            {strMeal[0]}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={strMeal}
        subheader={strCategory}
      />
      <CardMedia
        component="img"
        height="194"
        image={strMealThumb}
        alt={strMeal}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <a href={strYoutube}>Watch on Youtube</a>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon color={like ? 'error' : 'default'} />
        </IconButton>
        <IconButton aria-label="share" onClick={() => handleShare()}>
          <ShareIcon />
        </IconButton>
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent className='hide'>
  <Typography paragraph>Method:</Typography>
  <Typography paragraph>{strInstructions}</Typography>
</CardContent>

      </Collapse> */}
    </Card>
  );
}
