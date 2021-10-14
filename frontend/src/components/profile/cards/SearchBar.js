import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginRight: theme.spacing(3),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar({onChange}) {
  const classes = useStyles();
  const handleFilterTextInputChange = (event) => {
    onChange && onChange(event.target.value);
  };

  return (
    <Paper component="form" className={classes.root}>
      <SearchIcon/>
      <Input
        className={classes.input}
        onChange={handleFilterTextInputChange}
      />
      <Divider className={classes.divider} orientation="vertical"/>
    </Paper>
  );
}
