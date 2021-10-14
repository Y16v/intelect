import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '75px',
    transform: 'translate(-23px, 5px) rotate(-45deg)',
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    left: 0,
    padding: theme.spacing(0.4),
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    fontSize: '8px',
    fontWeight: '600',
    textAlign: 'center',
  },
}));


export default ({version}) => {
  const classes = useStyles();

  return (<div className={classes.main}>
    <span className={classes.versionNumber}>
      {`#${version}`}
    </span>
  </div>);
};
