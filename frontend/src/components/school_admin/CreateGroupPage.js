import React from 'react';
import NavBarContainer from '../../containers/profile/NavBarContainer';
import {CardContent, Container} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import GroupForm from './forms/GroupForm';
import '../../styles/createGroupPage.css';
import {intl} from '../../routes/AppRoot';

export default function({
  actions,
  match,
  school_id,
  name,
  profile,
  teacherProfile,
  nameError,
}) {
  const {teacherId} = match.params;

  React.useEffect(() => {
    actions.getCurrentUser();
    actions.changeFieldValue({fieldName: 'teacher_id', value: teacherId});
  }, [actions, teacherId]);

  React.useEffect(() => {
    actions.changeFieldValue({fieldName: 'school_id', value: profile.school_id});
  }, [actions, profile.school_id]);

  React.useEffect(() => {
    if (school_id && teacherId) {
      actions.getTeacherProfile();
    }
  }, [actions, school_id, teacherId]);

  return (
    <div className="create-croup-page">
      <NavBarContainer/>
      <Container className="main-container">
        <Card>
          <CardContent>
            <Typography variant="h4" component="h4">{intl('schoolAdmin.createGroupPage.createGroup')} {teacherProfile.last_name} {teacherProfile.first_name}</Typography>
            <Card variant="outlined">
              <CardContent>
                <GroupForm
                  name={name}
                  nameError={nameError}
                  onSubmit={actions.createGroup}
                  changeFieldValue={actions.changeFieldValue}
                />
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
