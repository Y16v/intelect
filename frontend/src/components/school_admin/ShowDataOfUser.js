import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import {Container} from '@material-ui/core';
import {intl} from '../../routes/AppRoot';

const useStyles = makeStyles({
  list: {
    marginBottom: '10vh',
  },
  fullList: {
    width: 'auto',
  },
  typography: {
    margin: '20px',
    marginTop: '10px',
  },
});

export default function ShowDataOfUser({userData, selectedPerson}) {
  const classes = useStyles();

  return (
    <div
      className={classes.fullList}
      role="presentation"
    >
      <Container>
        <List className={classes.list}>
          <Typography className={classes.typography} variant="h5">
            {selectedPerson.first_name} {selectedPerson.last_name}
          </Typography>
          <Typography variant="h6">
            {intl('loginText')}   {'  '+userData.login}
          </Typography>
          <Typography variant="h6">
            {intl('password')}   {'  '+userData.student_password}
          </Typography>
          <Typography variant="h6">
            {intl('phone')}   {'  '+selectedPerson.phone}
          </Typography>
          <Typography variant="h6">
            {intl('email')}  {'  '+selectedPerson.email}
          </Typography>
        </List>
      </Container>
    </div>
  );
}
