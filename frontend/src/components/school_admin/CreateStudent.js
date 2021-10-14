import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import PersonForm from './forms/PersonForm';
import {Redirect} from 'react-router-dom';
import {USER} from '../../store/storage_kets';
import {USER_CATEGORY_PUSH} from '../../reducers/user/fixture';
import ProfileCard from './ProfileCard';
import NavBarContainer from '../../containers/profile/NavBarContainer';
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

export default function CreateStudent(props) {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem(USER));
  const {profile, selectedTeacherId, actions} = props;

  React.useEffect(() => {
    actions.getCurrentUser();
    actions.setTeacherIdAndGetGroupsSelectOptions(selectedTeacherId);
  }, [actions, selectedTeacherId]);

  return (
    <div className={classes.root}>
      <NavBarContainer/>
      {!selectedTeacherId && <Redirect to={USER_CATEGORY_PUSH[user.category_id]}/>}
      <Grid container direction="row">
        <List className={classes.list}>
          <Grid
            container
            direction="column"
            justify="space-evenly"
            alignItems="flex-start">
            <Box>
              <Typography className={classes.headText}>
                {intl('schoolAdmin.createStudent')}
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
