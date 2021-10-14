import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Email, Phone} from '@material-ui/icons';
import {intl} from '../../../routes/AppRoot';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  button: {
    width: '100%',
    borderRadius: 5,
  },
  titleForm: {
    flex: 1,
    color: 'white',
    textDecoration: 'none',
  },
});

export default (props) => {
  const classes = useStyles();
  const {actions, profile} = props;

  React.useEffect(() => {
    actions.getCurrentUser();
  }, [actions]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs={9}>
            <Typography variant="h5" component="h3">{profile.first_name} {profile.last_name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography color='secondary' variant='subtitle2'>{intl('profile.card.superAdminProfile.superAdmin')}</Typography>
          </Grid>

          <Grid item xs={12}>
            <br/>
          </Grid>

          <Grid item xs={2}><Phone color='primary'/></Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1"><Box
              fontWeight="fontWeightLight">{profile.phone}</Box></Typography>
          </Grid>
          <Grid item xs={2}><Email color='primary'/></Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1"><Box
              fontWeight="fontWeightLight">{profile.email || intl('profile.card.superAdminProfile.empty')}</Box></Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
