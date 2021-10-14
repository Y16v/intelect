import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


const middleButton = {
  backgroundColor: '#FF8000',
  fontSize: 18,
  textTransform: 'none',
};

const buttonGroup = {
  backgroundColor: '#AAF200',
  fullWidth: true,
  fontSize: 18,
  textTransform: 'none',
};


export default function GroupedButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <ButtonGroup variant="contained" color="inherit" aria-label="contained primary button group">


        <Button style={buttonGroup}>{'<'}</Button>
        <Button style={buttonGroup}>4д</Button>
        <Button style={buttonGroup}> {'>'} </Button>

        <Button style={middleButton}> 1 (0)</Button>

        <Button style={buttonGroup}> {'<'} </Button>
        <Button style={buttonGroup}> 1c </Button>
        <Button style={buttonGroup}> {'>'} </Button>


      </ButtonGroup>

    </div>
  );
}
