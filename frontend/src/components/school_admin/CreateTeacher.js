import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import PersonForm from './forms/PersonForm';
import {intl} from '../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  headText: {
    position: 'absolute',
    width: '329px',
    height: '36px',
    fontStyle: 'normal',
    fontWeight: '400px',
    fontSize: '33px',
    lineHeight: '28px',
    letterSpacing: '0.15px',
    color: '#515151',
  },
  list: {
    minHeight: '110vh',
    maxHeight: '120vh',
    width: '60vw',
    background: '#FFFFFF',
    padding: '40px',
    borderRadius: '5px',
    marginBottom: '40ph',
  },
}));

export default function CreateTeacher(props) {
  const classes = useStyles();
  return (
    <div>
      <List className={classes.list}>
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="flex-start"
        >
          <Box>
            <Typography className={classes.headText}>
              {intl('schoolAdmin.createTeacher')}
            </Typography>
          </Box>
          <PersonForm {...props}/>
          <br/>
        </Grid>
      </List>
    </div>
  );
}
