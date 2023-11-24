import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import UserList from './../src/components/UserList'; // Import the UserList component
import { list, update } from './../user/api-user'; // Import the update function
import auth from './../lib/auth-helper';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const AddMatch = () => {
  const classes = useStyles();
  const [selectedUser1, setSelectedUser1] = useState('');
  const [selectedUser2, setSelectedUser2] = useState('');
  const [users, setUsers] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await list();
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Enable the button only when both users are selected
    setButtonDisabled(!(selectedUser1 && selectedUser2));
  }, [selectedUser1, selectedUser2]);

  const handleAddMatch = async () => {
    // Check if both selected users have RPS and ELO values
    const user1 = users.find((user) => user.name === selectedUser1);
    const user2 = users.find((user) => user.name === selectedUser2);

    const { getCredentials } = auth();
    const credentials = getCredentials();

    if (user1 && user2) {
      if (!user1.rps || !user1.elo) {
        // Assign RPS randomly or set it to "rock" if automatically assigned
        const randomRPS = Math.random() < 0.33 ? 'rock' : Math.random() < 0.66 ? 'paper' : 'scissors';
        await update({ userId: user1._id }, credentials,{ rps: randomRPS, elo: 1200 });
      }

      if (!user2.rps|| !user2.elo) {
        // Assign RPS randomly or set it to "rock" if automatically assigned
        const randomRPS = Math.random() < 0.33 ? 'rock' : Math.random() < 0.66 ? 'paper' : 'scissors';
        await update({ userId: user2._id }, credentials,{ rps: randomRPS, elo: 1200  });
      }

      // Determine the winner in a rock-paper-scissors match and update ELO values
      const winner = determineWinner(user1.rps, user2.rps);

      if (winner === 'user1') {
        // Update ELO values for the winner and loser
        await updateELO(user1, user2);
        alert(`Match Created: ${selectedUser1} vs ${selectedUser2}\nWinner: ${selectedUser1}`);
      } else if (winner === 'user2') {
        // Update ELO values for the winner and loser
        await updateELO(user2, user1);
        alert(`Match Created: ${selectedUser1} vs ${selectedUser2}\nWinner: ${selectedUser2}`);
      } else {
        alert(`Match Created: ${selectedUser1} vs ${selectedUser2}\nIt's a draw!`);
      }
    }
  };

  const determineWinner = (rps1, rps2) => {
    // logic to determine the winner in a rock-paper-scissors match
    // Return 'user1' if user1 wins, 'user2' if user2 wins, or 'draw' if it's a draw [..Jorge]
    if (
      (rps1 === 'rock' && rps2 === 'scissors') ||
      (rps1 === 'paper' && rps2 === 'rock') ||
      (rps1 === 'scissors' && rps2 === 'paper')
    ) {
      return 'user1';
    } else if (
      (rps1 === 'scissors' && rps2 === 'rock') ||
      (rps1 === 'rock' && rps2 === 'paper') ||
      (rps1 === 'paper' && rps2 === 'scissors')
    ) {
      return 'user2';
    } else {
      return 'draw';
    }
  };

  const updateELO = async (winner, loser) => {
    // logic to update ELO values for the winner and loser
    // ELO rating system
    const K = 32; // K-factor, adjust as needed
    const expectedScoreWinner = 1 / (1 + 10 ** ((loser.elo - winner.elo) / 400));
    const expectedScoreLoser = 1 / (1 + 10 ** ((winner.elo - loser.elo) / 400));
    const updatedELOWinner = winner.elo + K * (1 - expectedScoreWinner);
    const updatedELOLoser = loser.elo + K * (0 - expectedScoreLoser);

    await update({ userId: winner._id }, { elo: updatedELOWinner });
    await update({ userId: loser._id }, { elo: updatedELOLoser });
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Add Match
        </Typography>

        {/* UserList component for selecting the first user */}
        <FormControl className={classes.formControl}>
          <InputLabel>User 1</InputLabel>
          <Select
            value={selectedUser1}
            onChange={(e) => setSelectedUser1(e.target.value)}
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user.name}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* UserList component for selecting the second user */}
        <FormControl className={classes.formControl}>
          <InputLabel>User 2</InputLabel>
          <Select
            value={selectedUser2}
            onChange={(e) => setSelectedUser2(e.target.value)}
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user.name}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Button to create the match */}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleAddMatch}
          disabled={buttonDisabled}
        >
          Create Match
        </Button>
      </CardContent>
    </Card>
  );
};

AddMatch.propTypes = {
  // Add any prop types if needed
};

export default AddMatch;