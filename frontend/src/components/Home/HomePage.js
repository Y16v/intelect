import React from 'react';
import Button from '@material-ui/core/Button';
import {ADMIN_ID, SUPER_ADMIN_ID, USER_CATEGORY_PUSH} from '../../reducers/user/fixture';
import {Link} from 'react-router-dom';
import {USER} from '../../store/storage_kets';
import {intl} from '../../routes/AppRoot';

export default function HomePage(props) {
  const profile = JSON.parse(localStorage.getItem(USER));

  return (<div className="home-page-root">
    <div className="Aligner">
      <Link
        className="home-page-profile-title"
        to={USER_CATEGORY_PUSH[profile.category_id] || '/'}>
        <Button
          style={{margin: '10px', color: 'white', fontWeight: 'bolder'}}
          className="home-page-buttons">
          {intl('homePage.myProfile')}
        </Button>
      </Link>
      <Button style={{margin: '10px', color: 'white', fontWeight: 'bolder'}}
        className="home-page-buttons"
        onClick={() => props.actions.pushToGames()}>
        {intl('homePage.openGame')}
      </Button>
      <Link
        className="home-page-profile-title"
        to={'/game/rating'}>
        <Button
          style={{margin: '10px', color: 'white', fontWeight: 'bolder'}}
          className="home-page-buttons">
          {intl('homePage.ratingStudent')}
        </Button>
      </Link>
      {(profile.category_id === SUPER_ADMIN_ID || profile.category_id === ADMIN_ID) && (<Link
        className="home-page-profile-title"
        to={profile.category_id === SUPER_ADMIN_ID ?
                        '/super-admin/search-student' :
                        '/school-admin-page/search-students'}>
        <Button
          style={{margin: '10px', color: 'white', fontWeight: 'bolder'}}
          className="home-page-buttons">
          {intl('homePage.searchStudents')}
        </Button>
      </Link>)}
      <Button style={{margin: '10px', color: 'white', fontWeight: 'bolder'}}
        className="home-page-buttons"
        onClick={() => props.actions.pushToChangePassword()}>
        {intl('homePage.changePassword')}
      </Button>
      <Button style={{margin: '10px', color: 'white', fontWeight: 'bolder'}}
        className="home-page-buttons"
        onClick={() => props.actions.logout()}>
        {intl('homePage.logout')}
      </Button>
    </div>
  </div>
  );
}
