import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import blueBackgroundImage from './../assets/images/Bgcolor.png';
import anotherImage from './../assets/images/quantumLogo.jpg'; // the logo

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    background: `url(${blueBackgroundImage})`,
    backgroundSize: 'cover',
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.primary.contrastText,
  },
  media: {
    minHeight: 400,
  },
}));

export default function RPSHome() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography variant="h6" className={classes.title} style={{ textAlign: 'center' }}>
        RPSHome Tournament!
      </Typography>

      <CardMedia className={classes.media} image={anotherImage} title="Rock Paper Scissors Tournament" />

      <CardContent>
        <Typography variant="body2" component="p" style={{ color: '#fff' }}>
          Welcome to the Rock Paper SCissors website
        </Typography>
      </CardContent>
    </Card>
  );
}