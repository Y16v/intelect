import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {Email, Person, Phone, School} from '@material-ui/icons';
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
  buttonFormControl: {
    width: '90%',
    borderRadius: 20,
    color: 'white',
    fontWeight: 'bolder',
  },
});

export default function TeacherPersonalData({actions, user, students, school}) {
  const classes = useStyles();
  React.useEffect(() => {
    actions.getTeacherPersonalDate();
  }, [actions]);
  const profile = user.TeacherPersonalDate;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={1} alignItems='center'>
          <Grid item xs={9}>
            <Typography variant="h5" component="h3">{profile.first_name} {profile.last_name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography color='secondary' variant='subtitle2'>{profile.category}</Typography>
          </Grid>

          <Grid item xs={12}>
            <br/>
          </Grid>

          <Grid item xs={2}><School color='primary'/></Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1"><Box
              fontWeight="fontWeightLight">{`${profile.first_name} ${profile.last_name}`}</Box></Typography>
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
          <Grid item xs={2}><Person color='primary'/></Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle1"><Box
              fontWeight="fontWeightLight">{students.length} {intl('profile.card.superAdminProfile.student')}</Box></Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
