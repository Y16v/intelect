import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {USER_TOKEN_KEY} from '../store/storage_kets';

export const PrivateRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={(props) => {
      const auth_token = localStorage.getItem(USER_TOKEN_KEY);
      if (auth_token) return <Component {...props} />;
      else {
        return (
          <Redirect
            to={{pathname: '/login', state: {from: props.location}}}
          />
        );
      }
    }}
  />
);
