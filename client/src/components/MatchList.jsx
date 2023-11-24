import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { listMatches } from './../../match/api-match'; // Assuming you have an API function to fetch matches

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.openTitle,
  },
}));

const MatchList = () => {
  const classes = useStyles();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matchList = await listMatches();
        setMatches(matchList);
      } catch (error) {
        console.error('Error fetching match list:', error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" className={classes.title}>
          Match List
        </Typography>

        {matches.length === 0 ? (
          <Typography variant="body2">No matches found.</Typography>
        ) : (
          <List>
            {matches.map((match) => (
              <ListItem key={match._id}>
                <ListItemText
                  primary={`${match.players[0]} vs ${match.players[1]}`}
                  secondary={`Result: ${match.result}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchList;