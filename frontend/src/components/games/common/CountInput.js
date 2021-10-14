import React from 'react';
import {makeStyles, Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 50,
    height: 50,
    background: '#4da6ff',
    borderRadius: 5,
    fontSize: 24,
    fontWeight: 'bolder',
  },
  typographyForm: {
    textAlign: 'center',
    marginTop: 'center',
    color: '#ffffff',
    fontWeight: 'bolder',
    height: 50,
    fontSize: 36,
    maxWidth: 50,
    minWidth: 60,
  },
}));

export default function CountInput({min, max, step=1, defaultValue, onChange}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(defaultValue || min || 0 );
  const floor = (v) => parseFloat((v || 0).toFixed(1));

  const onClickPlus = () => {
    if (value < (max || 10)) {
      setValue(floor(value + step));
      onChange && onChange(floor(value + step));
    }
  };
  const onClickMinus = () => {
    if (value > (min || 0)) {
      setValue(floor(value - step));
      onChange && onChange(floor(value - step));
    }
  };

  const onChangeValue = (e) => {
    let value = e.target.value;
    if (value >= (max || 10)) {
      value = max || 10;
    } else if (value <= (min || 0)) {
      value = min || 0;
    }
    onChange && onChange(floor(parseFloat(value)));
    setValue(floor(parseFloat(value)));
  };

  return (
    <div className={classes.formControl}>
      <Grid container
        direction="row"
        justify="center"
        alignItems="center">
        <Button
          className={classes.root}
          color="primary"
          onClick={onClickMinus}>
          {'-'}
        </Button>
        <Typography
          className={classes.typographyForm}
          variant="subtitle1"
          onChange={onChangeValue}
          inputprops={{
            min: min || 0,
            max: max || 10,
            step: step || 0.1,
          }}
        >{value}</Typography>
        <Button
          className={classes.root}
          color="primary"
          onClick={onClickPlus}>
          {'+'}
        </Button>
      </Grid>
    </div>);
}
