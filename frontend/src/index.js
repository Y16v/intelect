import React from 'react';
import * as Sentry from '@sentry/browser';
import ReactDOM from 'react-dom';
import App from './components/App';
import {createBrowserHistory} from 'history';
import 'tachyons';
import axios from 'axios';
import {USER, USER_ID, USER_TOKEN_KEY} from './store/storage_kets';

if (process.env.REACT_APP_ENV === 'prod') {
  Sentry.init({dsn: process.env.REACT_APP_SENTRY_SDK_URL});
}

export const history = createBrowserHistory();

history.listen((location, action) => {
  const url = '/api/load_active_user';
  const user = localStorage.getItem(USER);
  const token = localStorage.getItem(USER_TOKEN_KEY);

  if (!!user && !!token && location.pathname !== '/non-activated-user') {
    axios.get(url)
        .then((response) => {
        })
        .catch(({response}) => {
          if (response.status === 403) {
            return history.push('/non-activated-user');
          }

          if (response.status === 401) {
            localStorage.removeItem(USER_TOKEN_KEY);
            localStorage.removeItem(USER_ID);
            localStorage.removeItem(USER);
            return history.push('/login');
          }
        });
  }
});

const render = (Comment) => ReactDOM.render(<Comment/>, document.getElementById('root'));

render(App);
