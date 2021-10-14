import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import {ToggleButtonGroup} from '@material-ui/lab';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  formContainer: {
    minHeight: 160,
    maxWidth: 400,
    backgroundColor: ' rgba(128, 165, 220, 0.5) ',
    margin: 11,
  },
  minFormContainer: {
    maxHeight: 40,
    minWidth: 300,
    backgroundColor: '#ff9b00',
  },
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    border: '1px solid rgba(255, 148, 246, 0.12)',
    maxWidth: 226,
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
  selected: {
    backgroundColor: '#4da6ff',
    marginRight: 3,
    width: 40,
    height: 40,
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
    'backgroundColor': '#4da6ff',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))(ToggleButtonGroup);

export default function DigitMultipleSelect({defaultValue = [], onChange, disabled=false, label, includeZero=false}) {
  const classes = useStyles();
  const inverse = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  includeZero && inverse.splice(0, 0, 0);
  const inverseCopy = [...inverse];
  const firstRow = inverseCopy.splice(0, 5);
  const secondRow = inverseCopy;

  const [selected, setSelected] = React.useState(defaultValue.length !== inverse.length);
  const [formats, setFormats] = React.useState(() => inverse.filter((digit) => !defaultValue.includes(digit)));

  const handleFormat = (event, newFormats) => {
    const inValue = inverse.filter((e) => newFormats.includes(e));
    const value = inverse.filter((e) => !inValue.includes(e));
    setFormats(inValue);
    onChange && onChange(value);
    setSelected(value.length !== inverse.length);
  };

  function handleSelectAll(value) {
    setSelected(!selected);
    if (value) {
      setFormats([...inverse, 'ok']);
      onChange && onChange([]);
    } else {
      setFormats([]);
      onChange && onChange(inverse);
    }
  }

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
            {firstRow.map((option) => (
              <ToggleButton
                disabled={disabled}
                color="red"
                key={option} value={option}
              >{option}</ToggleButton>
            ))}
          </StyledToggleButtonGroup>
        </Paper>
        <Paper elevation={0}>
          <StyledToggleButtonGroup
            size="small"
            value={formats}
            onChange={handleFormat}
          >
            {secondRow.map((option) => (
              <ToggleButton
                disabled={disabled}
                key={option}
                value={option}>
                {option}
              </ToggleButton>
            ))}
          </StyledToggleButtonGroup>
          <ToggleButton
            value="check"
            selected={selected}
            className={classes.selected}
            disabled={disabled}
            onChange={() => {
              handleSelectAll(!selected);
            }}
          >
            <CheckIcon/>
          </ToggleButton>
        </Paper>
      </div>
    </div>);
}
