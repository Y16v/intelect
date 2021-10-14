import Grid from '@material-ui/core/Grid';
import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {intl} from '../../routes/AppRoot';

const useStyles = makeStyles((theme) => createStyles({
  notFound: {
    color: theme.palette.error.main,
    fontSize: '128px',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: theme.palette.grey['700'],
    fontSize: '2em',
    fontWeight: 'bold',
  },
}));


export default function NotFoundOrPermissionDenied({errorMessage}) {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item className={classes.notFound}>
                404
      </Grid>
      <Grid item className={classes.errorMessage}>
        {errorMessage || intl('common.NotFoundPermissionDenied')}
      </Grid>
    </Grid>
  );
}
