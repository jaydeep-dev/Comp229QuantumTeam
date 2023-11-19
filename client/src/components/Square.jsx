import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import backGroundImage from './../../assets/images/Bgcolorw.png';

const useStyles = makeStyles((theme) => ({
  square: {
    flex: 1,
    //width: 200,
    //height: 200,
    background: `url(${backGroundImage})`,
    backgroundSize: 'cover',
    borderRadius: 10,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: theme.spacing(2),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    color: '#000',
    fontWeight: 'bold',
    //marginBottom: theme.spacing(1),
  },
  body: {
    color: '#2196f3', // Bluish color
  },
}));

const Square = ({ title, body, children, style }) => {
  const classes = useStyles();

  return (
    <div className={classes.square} style={style}>
      <div className={classes.content}>
        <div className={classes.title}>
          <p>{title}</p>
        </div>
        <div className={classes.body}>
          <p>{body}</p>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Square;