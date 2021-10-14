import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Button} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 50,
    height: 50,
    borderRadius: 5,
    fontSize: 24,
    margin: theme.spacing(1.2),
  },
}));

export default function SwitchButton({checked, onChange, children, style={}}) {
  const classes = useStyles();
  return (<Button
    variant="contained"
    classes={{root: classes.root}}
    style={{
      backgroundColor: checked ? (style.checkBgColor || 'green') : (style.bgColor || 'white'),
      color: style.color || 'black',
    }}
    color="secondary"
    onClick={() => {
      onChange && onChange(!checked);
    }}
  >
    {children}
  </Button>);
}
