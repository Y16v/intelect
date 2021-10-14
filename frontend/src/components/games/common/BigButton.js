import Button from '@material-ui/core/Button';
import React from 'react';
import {useStyles} from '../afterburner/style';


export default function BigButton({onClick, children}) {
  const classes = useStyles();
  return (
    <Button
      variant="outlined"
      color="primary"
      aria-label="add"
      className={classes.buttonStart}
      onClick={onClick}
      classes={{
        root: classes.buttonRoot,
      }}>
      {children}
    </Button>
  );
}
