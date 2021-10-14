import React from 'react';
import {history} from '../../index';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import {CardActions} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '400px',
    justify: 'center',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  image: {
    width: 200,
    height: 250,
  },
  grid: {
    width: '100%',
    height: '100%',
    paddingTop: '20vh',
  },
  typography: {
    marginTop: '8vh',
    fontWeight: 500,
    fontSize: '30px',
  },
  divOfButtons: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  button: {
    width: '18vw',
    height: '7vh',
    margin: '5px',
  },
}));

export default function NonActivatedUserPage({actions}) {
  const classes = useStyles();
  return (
    <div style={{backgroundColor: '#ecf0f1', alignItems: 'center', height: '100vh'}}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{minHeight: '100vh'}}
      >
        <Grid >
          <Card className={classes.root}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                                ;(
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                                Уупс! Ваш пакет был истечен! Обратитесь вашему администратору школы, чтобы обновить пакет.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="secondary"
                onClick={() => actions.logout()}
              >
                                Выйти
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => history.push('/games')}
              >
                                Админ обновил мои доступы
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
