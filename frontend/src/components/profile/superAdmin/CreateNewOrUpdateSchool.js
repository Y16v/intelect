import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {Container} from '@material-ui/core';
import SuperAdminProfile from '../../../containers/profile/superAdmin/ProfileContainer';
import CreateNewOrUpdateSchoolContainer from '../../../containers/profile/superAdmin/CreateNewOrUpdateSchoolContainer';
import NavBarContainer from '../../../containers/profile/NavBarContainer';


export default (props) => {
  const schoolId = props.match.params.schoolId;
  const isUpdate = !!schoolId;
  return (
    <div style={{backgroundColor: '#ecf0f1', height: '100vh'}}>
      <Box paddingTop={2}>
        <Container>
          <NavBarContainer />
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <CreateNewOrUpdateSchoolContainer isUpdate={isUpdate} schoolId={schoolId}/>
            </Grid>
            <Grid item xs={3}>
              <SuperAdminProfile/>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};
