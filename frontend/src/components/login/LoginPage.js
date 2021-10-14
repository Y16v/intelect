import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import 'typeface-roboto';
import '../../styles/login.css';
import {Redirect} from 'react-router-dom';
import {USER_TOKEN_KEY} from '../../store/storage_kets';
import {intl} from '../../routes/AppRoot';

export default function LoginPage({state, actions}) {
  const {usernameError, passwordError, isLoading, isError} = state;

  const onChange = (event) => {
    actions.changeLoginField(event.target.name, event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    actions.login();
  };
  const isLogin = () => !!localStorage.getItem(USER_TOKEN_KEY);

  const renderForm = () => (<form onSubmit={onSubmit}>
    <Box pt={3} pb={3}>
      <TextField
        onChange={onChange}
        variant="outlined"
        margin="normal"
        name="login"
        fullWidth
        label={intl('login.username')}
        error={!!usernameError}
        helperText={usernameError}
      />
      <TextField
        onChange={onChange}
        name="password"
        variant="outlined"
        margin="normal"
        fullWidth
        label={intl('login.password')}
        type="password"
        error={!!passwordError}
        helperText={passwordError}
      />
    </Box>
    <Box pb={3}>
      <Button
        disabled={isLoading}
        fullWidth
        variant="contained"
        color="primary"
        type="submit"
      >
        {intl('login')}
      </Button>
    </Box>
    {isError && renderError()}
  </form>);

  const renderError = () => (<Typography
    component="p"
    color="error"
    align="center"
  >{intl('login.error')} </Typography>);

  return (
    <div className="Login">
      {isLogin() && <Redirect to="/games"/>}
      <div className="Login-content">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{minHeight: '100vh'}}>
          <div className="card-login">
            <Typography component="h1" variant="h5">
              {intl('login.authorization')}
            </Typography>
            {renderForm()}
          </div>
        </Grid>
      </div>
    </div>
  );
}
