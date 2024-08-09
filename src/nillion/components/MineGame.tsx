import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';

const MineGame = ({ setSecret }: any) => {
  const [bombPosition] = useState(Math.floor(Math.random() * 9));
  const [gamePaused, setGamePaused] = useState(false);
  const [result, setResult] = useState('');
  const [clickedButtons, setClickedButtons] = useState<boolean[]>(Array(9).fill(false));
  const [count, setCount] = useState(0);

  const handleClick = (index: number) => {
    if (clickedButtons[index]) return; // Prevent clicking the same button twice

    const newClickedButtons = [...clickedButtons];
    newClickedButtons[index] = true;
    setClickedButtons(newClickedButtons);

    if (index === bombPosition) {
      setGamePaused(true);
      setResult('Bomb clicked! Game Over.');
      setSecret("0");
    } else {
      const newCount = count + 1;
      setCount(newCount);
      if (newCount === 8) {
        setGamePaused(true);
        setResult('Congratulations! You won!');
        setSecret("1");
      } else {
        setResult('Safe! Keep playing.');
      }
    }
  };

  return (
    <div>
      <Typography variant="h4">Mine Game</Typography>
      <Typography variant="h6">Count: {count}</Typography>
      <Grid container spacing={1}>
        {Array.from({ length: 9 }).map((_, index) => (
          <Grid item xs={4} key={index}>
            <Button
              variant="contained"
              style={{ backgroundColor: clickedButtons[index] ? 'white' : undefined }}
              onClick={() => handleClick(index)}
              disabled={gamePaused}
              fullWidth
            >
              <Typography variant="h4" color="primary">{index === bombPosition ? '0' : '1'}</Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
      {gamePaused && (
        <>
        <Typography variant="h6" color="primary">
          {result}
        </Typography>
        <Typography variant="h6" color="success">
          {count}
        </Typography>
        </>
      )}
    </div>
  );
};

export default MineGame;