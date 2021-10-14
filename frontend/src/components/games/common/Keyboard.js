import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Box from '@material-ui/core/Box';
import {useStyles} from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import {isMobile} from 'react-device-detect';

const keys = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ['x', 0, '*'],
  ['-', '.', 's'],
];

export default function Keyboard({onChange, onSubmit}) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  function handleOnClick(char) {
    if (char === '*') {
      const subValue = `${value}`.slice(0, -1);
      onChange && onChange(subValue);
      setValue(subValue);
    } else if (char === 'x') {
      onChange && onChange('');
      setValue('');
    } else if (char === 's') {
      onSubmit && onSubmit(value);
    } else if (char === '.') {
      if (!value.match(/\./)) {
        onChange && onChange(`${value}${char}`);
        setValue(`${value}${char}`);
      }
    } else if (char === '-') {
      if (value.match(/-/)) {
        onChange && onChange(`${value}`.slice(1));
        setValue(`${value}`.slice(1));
      } else {
        onChange && onChange(`${char}${value}`);
        setValue(`${char}${value}`);
      }
    } else {
      onChange && onChange(`${value}${char}`);
      setValue(`${value}${char}`);
    }
  }

  function handleOnChange(e) {
    const value = `${e.target.value}`;
    setValue(value);
    onChange && onChange(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit && onSubmit(value);
  }

  function getIcons(char) {
    if (char === '*') return <BackspaceIcon style={{fontSize: '2rem', marginTop: '-0.5rem'}}/>;
    else if (char === 's') return <PlayArrowIcon style={{fontSize: '2rem', color: '#3f51b5', marginTop: '-0.5rem'}}/>;
    else return char;
  }

  function FormRow({keys}) {
    return (
      <React.Fragment>
        {keys.map((char) => (
          <Grid item xs={4} key={char}>
            <Button
              variant="contained"
              color="primary"
              className={classes.paper}
              classes={{
                root: classes.buttonRoot,
              }}
              onClick={(e) => handleOnClick(char)}>
              {getIcons(char)}
            </Button>
          </Grid>
        ))}
      </React.Fragment>
    );
  }

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit}>
        <CssTextField
          className={classes.input}
          variant="outlined"
          inputProps={{
            className: classes.inputPropsTextField,
          }}
          value={value}
          autoFocus={!isMobile}
          onChange={handleOnChange}/>
      </form>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Grid container spacing={1} className={classes.keys} align='center' width="100%">
          {keys.map((list) => (
            <Grid container item xs={12} spacing={1} key={list}>
              <FormRow keys={list}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#B2BABB',
        borderWeight: 3,
      },
      '&:hover fieldset': {
        borderColor: '#D5DBDB',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#B2BABB',
      },
    },
  },
})(TextField);
