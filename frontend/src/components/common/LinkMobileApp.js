import React from 'react';
import '../../styles/linkMobileApp.css';
import {intl} from '../../routes/AppRoot';

export default function LinkMobileApp(props) {
  const {isClose, actions} = props;
  return (
    <div>
      {isClose ? <div/> : <div className="link-mobile-app-container">
        <div className="link-mobile-app-box-title">
          <h3 className="link-mobile-app-title">{intl('common.LinkMobileApp')}</h3>
          <button
            onClick={() => actions.closeLinkMobileApp()}
            className="link-mobile-app-button">{intl('common.LinkMobileApp.hide')}</button>
        </div>
        <a href="https://play.google.com/store/apps/details?id=org.memorymee.games">
          <div className="link-mobile-app-img-box"/>
        </a>
      </div>}
    </div>
  );
}
