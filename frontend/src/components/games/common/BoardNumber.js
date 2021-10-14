import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core';
import '../../../styles/colus.css';

const useStyles = makeStyles({
  root: {
    // marginTop: '5vw',
    // backgroundColor: "white",
  },
  number: {
    fontSize: '16vw',
    fontWeight: 'inherit',
  },

});

export default function BoardNumber({number, color, actions={}, isDigit, font}) {
  const classes = useStyles();
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false);
    return () => document.removeEventListener('keydown', handleKeyPress, false);
  }, []);

  function handleKeyPress(event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      actions.stopProcess();
      actions.stopTimerGame();
    }
  }
  const getSize = (number) => {
    const length = `${number}`.length;
    if (length <= 7) return '19.8vw';
    else return '13.5vw';
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1" component="h2" gutterBottom className={classes.number}
        style={{
          color: color || '#000',
          fontWeight: 'bold',
          fontFamily: 'Montserrat',
          fontSize: getSize(number),
        }}>
        {number}
      </Typography>
    </div>
  );
}
