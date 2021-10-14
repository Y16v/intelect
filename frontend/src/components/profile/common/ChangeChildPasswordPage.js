import React from 'react';
import NavBarContainer from '../../../containers/profile/NavBarContainer';
import Container from '@material-ui/core/Container';
import {Card, CardContent} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {Visibility, VisibilityOff} from '@material-ui/icons';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import '../../../styles/changeChildPasswordPage.css';
import {intl} from '../../../routes/AppRoot';

export default function({
  match,
  actions,
  childUser,
  newPasswordValue,
  confirmPasswordValue,

  showNewPasswordValue,
  showConfirmPasswordValue,
  newPasswordError,
  confirmPasswordError,
  changeChildPasswordError,
  getChildUserError,
}) {
  const childUserId = match.params.childUserId;
  React.useEffect(() => {
    actions.getChildUser(childUserId);
  }, [actions, childUserId]);

  const renderChangePasswordContent = () => {
    return (
      <Grid container>
        <Grid item xs={12} style={{marginBottom: '10px'}}>
          <Typography variant="h5" component="h5">
            {intl('profile.common.changeChildPassword.changePassword')} {childUser && childUser.last_name} {childUser && childUser.first_name}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <FormControl error={!!newPasswordError}>
            <InputLabel shrink htmlFor="new-password">{intl('profile.common.changeChildPassword.newPassword')}</InputLabel>
            <Input
              id="new-password"
              type={showNewPasswordValue ? 'text' : 'password'}
              value={newPasswordValue}
              onChange={(event) => actions.setNewPasswordValue(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={showNewPasswordValue ? actions.hideNewPassword : actions.showNewPassword}
                  >
                    {showNewPasswordValue ? <Visibility/> :
                                            <VisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="new-password">{newPasswordError}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl error={!!confirmPasswordError}>
            <InputLabel shrink htmlFor="confirm-password">{intl('profile.common.changeChildPassword.passwordConfirmation')}</InputLabel>
            <Input
              id="confirm-password"
              type={showConfirmPasswordValue ? 'text' : 'password'}
              value={confirmPasswordValue}
              onChange={(event) => actions.setConfirmPasswordValue(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={showConfirmPasswordValue ? actions.hideConfirmPassword : actions.showConfirmPassword}
                  >
                    {showConfirmPasswordValue ? <Visibility/> :
                                            <VisibilityOff/>}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="confirm-password">{confirmPasswordError}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Typography color='secondary' variant='inherit'>{changeChildPasswordError}</Typography>
        </Grid>
        <Box paddingTop={2}/>
        <Grid item xs={3}>
          <Button
            size="medium"
            color="primary"
            variant="contained"
            onClick={() => actions.changeChildPassword(childUserId)}
          >{intl('profile.common.changeChildPassword.change')}</Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            size="medium"
            color="secondary"
            variant="contained"
            onClick={() => actions.finishChangePassword()}
          >
            {intl('profile.card.createOrUpdate.cancel')}
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <div className="change-child-password-page">
      <NavBarContainer/>
      <Container className="main-container">
        <Card>
          <CardContent>
            {getChildUserError ?
                        <Typography variant="h3" color="error">{getChildUserError}</Typography> :
                        renderChangePasswordContent()
            }
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
