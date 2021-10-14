import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import CreateTeacher from './CreateTeacher';
import ProfileCard from './ProfileCard';
import NavBarContainer from '../../containers/profile/NavBarContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    padding: '20px',
    background: '#E5E5E5',
  },
}));

export default function CreateTeacherPage(props) {
  const {profile} = props;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBarContainer/>
      <Grid
        container
        direction="row"
      >
        <CreateTeacher {...props}/>
        <ProfileCard
          user={profile.user || {}}
          school={profile.school}
          studentCount={profile.students.length}
          teacherCount={profile.teachers.length}/>
      </Grid>
    </div>
  );
}
