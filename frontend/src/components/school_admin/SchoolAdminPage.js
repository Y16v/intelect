import {makeStyles} from '@material-ui/core/styles';
import React from 'react';
import PersonsTable from './PersonsTable';
import ProfileCard from './ProfileCard';
import Grid from '@material-ui/core/Grid';
import NavBarContainer from '../../containers/profile/NavBarContainer';
import LinkMobileApp from '../../containers/LinkMobileApp/LinkMobileAppContainer';
import {isMobile} from 'react-device-detect';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    padding: '20px',
    background: '#E5E5E5',
    width: '100%',
  },
}));

export default function SchoolAdminPage({
  students, teachers, user = {}, school, actions, updateTeacherAccess, actionMenuAttrs,
}) {
  React.useEffect(() => {
    actions.getTeachers();
    actions.getStudents();
    actions.getSchool();
  }, [actions]);
  const classes = useStyles();
  const redirectToEditSchoolAdmin = actions.redirectToEditSchoolAdmin;
  return (
    <div className={classes.root}>
      <NavBarContainer/>
      { isMobile ? <LinkMobileApp /> : <div/>}
      <Grid
        container
        direction="row"
        justify="center"
      >
        <PersonsTable
          data={teachers}
          onClick={actions.getPersonData}
          actions={actions}
          pack={school.package}
          updateTeacherAccess={updateTeacherAccess}
          actionMenuAttrs={actionMenuAttrs}
        />
        <ProfileCard user={user || {}} school={school} studentCount={students.length} teacherCount={teachers.length} redirectToEditSchoolAdmin={redirectToEditSchoolAdmin} />
      </Grid>
    </div>
  );
}

