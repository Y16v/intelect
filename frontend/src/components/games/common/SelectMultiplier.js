import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {ButtonGroup} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {intl} from '../../../routes/AppRoot';


const useStyles = makeStyles((theme) => ({
  formContainer: {
    minHeight: 285,
    maxWidth: 400,
    backgroundColor: '#e07be2',
    margin: 'auto',
  },
  minFormContainer: {
    maxHeight: 40,
    minWidth: 300,
    backgroundColor: '#b700f8',
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 300,
    margin: '0 auto',
    overFlow: 'hidden',
  },
  muiTypography: {
    color: 'white',
    fontWeight: 600,
    userSelect: 'none',
  },
  button: {
    width: 45,
    height: 45,
  },
  buttonGroup: {
    margin: '0.8%',
  },
  centerdiv: {
    textAlign: 'center',
  },
}));


export default function SelectMultiplier({value = 1, onClick, disabledButtons}) {
  const classes = useStyles();
  return (
    <div>
      <div>
        <Typography
          className={classes.muiTypography}
          variant="h5"
          component="h2"
          align="center"
        >{intl('game.common.selectMultiplier.numberOfDigit')}
        </Typography>
      </div>
      <div className={classes.paper}>
        <div className={classes.centerdiv}>
          <ButtonGroup className={classes.buttonGroup}>
            {[1, 2, 3, 4, 5].map((option) => (
              <Button
                disabled={disabledButtons.includes(option)}
                variant="outlined"
                className={classes.button}
                style={{background: option === value ? 'blue' : 'white'}}
                key={option} value={option}
                onClick={() => onClick && onClick(option)}
              >{option}</Button>
            ))}
          </ButtonGroup>
          <ButtonGroup className={classes.buttonGroup}>
            {[6, 7, 8, 9, 10].map((option) => (
              <Button
                variant="outlined"
                className={classes.button}
                disabled={disabledButtons.includes(option)}
                style={{background: option === value ? 'blue' : 'white'}}
                key={option} value={option}
                onClick={() => onClick && onClick(option)}
              >{option}</Button>
            ))}
          </ButtonGroup>
          <ButtonGroup className={classes.buttonGroup}>
            {[11, 12, 13, 14, 15].map((option) => (
              <Button
                variant="outlined"
                className={classes.button}
                disabled={disabledButtons.includes(option)}
                style={{background: option === value ? 'blue' : 'white'}}
                key={option} value={option}
                onClick={() => onClick && onClick(option)}
              >{option}</Button>
            ))}
          </ButtonGroup>
        </div>
      </div>
    </div>);
}
