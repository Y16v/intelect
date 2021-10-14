import React from 'react';
import {Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SwitchButton from './SwitchButton';
import {intl} from '../../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    minHeight: 130,
    maxWidth: 400,
    backgroundColor: ' rgba(128, 165, 220, 0.5) ',
    margin: 11,
  },
  minFormContainer: {
    maxHeight: 40,
    minWidth: 300,
    backgroundColor: '#ff9b00',
  },
  centerForm: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(1),
  },
  muiTypography: {
    color: 'white',
    fontWeight: 600,
    userSelect: 'none',
  },
}));

export default function SelectOperations({defaultValue='+/-', onChange}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(defaultValue);

  function handleChange(checked, value) {
    if (checked) {
      setValue(value);
    }
    onChange && onChange(value);
  }
  return (
    <div className={classes.formContainer}>
      <div className={classes.minFormContainer}>
        <Typography
          className={classes.muiTypography}
          variant="h5"
          component="h2"
          align="center"
        >{intl('chooseAnExpression')}
        </Typography>
      </div>
      <div className={classes.centerForm}>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center">
          <SwitchButton
            style={{checkBgColor: '#4da6ff'}}
            checked={value === '+'}
            onChange={(checked) => handleChange(checked, '+')}
          >+</SwitchButton>
          <SwitchButton
            style={{checkBgColor: '#4da6ff'}}
            checked={value === '-'}
            onChange={(checked) => handleChange(checked, '-')}
          >-</SwitchButton>
          <SwitchButton
            checked={value === '+/-'}
            style={{checkBgColor: '#4da6ff'}}
            onChange={(checked) => handleChange(checked, '+/-')}
          >+ -</SwitchButton>
        </Grid>
      </div>
    </div>
  );
}
