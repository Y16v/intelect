import React from 'react';
import {lighten, makeStyles, withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const boxOfProgressBar = {
  bgcolor: '#9999ff',
  borderColor: '#306ef7',
  m: 1,
  borderRadius: 5,
  border: 2,
  marginTop: 'center',
  width: '97%',
  fontSize: '2vw',
};

const boxOfPercentText = {
  bgcolor: '#4da6ff',
  borderColor: '#306ef7',
  borderRadius: 5,
  border: 3,
  margin: 1,
  minWidth: '9vw',
  minHeight: '5vw',
  fontWeight: 'bold',
  fontSize: '3vw',
  color: 'white',
};

const BorderLinearProgress = withStyles({
  root: {
    backgroundColor: lighten('#999900', 0.5),
    textAlign: 'center',
  },
  bar: {
    borderRadius: '5vw',
    backgroundColor: '#306ef7',
  },
})(LinearProgress);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  progress: {
    height: '2vw',
    width: '20vw',
    borderRadius: '5vw',
    alignItems: 'center',
  },
}));

export default function ProgressBars({total, rightTotal}) {
  const classes = useStyles();
  const floor = (v) => parseFloat((v || 0).toFixed(1));
  const percent = floor(rightTotal / total * 100);
  return (
    <div className={classes.root}>
      <Box borderRadius={10} {...boxOfProgressBar}>
        <Grid container wrap="nowrap" direction="row" justify="flex-start" alignItems="center">
          <Box borderRadius={10} {...boxOfPercentText} >
            {percent + '%'}
          </Box>
          <Box>
            <BorderLinearProgress className={classes.progress} value={percent} variant='determinate'
            />
          </Box>
        </Grid>
      </Box>
    </div>
  );
}
