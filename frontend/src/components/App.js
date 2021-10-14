import axios from 'axios';
import React from 'react';
import 'moment/locale/ru';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import soundsMiddleware from 'redux-sounds';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import timerMiddleware from 'redux-timer-middleware';
import '../styles/App.css';
import AppRouter from '../routes/AppRoot';
import reducer from '../reducers';
import soundsData from '../store/sounds';
import {getBuildNumber} from '../actions/login/login';
import 'react-redux-notify/dist/ReactReduxNotify.css';
import {Notify} from 'react-redux-notify';

import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import {axiosDefaultHeaders} from '../actions/utils';
import {USER_TOKEN_KEY} from '../store/storage_kets';


axios.defaults.headers = axiosDefaultHeaders();
axios.interceptors.request.use(function(config) {
  config.headers.Authorization = localStorage.getItem(USER_TOKEN_KEY);
  return config;
});


const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Montserrat',
      'Roboto',
    ],
  },
});

const loadedSoundsMiddleware = soundsMiddleware(soundsData);
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk, loadedSoundsMiddleware, timerMiddleware)));

store.dispatch(getBuildNumber());

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store} >
        <AppRouter/>
        <Notify/>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
