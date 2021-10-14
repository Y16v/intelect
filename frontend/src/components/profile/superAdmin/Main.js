import React from 'react';
import Box from '@material-ui/core/Box';
import {Container} from '@material-ui/core';
import NavBarContainer from '../../../containers/profile/NavBarContainer';
import MySchools from '../cards/MySchools';
import ProfileContainer from '../../../containers/profile/superAdmin/ProfileContainer';
import {isMobile} from 'react-device-detect';
import LinkMobileApp from '../../../containers/LinkMobileApp/LinkMobileAppContainer';

export default (props) => {
  return (
    <div style={{minHeight: '100vh', background: '#E5E5E5'}}>
      <NavBarContainer/>
      { isMobile ? <LinkMobileApp /> : <div/>}
      <Container>
        <Box style={{display: 'flex', paddingTop: '20px'}}>
          <div style={{width: '70%'}}>
            <MySchools {...props}/>
          </div>
          <div style={{width: '20%', marginLeft: '20px'}}>
            <ProfileContainer />
          </div>
        </Box>
      </Container>
    </div>
  );
};
