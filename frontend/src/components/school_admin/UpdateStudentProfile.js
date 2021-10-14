import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import PersonForm from './forms/PersonForm';
import {Redirect} from 'react-router-dom';
import {USER_CATEGORY_PUSH} from '../../reducers/user/fixture';
import {USER} from '../../store/storage_kets';
import NavBarContainer from '../../containers/profile/NavBarContainer';
import ProfileCard from './ProfileCard';
import {intl} from '../../routes/AppRoot';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    padding: '20px',
    background: '#E5E5E5',
  },
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

export default function UpdateStudentProfile(props) {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem(USER));
  const {person, profile, actions} = props;
  const personif = (person && person.teacher_id);
  const personifelse = (person && person.group_id);
  React.useEffect(() => {
    actions.getCurrentUser();
  }, [actions]);

  React.useEffect(() => {
    if (person && person.teacher_id) {
      actions.setTeacherIdAndGetGroupsSelectOptions(person.teacher_id);
    }
    if (person && person.group_id) {
      actions.onSelectGroup(person.group_id);
    }
  }, [actions, person, personif, personifelse]);

  return (
    <div className={classes.root}>
      <NavBarContainer/>
      {!person.id && <Redirect to={USER_CATEGORY_PUSH[user.category_id]}/>}
      <Grid
        container
        direction="row">
        <List className={classes.list}>
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="flex-start">
            <Box>
              <Typography className={classes.headText}>
                {intl('schoolAdmin.updateStudentProfile')}
              </Typography>
            </Box>
            <PersonForm {...props}/>
            <br/>
          </Grid>
        </List>
        <ProfileCard
          user={profile.user || {}}
          school={profile.school}
          studentCount={profile.students.length}
          teacherCount={profile.teachers.length}/>
      </Grid>
    </div>
  );
}
