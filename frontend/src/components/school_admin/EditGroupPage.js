import React from 'react';
import NavBarContainer from '../../containers/profile/NavBarContainer';
import {CardContent, Container} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import GroupForm from './forms/GroupForm';
import {intl} from '../../routes/AppRoot';


export default function({
  actions,
  match,
  name,
  nameError,
}) {
  const {groupId} = match.params;

  React.useEffect(() => {
    actions.getCurrentUser();
    actions.retrieveGroup(groupId);
  }, [actions, groupId]);

  return (
    <div>
      <NavBarContainer/>
      <Container className="main-container">
        <Card>
          <CardContent>
            <Typography variant="h4" component="h4">{intl('schoolAdmin.editGroupPage')}</Typography>
            <Card variant="outlined">
              <CardContent>
                <GroupForm
                  id={groupId}
                  name={name}
                  nameError={nameError}
                  onSubmit={actions.editGroup}
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
