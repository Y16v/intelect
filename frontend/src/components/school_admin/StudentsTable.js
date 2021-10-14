import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import {deepOrange} from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import {Box} from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {history} from '../../index';
import {intl} from '../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '63vw',
    maxWidth: '63vw',
    maxHeight: '80vh',
    padding: 20,
    borderRadius: '4px',
    background: '#FFFFFF',
    marginBottom: '20px',
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: '#2196F3',
  },
  list: {
    maxHeight: '60vh',
    position: 'relative',
    overflow: 'auto',
  },
  textItem: {
    color: '#515151',
    fontSize: '17px',
  },
}));

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
        theme.palette.type === 'light',
  title: {
    flex: '1 1 100%',
  },
  createButton: {
    height: '5vh',
    width: '10vw',
    fontWeight: 'bold',
    background: '#2196F3',
  },
}));

const TableToolbar = ({pack}) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar
      className={classes.root}
    >
      <Typography style={{fontStyle: 'normal', fontSize: '26px', lineHeight: '30px', fontWeight: 'bold'}}
        className={classes.title} variant="h6" id="tableTitle">
        {intl('schoolAdmin.studentTable.students')}
      </Typography>
      <Tooltip title="Create list">
        <Button
          className={classes.createButton}
          onClick={() => history.push('/create_students')}
          variant="contained" color="primary"
          disabled={pack <= 0}
        >
          {intl('schoolAdmin.studentTable.create')}
        </Button>
      </Tooltip>
    </Toolbar>
  );
};

export default function StudentsTable({data, onClick, pack, actions}) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <TableToolbar pack={pack}/>
      <Grid item xs={12}>
        <List className={classes.list} style={{width: '100%'}}>
          {data.map((user) => {
            const name = user.first_name + ' ' + user.last_name;
            const phoneNumber = user.phone;
            let rating;
            return (
              <ListItem style={{width: '100%'}} key={user.id} button>
                <Box
                  onClick={() => onClick && onClick(user)}>
                  <ListItemAvatar>
                    <Avatar className={classes.orange}/>
                  </ListItemAvatar>
                </Box>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  wrap="nowrap"
                >
                  <Grid
                    onClick={() => onClick && onClick(user)}
                    container>
                    <Grid item xs={4}><Typography className={classes.textItem}
                      primary={name}>{name}</Typography></Grid>
                    <Grid item xs={4}><Typography className={classes.textItem} id={phoneNumber}
                      primary={phoneNumber}>{phoneNumber}</Typography></Grid>
                    <Grid item xs={3}><Typography className={classes.textItem} id={rating}
                      primary={rating}>{rating}</Typography></Grid>
                  </Grid>
                </Grid>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Box>
  );
}
