import React from 'react';

const GameInstructions = () => (
  <>
    <p style={{ fontWeight: 'bold', fontFamily: 'Helvetica, Arial, sans-serif', textAlign: 'center', margin: '10px 0', fontSize: '1.4em' }}>
      Welcome to the Rock-Paper-Scissors Tournament!
    </p>

    <p style={{ textAlign: 'center', margin: '10px 0' }}>
      <strong style={{fontSize: '1.2em'}}>To get started:</strong>
    </p>

    <p style={{ margin: '10px 0', textAlign: 'left' }}>
      <strong><l style={{color: '#CBC3C3'}}>1. </l>Create an Account:</strong>
      <br />
      <l style={{ marginLeft: '20px' }} />Click on the "Create User" button and follow the instructions to set up your account.
    </p>

    <p style={{ margin: '10px 0', textAlign: 'left' }}>
      <strong><l style={{color: '#CBC3C3'}}>2. </l>Choose Your RPS:</strong>
      <br />
      <l style={{ marginLeft: '20px' }} />After creating your account, select your preferred choice of Rock, Paper, or Scissors.
    </p>

    <p style={{ margin: '10px 0', textAlign: 'left' }}>
      <strong><l style={{color: '#CBC3C3'}}>3. </l>Create a Match:</strong>
      <br />
      <l style={{ marginLeft: '20px' }} />Initiate a match with another user or accept challenges from existing users. Gain points and improve your ranking!
    </p>

    <p style={{ margin: '10px 0', textAlign: 'left' }}>
      <strong><l style={{color: '#CBC3C3'}}>4. </l>Explore the Ranking:</strong>
      <br />
      <l style={{ marginLeft: '20px' }} />Check out the leaderboard to see where you stand among the top-scoring players.
    </p>
  </>
);

export default GameInstructions;