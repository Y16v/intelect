import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import {ToggleButtonGroup} from '@material-ui/lab';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    minHeight: 105,
    maxWidth: 400,
    backgroundColor: ' rgba(128, 165, 220, 0.5) ',
    margin: theme.spacing(1.1),
  },
  minFormContainer: {
    maxHeight: 40,
    minWidth: 300,
    backgroundColor: '#ff9b00',
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 300,
    margin: theme.spacing(2),
  },
  muiTypography: {
    color: 'white',
    fontWeight: 600,
    userSelect: 'none',
  },
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
  grouped: {
    'margin': theme.spacing(0.5),
    'border': 'none',
    'width': 40,
    'height': 40,
    'color': 'white',
    'background': '#4da6ff',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export default function SelectNumber({onChange, disabled = true, label, disables = [], value = 1}) {
  const classes = useStyles();
  const inverse = [1, 2, 3, 4, 5, 6];
  const [formats, setFormats] = React.useState(() => [1, 2, 3, 4, 5, 6].filter((digit) => digit !== value));
  const [preValue, setInValue] = React.useState(() => [value]);
  const handleFormat = (event, newFormats) => {
    const selectedValue = formats.filter((e) => !newFormats.includes(e));
    const digits = [...inverse.filter((e) => value !== e), ...preValue];
    if (selectedValue[0]) {
      setFormats(digits);
      setInValue(selectedValue);
      onChange && onChange(selectedValue[0]);
    }
  };
  React.useEffect(() => {
    setFormats([...inverse.filter((e) => value !== e)]);
  }, [value]);

  return (
    <div className={classes.formContainer}>
      <div className={classes.minFormContainer}>
        <Typography
          className={classes.muiTypography}
          variant="h5"
          component="h2"
          align="center"
        >{label}
        </Typography>
      </div>
      <div className={classes.paper}>
        <Paper elevation={0}>
          <StyledToggleButtonGroup
            size="small"
            value={formats}
            onChange={handleFormat}
          >
            {[1, 2, 3, 4, 5, 6].map((option) => (
              <ToggleButton
                disabled={disabled || disables.includes(option)}
                key={option} value={option}
              >{option}</ToggleButton>
            ))}
          </StyledToggleButtonGroup>
        </Paper>
      </div>
    </div>);
}
