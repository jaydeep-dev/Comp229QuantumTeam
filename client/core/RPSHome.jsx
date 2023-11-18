import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import blueBackgroundImage from './../assets/images/Bgcolor.png';
import quantumLogo from './../assets/images/quantumLogo.jpg';
import homePageBG from './../assets/images/BigBg.png';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
    margin: 'auto',
    marginTop: theme.spacing(1),
    background: `url(${blueBackgroundImage})`,
    backgroundSize: 'cover',
  },
  /**title: {
    padding: theme.spacing(3, 2.5, 2),
    color: '#fff',
    textAlign: 'center',
  },*/
  media: {
    width: 1080,
    height: 600,
    margin: '0 auto',
    //marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    margin: '0 auto',
    display: 'block',
  },
  content: {
    color: '#fff',
    textAlign: 'center',
  },
}));

export default function RPSHome() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      

      <CardMedia className={classes.media} image={homePageBG} title="Rock Paper Scissors Welcome!" />

      <CardContent>
        <Typography variant="body2" component="p" className={classes.content}>
          Experience the excitement of Rock Paper Scissors in our tournament. Compete, have fun, and emerge victorious!
        </Typography>
      </CardContent>
    </Card>
  );
}